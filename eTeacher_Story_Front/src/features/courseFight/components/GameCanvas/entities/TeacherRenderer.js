export class TeacherRenderer {
    constructor(scene) {
        this.scene = scene;
        this.sprite = null;
        this._lastSC = null;
    }

    create() {
        const { scene } = this;

        scene.anims.create({
            key: "teacher-idle",
            frames: scene.anims.generateFrameNumbers("teacher", {
                start: 6 * 10,
                end: 6 * 10 + 5,
            }),
            frameRate: 8,
            repeat: -1,
        });

        const W = scene.scale.width;
        const H = scene.scale.height;
        const rawScale = W / 340;
        const hudScale = Math.floor(rawScale);
        const hudH = 79 * hudScale;

        this.sprite = scene.add.sprite(W * 0.22, H - hudH - 80, "teacher")
            .setScale(hudScale)
            .setDepth(9)
            .play("teacher-idle");
    }

    update(player) {
        if (!this.sprite || !player) return;

        if (this._lastSC !== null && player.SC < this._lastSC) {
            this._flashHit();
        }

        this._lastSC = player.SC;
    }

    _flashHit() {
        this.sprite.setTint(0xff4444);
        this.scene.time.delayedCall(150, () => this.sprite?.clearTint());
    }
}
