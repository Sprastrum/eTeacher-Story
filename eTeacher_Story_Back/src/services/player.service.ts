import { AppDataSource } from "../data-source";
import { Player } from "../models/player"


export class PlayerService {

    static async getPlayer(playerId: string) {
        return AppDataSource.transaction(async (manager) => {
            const playerRepo = manager.getRepository(Player);

            const player = await playerRepo.findOne({
                where: { id: playerId },
                relations: ['currentClass'],
            });

            if (!player) throw new Error("Player not found");

            return player;
        });
    }
}