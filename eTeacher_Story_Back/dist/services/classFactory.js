"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateClass = void 0;
const class_1 = require("../models/class");
const utils_1 = require("./utils");
const pupilFactory_1 = require("./pupilFactory");
const typeorm_1 = require("typeorm");
function GenerateGrade() {
    return `${(0, utils_1.Random)(0, 3) + 3}ème ${Grade[(0, utils_1.Random)(0, Grade.length - 1)]}`;
}
function GenerateSubject() {
    return Subject[(0, utils_1.Random)(0, Subject.length - 1)];
}
function GenerateDifficulty() {
    return (0, utils_1.Random)(0, 4);
}
function GenerateGoal(difficulty, nbPup) {
    var objective = [1, 1];
    objective[0] = (0, utils_1.Random)(2 * difficulty, 20);
    objective[1] = -1;
    return objective;
}
function GenerateDeadline(min, difficulty) {
    return (0, utils_1.Random)(min, 5 - difficulty);
}
function GeneratePupils(difficulty, nb) {
    let pupils = [];
    for (var i = 0; i < nb; i++) {
        (0, pupilFactory_1.GeneratePupil)(difficulty).then((pup) => {
            pupils.push(pup);
        });
    }
    return pupils;
}
async function GenerateClass(difficulty) {
    let classRepository = (0, typeorm_1.getRepository)(class_1.Class);
    let goal = GenerateGoal(difficulty);
    let group = new class_1.Class({
        grade: GenerateGrade(),
        subject: GenerateSubject(),
        difficulty: GenerateDifficulty(),
        deadline: GenerateDeadline(5, difficulty),
        goal_mark: goal[0],
        goal_number: goal[1],
        pupils: GeneratePupils(difficulty, 5)
    });
    //await classRepository.save(group);
    return group;
}
exports.GenerateClass = GenerateClass;
var Grade = ["A", "B", "C", "D", "E"];
var Subject = ["Histoire-Géo", "Sciences", "Mathématiques"];
