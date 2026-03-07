import { BaseScreen } from "./BaseScreen.js";
import "../styles/CourseFightScreen.css"
import CourseFightService from "../features/courseFight/service/CourseFightService.js";
import { InformationCard } from "../features/courseFight/components/InformationCard/InformationCard.js";


export class CourseFightScreen extends BaseScreen {

    constructor(screenManager) {
        super(screenManager);
        this.player = null;
        this.course = null;
        this.courseRun = null;
        this.gameSession = null;
        this.gamePupilStates = null;
        this.informationCard = null;
    }

    async render(parentElement, data) {

        this.element = document.createElement('div');
        this.element.className = 'course-fight-screen';
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

        await this._loadFight();
    }

    async onExit() {

        if (this.courseList) {
            this.courseList.destroy();
            this.courseList = null;
        }
    }

    async _loadFight() {

        const informationContainer = this.element.querySelector('.information-container')
        const gameContainer = this.element.querySelector('.game-container')

        if (!informationContainer || !gameContainer) return;

        try {
            const { player, courseRun, gameSession, gamePupilStates } = await CourseFightService.assignCourseToPlayer(this.course.id);

            this.player = player;
            this.courseRun = courseRun;
            this.gameSession = gameSession;
            this.gamePupilStates = gamePupilStates;

            console.log(this.player);
            console.log(this.courseRun);
            console.log(this.gameSession);
            console.log(this.gamePupilStates);

            gameContainer.innerHTML = '';
            informationContainer.innerHTML = '';

            this.informationCard = new InformationCard(this.player, this.course, this.gameSession, this.gamePupilStates);

            const informationCardElement = this.informationCard.render();

            informationContainer.appendChild(informationCardElement);

        } catch (error) {
            throw error;
        }
    }
}

export default CourseFightScreen;