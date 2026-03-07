"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSkill = void 0;
const utils_1 = require("./utils");
const skillInventory = {
    skill_01: skill_01,
    skill_02: skill_02,
    skill_03: skill_03,
    skill_04: skill_04,
    skill_05: skill_05,
    skill_06: skill_06,
    skill_07: skill_07,
    skill_08: skill_08,
    skill_09: skill_09,
    skill_10: skill_10,
    /*        skill_11: skill_11,
            skill_12: skill_12,
            skill_13: skill_13,
            skill_14: skill_14,
            skill_15: skill_15,
            skill_16: skill_16,
            skill_17: skill_17,
            skill_18: skill_18,
            skill_19: skill_19,
            skill_20: skill_20,
            skill_21: skill_21,
            skill_22: skill_22,
            skill_23: skill_23,
            skill_24: skill_24,
            skill_25: skill_25,
            skill_26: skill_26,
            skill_27: skill_27,
            skill_28: skill_28,
            skill_29: skill_29,
            skill_30: skill_30,
            skill_31: skill_31,
            skill_32: skill_32,
            skill_33: skill_33,
            skill_34: skill_34*/
};
function useSkill(name, group, targetsId) {
    if (skillInventory[name]) {
        if (targetsId.length > 1) {
            let pupils;
            for (let pupilId of targetsId)
                pupils.push(group.pupils.find((p) => p.id == pupilId));
            return skillInventory[name](group, pupils);
        }
        else {
            let pupil = group.pupils.find((p) => p.id == targetsId[0]);
            return skillInventory[name](group, pupil);
        }
    }
    throw new Error(`Method '${name}' is not implemented.`);
}
exports.useSkill = useSkill;
function areOnSameTable(pupils) {
    if (pupils.length == 1)
        return true;
    for (let i = 0; i < pupils.length - 1; i++) {
        if (pupils[i].desk - pupils[i + 1].desk != 1 && [10, 20, 30].includes(pupils[i].desk)) {
            return false;
        }
    }
    return true;
}
// Enseigner
function skill_01(group, targets) {
    if (!areOnSameTable(targets))
        throw new Error("Invalid target pupils");
    for (let pupil of targets) {
        pupil.TakeDamage(2, "normal");
    }
}
//Concentration !
function skill_02(group, targets) {
    if (!areOnSameTable(targets))
        throw new Error("Invalid target pupils");
    for (let pupil of targets) {
        pupil.TakeDamage(5, "shields");
    }
    if (targets.length == 1) {
        targets[0].buff.push(1);
    }
}
//Interroger
function skill_03(group, target) {
    target.TakeDamage(4, "normal");
}
//Rappel à l'ordre
function skill_04(group, target) {
    target.TakeDamage(1, "shields");
    target.LoseDebuff();
}
//Hurler le cours
function skill_05(group, targets) {
    for (var i = 0; i < targets.length - 1; i++) {
        if (targets.length > 1 && targets[i + 1].desk - targets[i].desk % 10 != 0) {
            throw new Error("Pupils are not in a column");
        }
    }
    for (let i = 0; i < targets.length; i++) {
        targets[i].TakeDamage(2, "normal");
    }
}
//Pointe de sagesse
function skill_06(group, target) {
    target.TakeDamage(2, "true");
}
//Punition G�n�rale
function skill_07(group, targets) {
    for (let pupil of targets) {
        if (pupil.debuff.length > 0) {
            let removei = (0, utils_1.Random)(0, pupil.debuff.length);
            pupil.debuff.splice(removei, 1);
            if (Math.random() < 0.25) {
                pupil.shields += 1;
            }
        }
    }
}
//Un peu de sérieux !
function skill_08(group, targets) {
    for (let pupil of targets) {
        if (pupil.debuff.length > 0) {
            pupil.TakeDamage(3, "true");
        }
        else {
            pupil.TakeDamage(3, "normal");
        }
    }
}
//Contre-attaque
function skill_09(group, target) {
    throw new Error("Skill too complicated to be implemented");
}
//Sacrifice
function skill_10(group, target) {
    throw new Error("Something to do prior");
}
