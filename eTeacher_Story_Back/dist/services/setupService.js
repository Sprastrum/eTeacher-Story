"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupService = void 0;
const classFactory_1 = require("./classFactory");
const utils_1 = require("./utils");
class setupService {
    newMissions() {
        let missionTable = [];
        for (var i = 0; i < 3; i++) {
            (0, classFactory_1.GenerateClass)((0, utils_1.Random)(0, 4)).then((mission) => {
                missionTable.push(mission);
            });
        }
        return missionTable;
    }
}
exports.setupService = setupService;
