import Phaser from "phaser";
import { ScBar } from "./hud/ScBar.js";
import { ClassroomSet } from "./hud/ClassroomSet.js";
import { TeacherRenderer } from "./entities/TeacherRenderer.js";
import { PupilRenderer } from "./entities/PupilRenderer.js";
import { DeskRenderer } from "./entities/DeskRenderer.js";
import { SkillBar } from "./skills/SkillBar.js";
import { TargetingController } from "./skills/TargetingController.js";
import { LayoutDebugger } from "./debug/LayoutDebugger.js";

// Poné esto en false cuando termines de acomodar el salón.
const DEBUG_LAYOUT = true;
// Labels (los mismos que le pasás a "register") que NO querés poder arrastrar/clickear.
const DEBUG_IGNORE = ["street2", "wallClass2", "wallStreet", "floor2", "platform3", "floor",
    "floorB"];

export class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({ key: "ClassroomScene" });
        this.gameState = null;
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
        this.load.image("set3Floor", "/assets/game/background/Set3-floor.png");
        this.load.image("wallClass2", "/assets/game/background/wall-class-2.png");
        this.load.image("wallStreet", "/assets/game/background/wall-street.png");
        this.load.image("platform3", "/assets/game/background/platform2.png");
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

        this.load.image("p_ignorance", "/assets/game/students/ignorance.png");
        this.load.image("p_boredom", "/assets/game/students/boredom.png");

        this.load.image("furnitureDesk", "/assets/game/background/s_desk2.png");
        this.load.image("furnitureChair", "/assets/game/background/chairA1.png");

    }

    create() {
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x2a1a0e)
            .setOrigin(0, 0);

        const rawScale = this.scale.width / 340;
        const hudScale = Math.floor(rawScale);

        this.layoutDebugger = DEBUG_LAYOUT ? new LayoutDebugger(this, { ignore: DEBUG_IGNORE }) : null;
        this.layoutDebugger?.enable();

        this.scBar = new ScBar(this);
        this.scBar.create();

        this.classroomSet = new ClassroomSet(this);
        const { hudX, hudY } = this.classroomSet.create(hudScale, {
            register: this.layoutDebugger
                ? (label, obj) => this.layoutDebugger.register(label, obj)
                : (label, obj) => obj,
        });
        this.layoutDebugger?.setOrigin(hudX, hudY);

        this.teacherRenderer = new TeacherRenderer(this);
        this.teacherRenderer.create();

        this.deskRenderer = new DeskRenderer(this, {
            register: this.layoutDebugger
                ? (label, obj) => this.layoutDebugger.register(label, obj)
                : (label, obj) => obj,
        });
        this.deskRenderer.create();

        this.pupilRenderer = new PupilRenderer(this, {
            onPupilClick: (pupil) => this.targetingController.handlePupilClick(pupil),
        });
        this.pupilRenderer.create();

        this.skillBar = new SkillBar(this, {
            onSkillClick: (skill) => this.targetingController.handleSkillClick(skill),
        });
        this.skillBar.create();

        this.targetingController = new TargetingController(this, {
            pupilRenderer: this.pupilRenderer,
            skillBar: this.skillBar,
            onAction: (payload) => this.onActionReady?.(payload),
        });

        this._isReady = true;
        if (this._pendingState) {
            this.updateState(this._pendingState);
            this._pendingState = null;
        }
    }

    updateState(state) {
        if (!this._isReady) {
            this._pendingState = state;
            return;
        }

        this.gameState = state;
        this.scBar.update(state.player.SC, state.player.maxSC);
        this.teacherRenderer.update(state.player);
        this.deskRenderer.render(state.session.matrix, state.session.pupils);
        this.pupilRenderer.render(state.session.pupils);
        this.targetingController.setPupils(state.session.pupils);
        this.skillBar.render(state.player.skills, state.player.teacherCooldowns);
    }
}
