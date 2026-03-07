import { Request, Response } from "express";
import { GameSessionService } from "../services/gameSession.service";


export class GameSessionController {

    static async start(req: Request, res: Response) {
        try {
            const { courseRunId } = req.body;

            const session = await GameSessionService.startFight(courseRunId);

            return res.status(201).json(session);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message ?? "Error starting fight",
            });
        }
    }
}