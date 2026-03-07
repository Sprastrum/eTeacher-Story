export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randIntPairs(minCol: number, maxCol: number, minRow: number, maxRow: number, quantity: number) {
    const desks = new Set<string>;

    while(desks.size < quantity) {
        const desk: [number, number] = [randInt(minCol, maxCol), randInt(minRow, maxRow)];

        desks.add(JSON.stringify(desk));
    }

    return Array.from(desks).map(d => JSON.parse(d));
}