export function computeGridGeometry(scene) {
    const W = scene.scale.width;
    const H = scene.scale.height;
    const rawScale = W / 340;
    const hudH = 79 * rawScale;

    return {
        cellW: 28,   // paso entre columnas (queda como lo tenés)
        cellH: 28,
        rowW: 58,    // paso entre filas: probá valores más grandes que cellW/cellH
        rowH: 58,
        scale: Math.floor(rawScale),
        originX: W * 0.51,
        originY: (H - hudH) * 0.65,
    };
}

export function cellToWorld(row, col, { originX, originY, cellW, cellH, rowW, rowH }) {
    return {
        x: originX + col * cellW - row * rowW,
        y: originY + (col * cellH + row * rowH) / 2,
    };
}
