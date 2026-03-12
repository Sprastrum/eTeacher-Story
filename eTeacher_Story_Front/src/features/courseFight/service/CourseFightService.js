

class CourseFightService {
    constructor() {
        this.baseURL = this.getBaseURL();
        this.playerId = this.getPlayerId();
    }

    getPlayerId() {
        return 'e6fcbd72-cf97-4cfe-9ea4-a849df6d003a';
    }

    getBaseURL() {
        return 'http://localhost:3000/api';
    }

    async getPlayer() {
        const response = await fetch(`${this.baseURL}/player/${this.playerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Player not found`);
        }

        return response.json();
    }

    async createCourseRun(playerId, courseId) {
        const response = await fetch(`${this.baseURL}/course-run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerId: playerId,
                courseId: courseId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error to create CourseRun`);
        }

        return response.json();
    }

    async createGameSession(courseRunId) {
        const response = await fetch(`${this.baseURL}/game-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseRunId: courseRunId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error to create GameSession`);
        }

        return response.json();
    }

    async createGamePupilState(gameSession, courseId) {
        const response = await fetch(`${this.baseURL}/game-pupil-state`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameSessionId: gameSession.id,
                courseId: courseId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error to create GameSession`);
        }

        return response.json();
    }

    async assignCourseToPlayer(courseId) {
        try {
            const player = await this.getPlayer();
            let courseRun;
            let gameSession;
            let gamePupilStates;


            if (!player.currentClass) {
                courseRun = await this.createCourseRun(player.id, courseId);

                gameSession = await this.createGameSession(courseRun.id);

                gamePupilStates = await this.createGamePupilState(gameSession, courseId);
            }

            return { player, courseRun, gameSession, gamePupilStates };

        } catch (error) {
            throw error;
        }
    }
}

const courseFightService = new CourseFightService();
export default courseFightService;