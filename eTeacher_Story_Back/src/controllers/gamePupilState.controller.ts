import { Request, Response } from "express";
import {GamePupilStateService} from "../services/gamePupilState.service";


export class GamePupilStateController {

    static async create(req: Request, res: Response) {
        try {
            const { gameSessionId, courseId } = req.body;

            if (!gameSessionId || courseId) return res.status(400).json({ message: "gameSessionId and courseId are required" });

            const response = await GamePupilStateService.createPupilStateFromCourse(gameSessionId, courseId);

            return res.status(201).json(response);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message ?? "Error sating fight",
            });
        }
    }
}