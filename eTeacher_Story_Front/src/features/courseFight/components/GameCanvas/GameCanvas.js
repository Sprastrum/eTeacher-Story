import Phaser from "phaser";
import {
    HAIR_COLORS, PANTS_COLORS, SHIRT_COLORS
} from "../../../../../../eTeacher_Story_Back/src/domain/constants/pupil/appearanceConfig.constant.ts";

class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({ key: "ClassroomScene" });
        this.gameState = null;
        this.teacherSprite = null;
        this.pupilSprites = new Map();
        this.onActionReady = null;
        this._isReady = false;
        this._pendingState = null;
    }

    preload() {
        this.load.spritesheet("teacher", "/assets/game/james/james.png", {
            frameWidth: 26,
            frameHeight: 37,
        });

        this.load.image("hud", "/assets/game/hud/hud.png");
        this.load.image("hudLife", "/assets/game/hud/hudLife.png");
        this.load.image("hudOver", "/assets/game/hud/hudOver.png");
        this.load.image("hudTime1", "/assets/game/hud/hudTime1.png");
        this.load.image("hudTime2", "/assets/game/hud/hudTime2.png");

        this.load.image("set2FloorB", "/assets/game/background/Set2-floor-b.png");
        this.load.image("set2Floor", "/assets/game/background/Set2-floor.png");
        this.load.image("wallClass2", "/assets/game/background/wall-class-2.png")
        this.load.image("wallStreet", "/assets/game/background/wall-street.png");
        this.load.image("platform3", "/assets/game/background/platform3.png");
        this.load.image("street2", "/assets/game/background/street2.png");

        this.load.spritesheet("s_head", "/assets/game/students/head.png", {
            frameWidth: 12, frameHeight: 10,
        });
        this.load.spritesheet("s_hair", "/assets/game/students/hair.png", {
            frameWidth: 23, frameHeight: 19,
        });
        this.load.spritesheet("s_shirt", "/assets/game/students/shirt.png", {
            frameWidth: 13, frameHeight: 11,
        });
        this.load.spritesheet("s_pants", "/assets/game/students/pants.png", {
            frameWidth: 11, frameHeight: 6,
        });
        this.load.spritesheet("s_eyes", "/assets/game/students/eyes.png", {
            frameWidth: 8, frameHeight: 5,
        });
        this.load.spritesheet("s_mouth", "/assets/game/students/mouth.png", {
            frameWidth: 7, frameHeight: 5,
        });
        this.load.spritesheet("s_arms", "/assets/game/students/arms.png", {
            frameWidth: 8, frameHeight: 5,
        });
        this.load.image("s_trunk", "/assets/game/students/trunk.png");
        this.load.image("s_legs", "/assets/game/students/legs.png");

    }

    create() {
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x2a1a0e)
            .setOrigin(0, 0);

        this.anims.create({
            key: "teacher-idle",
            frames: this.anims.generateFrameNumbers("teacher", {
                start: 6 * 10,
                end: 6 * 10 + 5,
            }),
            frameRate: 8,
            repeat: -1,
        });

        const W = this.scale.width;
        const H = this.scale.height;
        const rawScale = W / 340;
        const hudScale = Math.floor(rawScale);
        const hudH = 79 * hudScale;

        this.teacherSprite = this.add.sprite(W * 0.22, H - hudH - 80, "teacher")
            .setScale(hudScale)
            .setDepth(9)
            .play("teacher-idle");

        console.log(this.scale.width, this.scale.height);
        console.log(this.teacherSprite.width, this.teacherSprite.height);
        console.log(this.teacherSprite.displayWidth, this.teacherSprite.displayHeight);

        this._createSCBar();
        this._createSet(hudScale);
        this.pupilsGroup = this.add.group();
        this.skillsBar = this.add.group();

        this._isReady = true;
        if (this._pendingState) {
            this.updateState(this._pendingState);
            this._pendingState = null;
        }
    }

    _createSCBar() {
        const W = this.scale.width;
        const H = this.scale.height;
        const hudScale = W / 340;
        const hudY = H - (79 * hudScale) / 2;

        this.add.image(W / 2, hudY, "hud")
            .setScale(hudScale)
            .setDepth(20);

        this.add.image(W / 2, hudY, "hudOver")
            .setScale(hudScale)
            .setDepth(22);

        this.scLife = this.add.image((29 * hudScale), hudY + (13.5 * hudScale), "hudLife")
            .setScale(hudScale - 0.1)
            .setDepth(21);

        this.scText = this.add.text((29 * hudScale), hudY + (13.5 * hudScale), "--", {
            fontSize: `${Math.floor(10 * hudScale)}px`,
            color: "#ffffff",
            fontFamily: "monospace",
            align: "center",
            fontStyle: "bold",
        }).setOrigin(0.5).setDepth(25);

        const timeX = W * 0.89;
        this.add.image(timeX, hudY - (hudScale), "hudTime1")
            .setScale(hudScale - 0.1)
            .setDepth(21);
        this.add.image(timeX, hudY + (24 * hudScale), "hudTime2")
            .setScale(hudScale - 0.1)
            .setDepth(21);
    }

    _createSet(hudScale) {
        const W = this.scale.width;
        const H = this.scale.height;
        const hudY = (H / 2) - 50;
        const hudX = (W / 2) - 50;

        this.add.image(hudX, hudY, "set2FloorB")
            .setScale(hudScale)
            .setDepth(2);
        this.add.image(hudX, hudY, "set2Floor")
            .setScale(hudScale)
            .setDepth(2);
        this.add.image(hudX - 165, hudY + 90, "wallClass2")
            .setScale(hudScale)
            .setDepth(10);
        this.add.image(hudX - 165, hudY + 90, "platform3")
            .setScale(hudScale)
            .setDepth(10);
        this.add.image(hudX + 156, hudY + 90, "wallStreet")
            .setScale(hudScale)
            .setDepth(11);
        this.add.image(hudX + 245, hudY + 175, "street2")
            .setScale(hudScale)
            .setDepth(11);
    }

    _updateSCBar(sc, maxSC) {
        if (!this.scLife || !this.scText) return;

        const pct = sc / maxSC;

        //this.scLife.setScale(1.5 * pct);

        if (pct > 0.5) {
            this.scLife.clearTint();
        } else if (pct > 0.25) {
            this.scLife.setTint(0xff8800);
        } else {
            this.scLife.setTint(0xff2200);
        }

        this.scText.setText(`${sc}`);
    }

    _renderTeacher() {

    }

    _renderPupils(pupils) {
        if (this.pupilsGroup) this.pupilsGroup.clear(true, true);
        this.pupilSprites.clear();

        const W = this.scale.width;
        const H = this.scale.height;
        const rawScale = W / 340;
        const hudH = 79 * rawScale;

        const cellW = 60;
        const cellH = 50;
        const scale = Math.floor(rawScale);

        const originX = W * 0.55;
        const originY = (H - hudH) * 0.45;

        pupils.forEach((pupil) => {
            const app = pupil.appearance ?? [0,0,0,0,0,0,0,0,0];
            const gender = app[0] ?? 0;
            const headFrame = app[1] ?? 0;
            const hairFrame = gender === 1 ? 15 + (app[2] ?? 0) : (app[2] ?? 0);
            const shirtFrame = gender === 1 ? 12 + (app[4] ?? 0) : (app[4] ?? 0);
            const pantsFrame = gender === 1 ? 5 + (app[6] ?? 0) : (app[6] ?? 0);
            const eyesFrame = app[8] ?? 0;
            const mouthFrame = gender === 1 ? 20: 0;

            const hairColor = HAIR_COLORS[app[3] ?? 0] ?? 0x8B4513;
            const shirtColor = SHIRT_COLORS[app[3] ?? 0] ?? 0xffffff;
            const pantsColor = PANTS_COLORS[app[3] ?? 0] ?? 0x000080;

            const x = originX + (pupil.col - pupil.row) * cellW;
            const y = originY + (pupil.col + pupil.row) * (cellH / 2);

            const container = this.add.container(x, y);

            const trunk = this.add.image(0, 0, "s_trunk").setScale(scale);
            const legs = this.add.image(0, 5 * scale, "s_legs").setScale(scale);

            const pants = this.add.sprite(0.3 * scale, 5 * scale, "s_pants", pantsFrame)
                .setScale(scale)
                .setTint(pantsColor);

            const shirt = this.add.sprite(0, 2 * scale, "s_shirt", shirtFrame)
                .setScale(scale)
                .setTint(shirtColor);

            const arms  = this.add.sprite(0, -2 * scale, "s_arms", 0).setScale(scale);
            const head  = this.add.sprite(0, -7 * scale, "s_head", headFrame).setScale(scale);
            const eyes  = this.add.sprite(-1.5 * scale, -5.5 * scale, "s_eyes", eyesFrame + 30).setScale(scale);
            const mouth = this.add.sprite(-scale, -2.5 * scale, "s_mouth", mouthFrame + 9).setScale(scale);
            const hair  = this.add.sprite(scale, -9 * scale, "s_hair", hairFrame)
                .setScale(scale)
                .setTint(hairColor);

            container.add([trunk, legs, pants, shirt, arms, head, eyes, mouth, hair]);
            container.setDepth(5 + pupil.row);

            this.pupilsGroup.addMultiple([container]);
            this.pupilSprites.set(pupil.id, { container });
        });
    }

    _renderSkills(skills, cooldowns) {

    }

    updateState(state) {
        if (!this._isReady) {
            this._pendingState = state;
            return;
        }

        console.log(state);

        this.gameState = state;
        this._updateSCBar(state.player.SC, state.player.maxSC);
        this._renderPupils(state.session.pupils);
        this._renderSkills(state.player.skills, state.player.teacherCooldowns);
    }
}

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