import { AppDataSource } from "../data-source";
import { CourseRun } from "../models/courseRun";
import { Player } from "../models/player";
import { Course } from "../models/course";
import { GameSession } from "../models/gameSession";


export class CourseRunService {

    static async startCourseRun(playerId: string, courseId: string): Promise<CourseRun> {

        return AppDataSource.transaction(async (manager) => {

            const courseRunRepo = manager.getRepository(CourseRun);
            const playerRepo = manager.getRepository(Player);
            const courseRepo = manager.getRepository(Course);

            const player = await playerRepo.findOne({
                where: { id: playerId },
            });

            if (!player) throw new Error("Player not found");

            const course = await courseRepo.findOne({
                where: { id: courseId },
            });

            if (!course) throw new Error("Course not found");

            const activeRun = await courseRunRepo.findOne({
                where: {
                    player: { id: playerId },
                    completed: false,
                    failed: false,
                },
            });

            if (activeRun) throw new Error("Player already has an active course");

            const courseRun = courseRunRepo.create({
                player,
                course,
                currentDay: 1,
                completed: false,
                failed: false,
            });

            return await courseRunRepo.save(courseRun);
        });
    }

    static async deleteCourseRun(playerId: string) {

        return AppDataSource.transaction(async (manager) => {

            const courseRunRepo = manager.getRepository(CourseRun);

            const courseRun = await courseRunRepo.findOne({
                where: { player: { id: playerId } },
                relations: ['player']
            });

            if (!courseRun) throw new Error("courseRun not found");

            await manager.getRepository(GameSession).delete({ courseRun: { id: courseRun.id } });

            await manager.getRepository(Player).update(
                { id: playerId },
                { currentClass: null },
            );

            await courseRunRepo.delete(courseRun.id);
        });
    }
}
