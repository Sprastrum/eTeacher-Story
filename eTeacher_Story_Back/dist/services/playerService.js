"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const player_1 = require("../models/player");
const typeorm_1 = require("typeorm");
class PlayerService {
    async getPlayerById(pid) {
        let target = await (0, typeorm_1.getRepository)(player_1.Player).findOne({ where: { id: pid } });
        return target;
    }
    async saveMission(pid, mission) {
        let target = await this.getPlayerById(pid);
        target.currentMission = mission;
        await (0, typeorm_1.getRepository)(player_1.Player).save(target);
    }
    static async UpdatePlayer(player) {
        await (0, typeorm_1.getRepository)(player_1.Player).save(player);
    }
}
exports.PlayerService = PlayerService;
