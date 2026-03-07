import {PLAYER_LEVELS} from "../../../../constants/player.types.js";


export class InformationCard {
    constructor(player, course, gameSession, gamePupilStates) {
        this.player = player;
        this.course = course;
        this.gameSession = gameSession;
        this.gamePupilStates = gamePupilStates;
        this.element = null;
    }

    render() {

        const informationCard = document.createElement('div');
        informationCard.className = 'information-card';

        const grade = PLAYER_LEVELS[this.player.grade];

        informationCard.innerHTML = `
            <div class="grade-box" xmlns="http://www.w3.org/1999/html">
                <img src="${grade.icon}" alt="grade-icon" class="grade-icon">
                <span class="level-label">Nivel</span>
                <span class="level-value">${this.player.level}</span>
            </div>
            
            <div class="column-title">Objetivos:</div>
            <div class="objective-box">
                <div class="objective-item">
                    <span class="objective-label">Nota mínima</span>
                    <span class="objective-value">${this.course.goal_mark} /20</span>
                </div>
                            
                <span class="xp-reward">${this.course.reward}</span>
                <span class="xp-icon"></span>
                <span class="deadline">(Quedan ${this.course.deadline} clases)</span>
            </div>
            
            <div class="column-title">${this.course.grade}</div>
            <table class="student-state-table">
                <thead>
                    <th class="student-name">Nombre</th>
                    <th class="student-grade">Nota</th>
                </thead>
                
                <tbody>
                    ${this.gamePupilStates.map(p => `
                        <tr>
                            <td class="student-name">${p.name}</td>
                            <td class="student-grade">${p.grade}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        this.element = informationCard;

        return informationCard;
    }

    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}