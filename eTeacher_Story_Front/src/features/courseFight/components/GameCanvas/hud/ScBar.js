export class ScBar {
    constructor(scene) {
        this.scene = scene;
        this.scLife = null;
        this.scText = null;
    }

    create() {
        const { scene } = this;
        const W = scene.scale.width;
        const H = scene.scale.height;
        const hudScale = W / 340;
        const hudY = H - (79 * hudScale) / 2;

        scene.add.image(W / 2, hudY, "hud")
            .setScale(hudScale)
            .setDepth(20);

        scene.add.image(W / 2, hudY, "hudOver")
            .setScale(hudScale)
            .setDepth(22);

        this.scLife = scene.add.image((29 * hudScale), hudY + (13.5 * hudScale), "hudLife")
            .setScale(hudScale - 0.1)
            .setDepth(21);

        this.scText = scene.add.text((29 * hudScale), hudY + (13.5 * hudScale), "--", {
            fontSize: `${Math.floor(10 * hudScale)}px`,
            color: "#ffffff",
            fontFamily: "monospace",
            align: "center",
            fontStyle: "bold",
        }).setOrigin(0.5).setDepth(25);

        const timeX = W * 0.89;
        scene.add.image(timeX, hudY - hudScale, "hudTime1")
            .setScale(hudScale - 0.1)
            .setDepth(21);
        scene.add.image(timeX, hudY + (24 * hudScale), "hudTime2")
            .setScale(hudScale - 0.1)
            .setDepth(21);
    }

    update(sc, maxSC) {
        if (!this.scLife || !this.scText) return;

        const pct = sc / maxSC;

        if (pct > 0.5) {
            this.scLife.clearTint();
        } else if (pct > 0.25) {
            this.scLife.setTint(0xff8800);
        } else {
            this.scLife.setTint(0xff2200);
        }

        this.scText.setText(`${sc}`);
    }
}
