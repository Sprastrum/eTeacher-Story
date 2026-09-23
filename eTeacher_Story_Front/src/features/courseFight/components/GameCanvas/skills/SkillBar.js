import Phaser from "phaser";

const ICON_SIZE = 40;
const FALLBACK_TEXTURE = "skillFallback";

export class SkillBar {

    constructor(scene, { onSkillClick } = {}) {
        this.scene = scene;
        this.onSkillClick = onSkillClick;
        this.group = null;
        this.tooltip = null;
        this.selectedSkillName = null;
        this._lastSkills = [];
        this._lastCooldowns = {};
    }

    create() {
        const { scene } = this;

        if (!scene.textures.exists(FALLBACK_TEXTURE)) {
            const g = scene.add.graphics();
            g.fillStyle(0x556677, 1);
            g.fillRoundedRect(0, 0, ICON_SIZE, ICON_SIZE, 6);
            g.generateTexture(FALLBACK_TEXTURE, ICON_SIZE, ICON_SIZE);
            g.destroy();
        }

        this.group = scene.add.group();

        this.tooltip = scene.add.text(0, 0, "", {
            fontSize: "11px",
            fontFamily: "monospace",
            color: "#ffffff",
            backgroundColor: "#000000cc",
            padding: { x: 6, y: 4 },
            wordWrap: { width: 180 },
        }).setDepth(50).setVisible(false);
    }

    render(skills = [], cooldowns = {}) {
        this._lastSkills = skills;
        this._lastCooldowns = cooldowns;

        if (!this._ensureTexturesLoaded(skills, () => this.render(skills, cooldowns))) {
            return;
        }

        this.group.clear(true, true);
        this._hideTooltip();

        const { scene } = this;
        const W = scene.scale.width;
        const H = scene.scale.height;
        const hudScale = W / 340;
        const size = Math.round(ICON_SIZE * hudScale * 0.4);
        const gap = Math.round(6 * hudScale);
        const totalWidth = skills.length * (size + gap) - gap;
        const startX = W / 2 - totalWidth / 2 + size / 2;
        const y = H - 37 * hudScale;
        this._iconSize = size;

        skills.forEach((skill, index) => {
            const x = startX + index * (size + gap);
            const cd = cooldowns?.[skill.name] ?? 0;
            const selected = skill.name === this.selectedSkillName;

            const bg = scene.add.rectangle(0, 0, size + 6, size + 6, 0x000000, 0.45)
                .setStrokeStyle(2, selected ? 0xffee55 : 0x444444);

            const icon = scene.add.image(0, 0, this._textureKey(skill)).setDisplaySize(size, size);
            if (cd > 0) icon.setTint(0x555555);

            const parts = [bg, icon];

            if (cd > 0) {
                parts.push(
                    scene.add.text(0, 0, `${cd}`, {
                        fontSize: "16px",
                        fontFamily: "monospace",
                        color: "#ffffff",
                        fontStyle: "bold",
                    }).setOrigin(0.5)
                );
            }

            const container = scene.add.container(x, y, parts).setDepth(30);
            container.setSize(size + 6, size + 6);
            container.setInteractive(
                new Phaser.Geom.Rectangle(0, 0, size + 6, size + 6),
                Phaser.Geom.Rectangle.Contains
            );

            container.on("pointerover", () => this._showTooltip(skill, x, y));
            container.on("pointerout", () => this._hideTooltip());
            container.on("pointerdown", () => {
                if (cd > 0) return;
                this.onSkillClick?.(skill);
            });

            this.group.add(container);
        });

        return true;
    }

    setSelected(skillName) {
        this.selectedSkillName = skillName;
        this.render(this._lastSkills, this._lastCooldowns);
    }

    _showTooltip(skill, x, y) {
        const dmg = skill.mixedDamage || skill.ignoranceDamage || skill.boredomDamage || 0;
        this.tooltip.setText(`${skill.name}\n${skill.description || ""}\nDaño: ${dmg}`);
        this.tooltip.setPosition(x - this.tooltip.width / 2, y - (this._iconSize ?? ICON_SIZE) - this.tooltip.height - 4);
        this.tooltip.setVisible(true);
    }

    _hideTooltip() {
        this.tooltip?.setVisible(false);
    }

    _textureKey(skill) {
        return skill.image ? `skill_${skill.name}` : FALLBACK_TEXTURE;
    }

    _ensureTexturesLoaded(skills, onLoaded) {
        const { scene } = this;
        const missing = skills.filter(
            (s) => s.image && !scene.textures.exists(this._textureKey(s))
        );

        if (missing.length === 0) return true;

        missing.forEach((s) => scene.load.image(this._textureKey(s), s.image));
        scene.load.once("complete", onLoaded);
        scene.load.start();
        return false;
    }
}
