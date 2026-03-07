import { Course } from "../models/course";
import { Pupil } from "../models/pupil";
import { Random } from "./utils";
import { getRepository } from "typeorm";


const attackInventory: { [Key: string]: Function } = {
    attack_01: attack_01
};

export function PupilAttack(name: string, group: Course, attacker: Pupil) {
    if (attackInventory[name]) {
        return attackInventory[name](group, attacker);
    }
    return;
}

function attack_01(group: Course, emitter: Pupil) {

}