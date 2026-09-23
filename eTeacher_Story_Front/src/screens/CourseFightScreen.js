import { BaseScreen } from "./BaseScreen.js";
import { InformationCard } from "../features/courseFight/components/InformationCard/InformationCard.js";
import courseFightService from "../features/courseFight/service/CourseFightService.js";
import "../styles/CourseFightScreen.css";
import { GameSocketClient } from "../features/courseFight/service/GameSocketClient.js";
import { GameCanvas } from "../features/courseFight/components/GameCanvas/GameCanvas.js";


export class CourseFightScreen extends BaseScreen {

    constructor(screenManager) {
        super(screenManager);
        this.player = null;
        this.course = null;
        this.courseRun = null;
        this.gameSession = null;
        this.gamePupilStates = null;
        this.informationCard = null;
        this.gameCanvas = null;
        this.socketClient = new GameSocketClient();
    }

    async render(parentElement, data) {
        this.element = document.createElement('div');
        this.element.className = 'screen';
        this.element.innerHTML = `
            <div class="course-fight-screen__information">
                <div class="information-container">
                    
                </div>
            </div>
            
            <div class="course-fight-screen__game">
                <div class="game-container">
                    
                </div>
            </div>
        `;

        parentElement.appendChild(this.element);
        return this.element;
    }

    async onEnter(params) {
        this.course = params.course;
        this.playerAlreadyHasClass = params.alreadyHasClass || false;
        await this._loadFight();
    }

    async onExit() {
        this.socketClient.disconnect();

        this.informationCard?.destroy();
        this.gameCanvas?.destroy();
        this.informationCard = null;
        this.gameCanvas = null;
    }

    async _loadFight() {
        const informationContainer = this.element.querySelector('.information-container');
        const gameContainer = this.element.querySelector('.game-container');

        if (!informationContainer || !gameContainer) return;

        try {
            let player, courseRun, gameSession, gamePupilStates;

            if (this.playerAlreadyHasClass) {
                player = await courseFightService.getPlayer();
                courseRun = await courseFightService.getActiveCourseRun();
                this.course = courseRun.course;
                gameSession = courseRun.gamesSession?.[courseRun.gamesSession.length - 1];
                gamePupilStates = gameSession.pupilsState;
            } else {
                ({ player, courseRun, gameSession, gamePupilStates } =
                    await courseFightService.assignCourseToPlayer(this.course.id));
            }

            this.player = player;
            this.courseRun = courseRun;
            console.log(courseRun);
            this.gameSession = gameSession;
            this.gamePupilStates = gamePupilStates;

            informationContainer.innerHTML = '';
            this.informationCard = new InformationCard(
                this.player,
                this.course,
                this.gameSession,
                this.gamePupilStates
            );

            informationContainer.appendChild(this.informationCard.render());

            gameContainer.innerHTML = '';
            this.gameCanvas = new GameCanvas(gameContainer);
            this.gameCanvas.init();

            this.gameCanvas.onAction(({ action, skillName, targetRow, targetCol }) => {
                this.socketClient.useSkill({
                    sessionId: this.gameSession.id,
                    playerId: this.player.id,
                    skillName,
                    targetRow,
                    targetCol,
                });
            });

            this.socketClient.onConnected = () => {
                this.socketClient.joinGame(gameSession.id);
            };

            this.socketClient.onStateUpdate = (state) => {
                console.log("[GAME] State updated:", JSON.stringify(state, null, 2));
                this.gameCanvas.update(state);
            }

            this.socketClient.onGameOver = (data) => {
                console.log("[GAME] Game finished");
            }

            this.socketClient.onError = (message) => {
                console.error("[GAME] Error:", message);
            };

            console.log("Conectando socket con player:", player.id);
            this.socketClient.connect(player.id);

        } catch (error) {
            throw error;
        }
    }
}

export default CourseFightScreen;