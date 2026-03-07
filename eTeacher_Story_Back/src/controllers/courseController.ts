import { Request, Response } from "express";
import { CourseService } from "../services/course.service";


export class CourseController {

    static async assignPupils(req: Request, res: Response) {
        try {
            const { courseId } = req.params;
            const { pupilsIds } = req.body;

            if (!courseId || pupilsIds.length === 0 || !Array.isArray(pupilsIds)) {
                return res.status(400).json({
                    message: "courseId and pupilsIds is required"
                });
            }

            await CourseService.assignPupilToCourse(courseId, pupilsIds);

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({
                message: error.message ?? "Error assign pupils",
            });
        }
    }

    static async getCourses(req: Request, res: Response) {
        try {
            const course = await CourseService.getAvailableCoursesToPlayer();

            return res.status(200).send(course);

        } catch (error: any) {
            return res.status(400).json({
                message: error.message ?? "Error get courses",
            });
        }
    }
}