import { AppDataSource } from "../../data-source";
import { Skill } from "../../models/skill";
import { GamePupilState } from "../../models/gamePupilState";
import { SessionCache } from "../../services/gameSocket.service";
import { resolveTargets, TargetInput } from "./targetResolver";
import { PUPIL_BEHAVIOR } from "../constants/pupil/pupilBehavior.constant";



const skillRepo = () => AppDataSource.getRepository(Skill);

export interface ActionPayload {
    sessionId: string;
    playerId: string;
    action: "skill" | "item";
    skillName?: string;
    itemId?: string;
    targetRow?: number;
    targetCol?: number;
}

function applySkillDamage(pupilState: GamePupilState, skill: Skill, multiplier: number) {
    const ignoranceDmg = Math.floor(skill.ignoranceDamage * multiplier);
    const boredomDmg = Math.floor(skill.boredomDamage * multiplier);
    const mixedDmg = Math.floor(skill.mixedDamage * multiplier);

    if (pupilState.defeated) return;

    pupilState.boredomPoints = Math.max(0, pupilState.boredomPoints - boredomDmg);
    pupilState.ignorancePoints = Math.max(0, pupilState.ignorancePoints - ignoranceDmg);

    if (pupilState.boredomPoints >= mixedDmg) {
        pupilState.boredomPoints = Math.max(0, pupilState.boredomPoints - mixedDmg);
    } else {
        const mixedPenetrationDamage = mixedDmg - pupilState.boredomPoints;
        pupilState.boredomPoints = 0;
        pupilState.ignorancePoints = Math.max(0, pupilState.ignorancePoints - mixedPenetrationDamage);
    }

    if (pupilState.ignorancePoints === 0) {
        pupilState.defeated = true;
    }
}

export async function applyTeacherAction(cache: SessionCache, payload: ActionPayload) {
    const { session, player } = cache;

    if (payload.action === "skill") {
        if (!payload.skillName) return;

        const skill = await skillRepo().findOne({ where: { name: payload.skillName }});
        if (!skill) return;

        const hasSkill = player.skillsId.some((s) => s.name === payload.skillName);
        if (!hasSkill) return;

        const cd = player.teacherCooldowns[payload.skillName] ?? 0;
        if (cd > 0) return;

        const targetInput: TargetInput = {
            type: skill.target,
            row: payload.targetRow ?? -1,
            col: payload.targetCol ?? -1,
        }

        const alivePupils = session.pupilsState.filter((p) => !p.defeated);
        const targets = resolveTargets(alivePupils, targetInput) ?? [];
        if (targets.length === 0) return;

        const results = targets.map((t) => applySkillDamage(t, skill, player.damageMultiplier));

        player.teacherCooldowns = {
            ...player.teacherCooldowns,
            [payload.skillName]: skill.cooldownTurns
        }
    }
}

function weightedRandomPupil(pupils: GamePupilState[]) {
    if (pupils.length === 0) return null;

    const totalWeight = pupils.reduce(
        (sum, p) => sum + PUPIL_BEHAVIOR[p.pupil.behavior].weight, 0
    );

    let random = Math.random() * totalWeight;

    for (const p of pupils) {
        PUPIL_BEHAVIOR[p.pupil.behavior]
        random -= PUPIL_BEHAVIOR[p.pupil.behavior].weight;
        if (random <= 0) return p;
    }

    return pupils[pupils.length - 1];
}

export function applyStudentAction(cache: SessionCache, payload: ActionPayload) {
    const { session, player } = cache;
    const alivePupils = session.pupilsState.filter((p) => !p.defeated);

    if (alivePupils.length === 0) return;

    const selectedPupil = weightedRandomPupil(alivePupils);
    if (!selectedPupil) return;

    const scDamage = Math.floor(Math.random() * 8);
    player.SC = Math.max(0, player.SC - scDamage);
}

export function advanceTurn(cache: SessionCache) {
    const { session, player } = cache;
    const alivePupils = session.pupilsState.filter((p) => !p.defeated);

    if (alivePupils.length === 0) {
        session.phase = "finished";
        return session.won = true;
    } else if (player.SC <= 0) {
        session.phase = "finished";
        return session.won = false;
    } else if (session.phase === "teacher") {
        session.phase = "student";
        cache.activeStudentIndex = session.pupilsState.findIndex((p) => !p.defeated);
        return;
    }

    const updatedCooldowns: Record<string, number> = {};
    for (const key in player.teacherCooldowns) {
        const val = Math.max(0, player.teacherCooldowns[key] - 1);
        if (val > 0) updatedCooldowns[key] = val;
    }

    player.teacherCooldowns = updatedCooldowns;
    session.phase = "teacher";
}

export function isGameOver(cache: SessionCache) {
    return cache.session.phase === "finished";
}

export function getResult(cache: SessionCache) {
    return cache.session.won;
}