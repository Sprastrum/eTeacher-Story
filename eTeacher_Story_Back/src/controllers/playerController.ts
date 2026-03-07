import { Request, Response } from "express";
import {PlayerService} from "../services/playerService";


export class PlayerController {

    static async getPlayer(req: Request, res: Response) {
        try {
            const { playerId } = req.params;

            if (!playerId) return res.status(400).json({ message: "playerId is required" });

            const player = await PlayerService.getPlayer(playerId);

            return res.status(200).json(player);

        } catch (error: any) {
            return res.status(400).json({
                message: "playerId is required"
            });
        }
    }
}