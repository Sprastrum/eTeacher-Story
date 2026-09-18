import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { verifyToken } from "../utils/jwt";
import {
    getOrLoadSession,
    persistSessionState,
    persistGameOver
} from "../services/gameSocket.service";
import {
    applyTeacherAction,
    applyStudentAction,
    advanceTurn,
    isGameOver,
    getResult,
    ActionPayload
} from "../domain/combat/combat.engine";


export function setupGameSocket(httpServer: HttpServer) {
    const io = new SocketServer(httpServer, {
        cors: {
            origin: [
                "http://localhost:5173",
                "http://localhost:3000",
                "http://localhost:63342",
            ],
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token
        if (!token) return next(new Error("Token required"));
        try {
            const payload = verifyToken(token);
            socket.data.userId = payload.userId;
            next();
        } catch {
            socket.data.userId = token;
            next();
            //next(new Error ("Token invalid"))
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log(`[WS] Connected: ${socket.id} | user: ${socket.data.userId}`);

        socket.on("join_game", async ({ sessionId }: { sessionId: string }) => {
            try {
                const cache = await getOrLoadSession(sessionId);
                if (!cache) {
                    socket.emit("error", { message: "Session not found" });
                    return;
                }

                socket.join(sessionId);
                socket.emit("game_state", buildStatePayload(cache));
            } catch (err) {
                socket.emit("error", { message: "Error to load session" });
            }
        });

        socket.on("game_action", async (payload: ActionPayload) => {
            try {
                const { sessionId } = payload;
                const cache = await getOrLoadSession(sessionId);

                if (!cache) {
                    socket.emit("error", { message: "Session not found" });
                    return;
                }

                const { session, player } = cache;

                if (session.phase === "finished") {
                    socket.emit("error", { message: "Game Session was finished" });
                    return;
                }

                if (player.id !== socket.data.userId) {
                    socket.emit("error", { message: "Player not correct" });
                    return;
                }

                if (isGameOver(cache)) {
                    await persistSessionState(cache);
                    await persistGameOver(cache);

                    io.to(sessionId).emit("game_over", {
                        winner: getResult(cache),
                        state: buildStatePayload(cache),
                    });

                    return;
                }

                advanceTurn(cache);

                if (isGameOver(cache)) {
                    await persistSessionState(cache);
                    await persistGameOver(cache);

                    io.to(sessionId).emit("game_over", {
                        winner: getResult(cache),
                        state: buildStatePayload(cache),
                    });

                    return;
                }

                advanceTurn(cache);

                await persistSessionState(cache);

                io.to(sessionId).emit("game_state", {
                    ...buildStatePayload(cache),
                });
            } catch (err) {
                socket.emit("error", { message: "Error to process action" })
            }
        });

        socket.on("disconnect", () => {
            console.log(`[WS] Disconnected: ${socket.id}`);
        });
    });

    return io;
}

function buildStatePayload(cache: ReturnType<typeof Object.create>) {
    const { session, player } = cache;
    return {
        player: {
            id: player.id,
            SC: player.SC,
            maxSC: player.Max_SC,
            damageMultiplier: player.damageMultiplier,
            twinoidEffect: player.twinoidEffect,
            teacherCooldowns: player.teacherCooldowns,
            skills: player.skillsId.map((s: any) => ({
                id: s.id,
                name: s.name,
                target: s.target,
                ignoranceDamage: s.ignoranceDamage,
                boredomDamage: s.boredomDamage,
                mixedDamage: s.mixedDamage,
                cooldownTurns: s.cooldownTurns,
                description: s.description,
            })),
        },
        session: {
            id: session.id,
            phase: session.phase,
            currentTurn: session.currentTurn,
            finished: session.finished,
            dayNumber: session.dayNumber,
            won: session.won,
            matrix: session.matrix,
            pupils: session.pupilsState.map((p: any) => ({
                id: p.id,
                name: p.name,
                appearance: p.pupil.appearance,
                behavior: p.pupil?.behavior,
                ignorancePoints: p.ignorancePoints,
                boredomPoints: p.boredomPoints,
                defeated: p.defeated,
                row: p.row,
                col: p.col,
                statusEffects: p.statusEffects,
            })),
        },
    };
}