import { Request, Response } from "express";
import { CourseRunService } from "../services/courseRunService";


export class CourseRunController {
    static async create(req: Request, res: Response) {
        try {
            const { playerId, courseId } = req.body;

            if (!playerId || !courseId) return res.status(400).json({ message: "playerId and courseId are required" });

            const courseRun = await CourseRunService.startCourseRun(playerId, courseId);

            return res.status(201).json(courseRun)
        } catch (error: any) {
            return res.status(400).json({
                message: error.message ?? "Error Stating course",
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { playerId } = req.body;

            if (!playerId) return res.status(400).json({ message: "playerId are required "});

            await CourseRunService.deleteCourseRun(playerId);

            return res.status(201).json({
                message: "CourseRun have been deleted"
            });

        } catch (error: any) {
            return res.status(400).json({
                message: error.message ?? "Error to delete courseRun"
            });
        }


    }
}