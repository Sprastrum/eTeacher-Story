import { computeGridGeometry, cellToWorld } from "./isometricGrid.js";

export class DeskRenderer {
    constructor(scene, { register = (label, obj) => obj } = {}) {
        this.scene = scene;
        this.register = register;
        this.group = null;
        this._rendered = false;
    }

    create() {
        this.group = this.scene.add.group();
    }

    // La matriz no cambia durante la partida, así que se dibuja una sola vez;
    // así lo que muevas con el LayoutDebugger no se resetea en cada game_state.
    render(matrix = [], pupils = []) {
        if (this._rendered) return;
        this._rendered = true;

        const grid = computeGridGeometry(this.scene);
        const { scale } = grid;

        const occupied = new Set(pupils.map((p) => `${p.row}-${p.col}`));

        matrix.forEach((rowValues, row) => {
            rowValues.forEach((value, col) => {
                if (value !== 1 && !occupied.has(`${row}-${col}`)) return;

                const { x, y } = cellToWorld(row, col, grid);

                const chair = this.scene.add.image(x + 8, y - 14, "furnitureChair")
                    .setScale(scale)
                    .setDepth(4 + row)
                    .setFlipX(true);
                const desk = this.scene.add.image(x, y, "furnitureDesk")
                    .setScale(scale)
                    .setDepth(6 + row);

                this.register(`chair-${row}-${col}`, chair);
                this.register(`desk-${row}-${col}`, desk);

                this.group.addMultiple([chair, desk]);
            });
        });
    }
}
