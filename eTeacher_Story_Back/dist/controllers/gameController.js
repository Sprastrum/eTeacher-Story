"use strict";
const classFactory_1 = require("../services/classFactory");
const setupService_1 = require("../services/setupService");
const playerService_1 = require("../services/playerService");
const gameService_1 = require("../services/gameService");
const class_1 = require("../models/class");
const player_1 = require("../models/player");
class gameController {
    async TestFront(req, res) {
        let player = new player_1.Player(); //await playerService.getPlayerById(req.params["pid"]);
        player.currentMission = await (0, classFactory_1.GenerateClass)(1);
        let mission = await gameService.initLesson(player);
        res.status(200).send(JSON.stringify({
            "subject": mission.subject,
            "deskPlacement": mission.player.GameState.layout,
            "pupils": mission.pupils,
            "xp": mission.reward,
            "goal": mission.goal_mark,
            "initialized": false
        }));
    }
    async ShowNewMissions(req, res) {
        let missions = await setup.newMissions();
        res.status(200).send(JSON.stringify(missions));
    }
    async ActivateMission(req, res) {
        let mission = class_1.Class.Create(req.params["mission"]);
        await playerService.saveMission(req.params["pid"], mission);
        res.status(200).send();
    }
    async initLesson(req, res) {
        let player = await playerService.getPlayerById(req.params["pid"]);
        let mission = await gameService.initLesson(player);
        res.status(200).json(mission);
    }
    async lessonAction(req, res) {
        //TODO : ajouter de la validation des donn�es
        let body = req.body;
        let player;
        playerService.getPlayerById(body.playerid).then((p) => player = p).catch(() => res.status(500).send("Something went wrong..."));
        switch (body.type.lower()) {
            case "teaching":
                player = await gameService.Teach(player, body.action);
                player = await gameService.Attack(player);
                let response = await gameService.NewTurn(player);
                res.status(200).json(response);
            case "buff":
            //TODO
            case "swap":
            //TODO
            case "chosefavorite":
                await gameService.choseFavorite(player, body.target);
                res.status(200).json((player));
            case "favoriteskill":
                await gameService.Teach(player, body.action);
                res.status(200).json((player));
            case "grabobject":
                //TODO
                await gameService.NewTurn(player);
                res.status(200).json((player));
            default:
                res.status(400).send("Type d'action incorrrect !");
        }
        //D�chiffrer la requ�te POST
        //R�cup�rer les modifications
        //Mettre � jour la db
    }
}
const setup = new setupService_1.setupService();
const playerService = new playerService_1.PlayerService();
const gameService = new gameService_1.GameService();
module.exports = new gameController();
