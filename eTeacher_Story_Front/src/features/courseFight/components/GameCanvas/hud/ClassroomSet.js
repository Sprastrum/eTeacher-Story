export class ClassroomSet {
    constructor(scene) {
        this.scene = scene;
    }

    create(hudScale, { register = (label, obj) => obj } = {}) {
        const { scene } = this;
        const W = scene.scale.width;
        const H = scene.scale.height;
        const hudY = (H / 2) - 50;
        const hudX = (W / 2) - 50;

        register("floorB", scene.add.image(hudX, hudY, "set2FloorB")
            .setScale(hudScale)
            .setDepth(2));
        register("floor", scene.add.image(hudX, hudY, "set2Floor")
            .setScale(hudScale)
            .setDepth(2));
        register("wallClass2", scene.add.image(hudX - 165, hudY + 90, "wallClass2")
            .setScale(hudScale)
            .setDepth(10));
        register("platform3", scene.add.image(hudX - 133, hudY + 67, "platform3")
            .setScale(hudScale)
            .setDepth(9));
        register("wallStreet", scene.add.image(hudX + 156, hudY + 90, "wallStreet")
            .setScale(hudScale)
            .setDepth(11));
        register("street2", scene.add.image(hudX + 245, hudY + 175, "street2")
            .setScale(hudScale)
            .setDepth(11));
        register("floor2", scene.add.image(hudX - 348, hudY + 172, "set3Floor")
            .setScale(hudScale)
            .setDepth(10));

        return { hudX, hudY };
    }
}
