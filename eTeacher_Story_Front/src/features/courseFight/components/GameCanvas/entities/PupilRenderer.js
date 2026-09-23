import Phaser from "phaser";
import {
    HAIR_COLORS, PANTS_COLORS, SHIRT_COLORS
} from "../../../../../../../eTeacher_Story_Back/src/domain/constants/pupil/appearanceConfig.constant.ts";
import { computeGridGeometry, cellToWorld } from "./isometricGrid.js";


export class PupilRenderer {
    constructor(scene, { onPupilClick } = {}) {
        this.scene = scene;
        this.onPupilClick = onPupilClick;
        this.group = null;
        this.pupilSprites = new Map();
        this._highlightedIds = new Set();
    }

    create() {
        this.group = this.scene.add.group();
    }

    render(pupils = []) {
        if (this.group) this.group.clear(true, true);
        this.pupilSprites.clear();

        const { scene } = this;
        const grid = computeGridGeometry(scene);
        const { scale } = grid;

        pupils.forEach((pupil) => {
            const app = pupil.appearance ?? [0, 0, 0, 0, 0, 0, 0, 0, 0];
            const gender = app[0] ?? 0;
            const headFrame = app[1] ?? 0;
            const hairFrame = gender === 1 ? 15 + (app[2] ?? 0) : (app[2] ?? 0);
            const shirtFrame = gender === 1 ? 12 + (app[4] ?? 0) : (app[4] ?? 0);
            const pantsFrame = gender === 1 ? 5 + (app[6] ?? 0) : (app[6] ?? 0);
            const eyesFrame = app[8] ?? 0;
            const mouthFrame = gender === 1 ? 20 : 0;

            const hairColor = HAIR_COLORS[app[3] ?? 0] ?? 0x8B4513;
            const shirtColor = SHIRT_COLORS[app[3] ?? 0] ?? 0xffffff;
            const pantsColor = PANTS_COLORS[app[3] ?? 0] ?? 0x000080;

            const { x, y } = cellToWorld(pupil.row, pupil.col, grid);

            const container = scene.add.container(x, y);

            const highlight = scene.add.ellipse(0, 8 * scale, 26 * scale, 10 * scale, 0xffff66, 0.55)
                .setVisible(this._highlightedIds.has(pupil.id));

            const trunk = scene.add.image(0, 0, "s_trunk").setScale(scale);
            const legs = scene.add.image(0, 5 * scale, "s_legs").setScale(scale);

            const pants = scene.add.sprite(0.3 * scale, 5 * scale, "s_pants", pantsFrame)
                .setScale(scale)
                .setTint(pantsColor);

            const shirt = scene.add.sprite(0, 2 * scale, "s_shirt", shirtFrame)
                .setScale(scale)
                .setTint(shirtColor);

            const arms = scene.add.sprite(0, -2 * scale, "s_arms", 0).setScale(scale);
            const head = scene.add.sprite(0, -7 * scale, "s_head", headFrame).setScale(scale);
            const eyes = scene.add.sprite(-1.5 * scale, -5.5 * scale, "s_eyes", eyesFrame + 30).setScale(scale);
            const mouth = scene.add.sprite(-scale, -2.5 * scale, "s_mouth", mouthFrame + 9).setScale(scale);
            const hair = scene.add.sprite(scale, -9 * scale, "s_hair", hairFrame)
                .setScale(scale)
                .setTint(hairColor);


            const iconSize = 3 * scale;
            const iconGap = 0.5 * scale;

            const healthIcons = [
                ...Array(Math.max(0, pupil.ignorancePoints ?? 0)).fill("p_ignorance"),
                ...Array(Math.max(0, pupil.boredomPoints ?? 0)).fill("p_boredom"),
            ];

            const totalIconsWidth = healthIcons.length * (iconSize + iconGap) - iconGap;
            const iconsStartX = -totalIconsWidth / 2 + iconSize / 2;
            const iconsY = -15 * scale;

            const iconSprites = healthIcons.map((textureKey, i) =>
                scene.add.image(iconsStartX + i * (iconSize + iconGap), iconsY, textureKey)
                    .setDisplaySize(iconSize, iconSize + 1.5)
            );


            container.add([highlight, trunk, legs, pants, shirt, arms, head, eyes, mouth, hair, ...iconSprites]);
            container.setDepth(5 + pupil.row);

            const hitW = 28 * scale;
            const hitH = 34 * scale;
            container.setSize(hitW, hitH);
            container.setInteractive(
                new Phaser.Geom.Rectangle(0, 0, hitW, hitH),
                Phaser.Geom.Rectangle.Contains
            );
            container.on("pointerdown", () => this.onPupilClick?.(pupil));

            this.group.addMultiple([container]);
            this.pupilSprites.set(pupil.id, { container, highlight, pupil });
        });
    }

    setTargetableHighlight(pupilIds) {
        this._highlightedIds = new Set(pupilIds);
        this.pupilSprites.forEach(({ highlight }, id) => {
            highlight.setVisible(this._highlightedIds.has(id));
        });
    }

    clearHighlight() {
        this._highlightedIds = new Set();
        this.pupilSprites.forEach(({ highlight }) => highlight.setVisible(false));
    }

    _createPipRow(count, textureKey, y, scale) {
        const pipW = 14
    }
}
