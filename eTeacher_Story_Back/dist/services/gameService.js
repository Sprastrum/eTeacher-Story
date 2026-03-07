"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const player_1 = require("../models/player");
const typeorm_1 = require("typeorm");
const utils_1 = require("./utils");
const skillService_1 = require("./skillService");
const attackService_1 = require("./attackService");
const playerService_1 = require("./playerService");
const path = require("path");
const fs = require("fs");
const TOML = require('@iarna/toml');
const TROUBLES = TOML.parse(fs.readFileSync(path.resolve(__dirname, "../../troubles.toml")));
class GameService {
    initLesson(player) {
        //let playerRepo = getRepository(Player);
        let mission = player.currentMission;
        mission.player = player;
        let layout = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let nbDesk = mission.pupils.length + (0, utils_1.Random)(1, 5);
        let emptyDesks = [];
        for (var i = 0; i < nbDesk; i++) {
            placeDesk();
        }
        player.GameState.layout = layout;
        //Initiate pupils stats
        mission.pupils.forEach((pupil) => {
            let loc = (0, utils_1.Random)(0, emptyDesks.length - 1);
            pupil.desk = emptyDesks[loc];
            emptyDesks.splice(loc, 1);
            pupil.hp = (0, utils_1.Random)(1, 5);
            pupil.shields = (0, utils_1.Random)(0, 7);
        });
        //playerRepo.save(player);
        return mission;
        function placeDesk() {
            let loc = (0, utils_1.Random)(0, layout.length - 1);
            if (layout[loc] == 1)
                placeDesk();
            else {
                layout[loc] = 1;
                emptyDesks.push(loc);
            }
        }
    }
    EndClass(player) {
        let group = player.currentMission;
        let gain = 0;
        for (let pupil of group.pupils) {
            if (pupil.state = "beaten") {
                gain += 3;
            }
        }
        gain += player.GameState.turns_left * 3;
        player.Rank += gain;
        let bonusXP = player.GameState.turns_left;
        return player;
    }
    //Conditions pour un nouveau tour : enseigner ou r�cup�rer un objet
    async NewTurn(player) {
        let gstate = player.GameState;
        if (gstate.turns_left == 0) {
            return this.EndClass(player);
        }
        gstate.turns_left -= 1;
        for (let cd in gstate.cooldowns) {
            gstate.cooldowns[cd] -= 1;
            if (gstate.cooldowns[cd] <= 0) {
                delete gstate.cooldowns[cd];
            }
        }
        let i = 0;
        let newSkillsId;
        while (i < 4) {
            let newSkill = player.SkillsId[Math.floor(Math.random() * player.SkillsId.length)];
            if (!newSkillsId.includes(newSkill)) {
                newSkillsId.push(newSkill);
                i++;
            }
        }
        let playerRepo = (0, typeorm_1.getRepository)(player_1.Player);
        playerRepo.save(player);
        return [player, newSkillsId];
    }
    Teach(player, action) {
        let teaching = JSON.parse(action);
        if (!player.SkillsId.includes(teaching.skillId)) {
            throw new Error("La comp�tence n'est pas dans l'inventaire du joueur.");
        }
        //TODO : Impl�menter les modificateurs de bonus
        let group = (0, skillService_1.useSkill)(teaching.skillId.toString(), player.currentMission, teaching.targetPupils);
        for (let pupil of group.pupils) {
            if (pupil.CheckNewDefeat()) {
                pupil.Defeat();
                player.GainXP(2);
                player.GameState.XP_gained += 2;
            }
        }
        if (group.pupils.filter((p) => ["beaten", "out"].includes(p.state)).length == 0) {
            player = this.EndClass(player);
        }
        playerService_1.PlayerService.UpdatePlayer(player);
        return player;
    }
    //TODO: add crit chance
    Attack(player) {
        let valid_attackers = player.currentMission.pupils.filter(p => !["KO", "Beaten"].includes(p.state));
        let attacker = valid_attackers[(0, utils_1.Random)(0, valid_attackers.length)];
        let troubles = skillFilter(TROUBLES);
        let trouble = troubles[(0, utils_1.Random)(0, troubles.length)];
        let damage;
        for (let interval in trouble.damage) {
            if (parseInt(interval.split("-")[0]) < player.level && player.level < parseInt(interval.split("-")[1])) {
                damage = trouble.damage[interval];
            }
        }
        player.SC -= damage;
        let new_class = (0, attackService_1.PupilAttack)(trouble.id.toString(), player.currentMission, attacker);
        player.currentMission = new_class;
        playerService_1.PlayerService.UpdatePlayer(player);
        return player;
        function skillFilter(troubles) {
            let res = [];
            let property;
            for (property in troubles) {
                if (troubles[property].traitId.includes(attacker.traitId) && troubles[property].diff.grade <= player.grade && troubles[property].diff.level <= player.level)
                    res.push(troubles[property]);
            }
            return res;
        }
    }
    choseFavorite(player, target) {
        target.isFavorite = true;
        player.SkillsId.push(target.skillId);
        playerService_1.PlayerService.UpdatePlayer(player);
    }
}
exports.GameService = GameService;
