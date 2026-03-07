import { CourseRun } from "../models/courseRun";
import { randInt, randIntPairs } from "../utils/random.utils";


const MATRIX_ROWS = 3;

const REDUCED_MATRIX_COL_MIN = 1;
const REDUCED_MATRIX_COL_MAX = 2;

const QUANTITY_EMPTY_DESK_MIN = 1;

export class GameSessionFactory {

    static generateMatrix(pupilCount: number) {
        const cols = pupilCount - randInt(REDUCED_MATRIX_COL_MIN, REDUCED_MATRIX_COL_MAX);

        const matrix = Array.from({ length: MATRIX_ROWS }, () => Array(cols).fill(0));
        const result = matrix.map(row => [...row]);

        const realQuantity = randInt(QUANTITY_EMPTY_DESK_MIN, pupilCount - 1) + pupilCount;
        const pairs = randIntPairs(0, cols - 1, 0, MATRIX_ROWS - 1, realQuantity);

        for (const [row, col] of pairs) result[row][col] = 1;

        return result;
    }

    static create(courseRun: CourseRun, pupilCount: number) {
        const day = courseRun.currentDay;

        return {
            courseRun,
            dayNumber: day,
            currentTurn: 1,
            finished: false,
            matrix: this.generateMatrix(pupilCount),
        };
    }
}