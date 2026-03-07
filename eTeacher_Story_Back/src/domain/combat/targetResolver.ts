import {GamePupilState} from "../../models/gamePupilState";
import {TargetEnum} from "../enums/target.enum";

export interface TargetInput {
    type: TargetEnum;
    row?: number;
    col?: number;
    count?: number;
}

function resolveAdjacent(pupilStates: GamePupilState[], row: number, col: number): GamePupilState[] {
    const targets: GamePupilState[] = [];

    const rowStates = pupilStates.filter(
        s => s.row === row
    ).sort(
        (a, b) => a.col - b.col
    );

    const occupied = new Map(
        rowStates.map(s => [s.col, s])
    );

    for (let c = col - 1; occupied.has(c); c--) {
        targets.push(occupied.get(c)!);
    }

    for (let c = col + 1; occupied.has(c); c++) {
        targets.push(occupied.get(c)!);
    }

    return targets;
}

export function resolveTargets(pupilStates: GamePupilState[], target: TargetInput): GamePupilState[] {
    switch (target.type) {
        case TargetEnum.SINGLE:
            return pupilStates.filter(
                s => s.row === target.row && s.col === target.col
            );

        case TargetEnum.COLUMN:
            return pupilStates.filter(
                s => s.col === target.col
            );

        case TargetEnum.ROW:
            return pupilStates.filter(
                s => s.row === target.row
            );

        case TargetEnum.ALL:
            return pupilStates;

        case TargetEnum.TABLE:
            return resolveAdjacent(pupilStates, target.row, target.col);
    }
}