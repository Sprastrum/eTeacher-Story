import { AppDataSource } from "../data-source";
import { GameSession } from "../models/gameSession";
import { GamePupilState } from "../models/gamePupilState";
import { Player } from "../models/player";
import { Skill } from "../models/skill";

const sessionRepo = () => AppDataSource.getRepository(GameSession);
const pupilStateRepo = () => AppDataSource.getRepository(GamePupilState);
const skillRepo = () => AppDataSource.getRepository(Skill);
const playerRepo = () => AppDataSource.getRepository(Player);

export interface SessionCache {
    session: GameSession;
    player: Player;
    activeStudentIndex: number;
}

export const activeSessions = new Map<string, SessionCache>();

export async function loadSessionIntoMemory(sessionId: string) {
    const session = await sessionRepo().findOne({
        where: { id: sessionId },
        relations: [
            "pupilsState",
            "pupilsState.pupil",
            "courseRun",
            "courseRun.player",
            "courseRun.player.skillsId"],
    });

    if (!session) return new Error("Session not found");

    const player = session.courseRun?.player;
    if (!player) return new Error("Player not found");

    const cache: SessionCache = {
        session,
        player,
        activeStudentIndex: session.pupilsState.findIndex((p) => !p.defeated),
    };

    activeSessions.set(sessionId, cache);

    return cache;
}

export async function getOrLoadSession(sessionId: string) {
    if (activeSessions.has(sessionId)) return activeSessions.get(sessionId);
    const result = await loadSessionIntoMemory(sessionId);
    if (result instanceof Error) return null;
    return result;
}

export async function persistSessionState(cache: SessionCache) {
    await pupilStateRepo().save(cache.session.pupilsState);
    await sessionRepo().save(cache.session);
    await playerRepo().save(cache.player);
}

export async function persistGameOver(cache: SessionCache) {
    if (!cache.session.won) return;
    activeSessions.delete(cache.session.id);
}