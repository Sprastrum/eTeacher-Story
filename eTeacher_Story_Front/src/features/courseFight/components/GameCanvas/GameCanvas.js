import Phaser from "phaser";
import { ClassroomScene } from "./ClassroomScene.js";

export class GameCanvas {
    constructor(container) {
        this.container = container;
        this.game = null;
        this.scene = null;
    }

    init() {
        const config = {
            type: Phaser.AUTO,
            width: this.container.offsetWidth || 800,
            height: this.container.offsetHeight || 500,
            scale: {
                parent: this.container,
                mode: Phaser.Scale.FIT,
                zoom: 1,
            },
            autoRound: false,
            pixelArt: true,
            backgroundColor: '#1a1a2e',
            parent: this.container,
            scene: ClassroomScene,
        };

        this.game = new Phaser.Game(config);

        this.game.events.once("ready", () => {
            this.scene = this.game.scene.getScene("ClassroomScene");
        });
    }

    update(state) {
        if (!this.scene && this.game) {
            this.scene = this.game.scene.getScene("ClassroomScene");
        }

        if (this.scene) {
            this.scene.updateState(state);
        }
    }

    onAction(callback) {
        if (this.scene) {
            this.scene.onActionReady = callback;
            return;
        }

        this.game.events.once("ready", () => {
            this.scene = this.game.scene.getScene("ClassroomScene");
            if (this.scene) this.scene.onActionReady = callback;
        });
    }

    destroy() {
        this.game?.destroy(true);
        this.game = null;
        this.scene = null;
    }
}
