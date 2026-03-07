"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePupil = void 0;
const pupil_1 = require("../models/pupil");
const utils_1 = require("./utils");
const typeorm_1 = require("typeorm");
function GenerateAppearance(gender) {
    //TODO
    return { /*name et sprite*/};
}
function GenerateMark() {
    return markPool[(0, utils_1.Random)(0, markPool.length)];
}
function GenerateTrait(diff, lvl) {
    let trait = [0];
    return trait[(0, utils_1.Random)(0, trait.length)];
}
function GenerateSkill(traitId) {
    let skill = [0];
    return skill[(0, utils_1.Random)(0, skill.length)];
}
function GenerateName() {
    let names = ["Marie", "Jean", "Camille", "Mathis"];
    return names[(0, utils_1.Random)(0, 4)];
}
async function GeneratePupil(difficulty) {
    const pupilRepository = (0, typeorm_1.getRepository)(pupil_1.Pupil);
    let trait = GenerateTrait(difficulty);
    let pupil = new pupil_1.Pupil({
        appearance: GenerateAppearance((0, utils_1.Random)(0, 1)),
        mark: GenerateMark(),
        traitId: trait,
        skillId: GenerateSkill(trait),
        name: GenerateName()
    });
    //await pupilRepository.save(pupil);
    return pupil;
}
exports.GeneratePupil = GeneratePupil;
const probMark = [{
        note: [2, 3],
        weight: 5
    }, {
        "note": [4, 5],
        "weight": 12
    }, {
        "note": [6],
        "weight": 20
    }, {
        "note": [7, 8],
        "weight": 30
    }, {
        "note": [9],
        "weight": 20
    }, {
        "note": [10],
        "weight": 8
    }, {
        "note": [11],
        "weight": 2
    }, {
        "note": [12],
        "weight": 2
    }, {
        "note": [13],
        "weight": 1
    }];
const markPool = [];
probMark.forEach((value) => {
    value.note.forEach((mark) => {
        for (var i = 0; i < value.weight; i++) {
            markPool.push(mark);
        }
    });
});
