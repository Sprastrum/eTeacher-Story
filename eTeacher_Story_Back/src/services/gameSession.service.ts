import { AppDataSource } from "../data-source";
import { CourseRun } from "../models/courseRun";
import { GameSession } from "../models/gameSession";
import { GamePupilState } from "../models/gamePupilState";
import { In } from "typeorm";
import { Skill } from "../models/skill";
import {GameSessionFactory} from "../factories/gameSession.factory";


export class GameSessionService {

    static async startFight(courseRunId: string): Promise<GameSession> {

        return AppDataSource.transaction(async (manager) => {
            const courseRunRepo = manager.getRepository(CourseRun);
            const gameSessionRepo = manager.getRepository(GameSession);

            const courseRun = await courseRunRepo.findOne({
                where: { id: courseRunId },
                relations: ['course', 'course.pupils'],
            });

            if (!courseRun) throw new Error("CourseRun not found");

            if (courseRun.completed || courseRun.failed) throw new Error("CourseRun already finished");

            const pupilCount = courseRun.course.pupils.length;

            const session = gameSessionRepo.create(
                GameSessionFactory.create(courseRun, pupilCount)
            );

            await gameSessionRepo.save(session);

            return session;
        });
    }

    static async useSkill(skill: Skill, gameSessionId: string, targetPupilIds: string[]) {
        const pupilStates = await AppDataSource.getRepository(GamePupilState).find({
            where: {
                gameSession: { id: gameSessionId },
                pupil: { id: In(targetPupilIds) },
            },
        });

        for(const pupilState of pupilStates) {
            await this.applySkill(skill, pupilState);
        }
    }

    static async applySkill(skill: Skill, pupilState: GamePupilState) {
        if (pupilState.defeated) return;

        pupilState.boredomPoints = Math.max(0, pupilState.boredomPoints - skill.boredomDamage);
        pupilState.ignorancePoints = Math.max(0, pupilState.ignorancePoints - skill.ignoranceDamage);

        if (pupilState.boredomPoints > skill.mixedDamage) {
            pupilState.boredomPoints = Math.max(0, pupilState.boredomPoints - skill.mixedDamage);
        } else {
            const mixedPenetrationDamage = skill.mixedDamage - pupilState.boredomPoints;
            pupilState.boredomPoints = 0;
            pupilState.ignorancePoints = Math.max(0, pupilState.ignorancePoints - mixedPenetrationDamage);
        }

        if (pupilState.ignorancePoints === 0) {
            pupilState.defeated = true;
        }
    }
}