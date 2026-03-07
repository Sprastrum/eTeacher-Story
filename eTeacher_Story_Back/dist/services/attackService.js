"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PupilAttack = void 0;
const attackInventory = {
    attack_01: attack_01
};
function PupilAttack(name, group, attacker) {
    if (attackInventory[name]) {
        return attackInventory[name](group, attacker);
    }
    return;
}
exports.PupilAttack = PupilAttack;
function attack_01(group, emitter) {
}
