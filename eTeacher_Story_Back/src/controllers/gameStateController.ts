import { Request, Response } from "express";


export class GameStateController {

    static async getStateFromUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({
                    message: "userId is required"
                });
            }

        } catch (error: any) {
            return res.status(400).json({
                message: error.message ?? "User not found",
            });
        }
    }
}