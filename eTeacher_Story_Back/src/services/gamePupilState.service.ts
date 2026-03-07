import { AppDataSource } from "../data-source"
import { GameSession } from "../models/gameSession";
import { GamePupilState } from "../models/gamePupilState";
import { PUPIL_BEHAVIOR, PupilBehavior } from "../domain/constants/pupil/pupilBehavior.constant";
import { randInt } from "../utils/random.utils";
import { MatrixValue } from "../domain/constants/pupil/pupilMatrixValue.constant";
import { Course } from "../models/course";


export class GamePupilStateService {

    static getPositionForPupil(matrix: MatrixValue[][]) {
        const positions: [number, number][] = [];

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] === 1) positions.push([row, col]);
            }
        }

        return positions;
    }

    static pickRandom(positions: [number, number][], quantity: number) {
        const shuffled = [...positions].sort(() => Math.random() - 0.5);

        return shuffled.slice(0, quantity);
    }

    static async createPupilStateFromCourse(gameSessionId: string, courseId: string) {

        return AppDataSource.transaction(async (manager) => {
            const gameSessionRepo = manager.getRepository(GameSession);
            const pupilStateRepo = manager.getRepository(GamePupilState);
            const courseRepo = manager.getRepository(Course);

            const gameSession = await gameSessionRepo.findOne({
                where: { id: gameSessionId },
            });

            if (!gameSession) throw new Error("GameSession not found");

            const course = await courseRepo.findOne({
                where: { id: courseId },
                relations: [ 'pupils' ]
            });

            if (!course) throw new Error("Course not found");

            const pupilStates: GamePupilState[] = [];
            const randomPositions = this.pickRandom(this.getPositionForPupil(gameSession.matrix), course.pupils.length);
            let i = 0;

            for (const pupil of course.pupils) {
                const config = PUPIL_BEHAVIOR[pupil.behavior as PupilBehavior];

                const [row, col] = randomPositions[i];

                const state = pupilStateRepo.create({
                    pupil: pupil,
                    name: pupil.name,
                    grade: pupil.grade,
                    gameSession: gameSession,
                    ignorancePoints: randInt(config.ignorance.minPoints, config.ignorance.maxPoints),
                    boredomPoints: randInt(config.boredom.minPoints, config.boredom.maxPoints),
                    row: row,
                    col: col,
                });

                i++;

                gameSession.matrix[row][col] = state.id;

                pupilStates.push(state);
            }

            await pupilStateRepo.save(pupilStates);

            return pupilStates;
        });
    }
}