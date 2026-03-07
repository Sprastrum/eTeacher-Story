"use strict";
const pupil_1 = require("../models/pupil");
const class_1 = require("../models/class");
const setupService_1 = require("../services/setupService");
const typeorm_1 = require("typeorm");
class devController {
    async sendClass(req, res) {
        let group = new class_1.Class();
        res.status(200).json(JSON.stringify(group));
    }
    async testDB(req, res) {
        //res.status(200).send(getConnection().isConnected);
        res.status(200).send("oui.");
    }
    async getFromDb(req, res) {
        let pupilRepository = (0, typeorm_1.getRepository)(pupil_1.Pupil);
        res.status(200).send(await pupilRepository.find({ select: ["name", "mark"] }));
    }
    async createStudent(req, res) {
        let name = req.params["name"];
        let mark = +req.params["mark"];
        let pupil = new pupil_1.Pupil();
        pupil.mark = mark;
        //Attention : va provoquer une erreur car tous les champs requis ne sont pas remplis
        (0, typeorm_1.getConnection)()
            .manager.save(pupil)
            .then(pupil => {
            res.status(200).send(`L'élève ${pupil.name} a bien été enregistré.`);
        })
            .catch(e => res.status(200).send("Erreur dans l'enregistrement"));
    }
    async newMission(req, res) {
        let missions = await setup.newMissions();
        res.status(200).send(JSON.stringify(missions));
    }
}
const setup = new setupService_1.setupService();
module.exports = new devController();
