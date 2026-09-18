import { io } from "socket.io-client";

export class GameSocketClient {
    constructor(serverUrl = "http://localhost:3000") {
        this.serverUrl = serverUrl;
        this.socket = null;

        this.onStateUpdate = (state) => {};
        this.onGameOver = (data) => {};
        this.onError = (message) => {};
        this.onConnected = () => {};
    }

    connect(token) {
        console.log("Try to connect:", this.serverUrl);
        this.socket = io(this.serverUrl, {
            auth: { token },
            transports: ["websocket"],
        });

        this.socket.on("connect_error", (err) => {
            console.error("[WS] Error to connect:", err.message);
        });

        this.socket.on("connect", () => {
            console.log("[WS] Connected:", this.socket.id);
            this.onConnected();
        });

        this.socket.on("game_state", (state) => {
            this.onStateUpdate(state);
        });

        this.socket.on("game_over", (data) => {
            this.onGameOver(data);
        });

        this.socket.on("error", ({ message }) => {
            console.error("[WS] Error:", message);
            this.onError(message);
        });

        this.socket.on("disconnect", (reason) => {
            console.warn("[WS] Disconnected", reason);
        });
    }

    joinGame(sessionId) {
        this.socket?.emit("join_game", { sessionId });
    }

    useSkill({ sessionId, playerId, skillId, targetRow, targetCol }) {
        this.socket?.emit("game_action", {
            sessionId,
            playerId,
            action: "skill",
            skillId,
            targetRow,
            targetCol,
        });
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }

    get isConnected() {
        return this.socket?.connected ?? false;
    }
}