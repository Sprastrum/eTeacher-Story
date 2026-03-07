import { DIFFICULTY_LEVELS } from '../../../../constants/course.types.js';
import "./CourseCard.css";
import {PUPIL_BEHAVIOR_TRANSLATIONS} from "../../../../constants/languages/pupilBehavior.translations.js";


export class CourseCard {
    constructor(course, onSelect) {
        this.course = course;
        this.onSelect = onSelect;
        this.element = null;
    }

    render() {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';

        const difficulty = DIFFICULTY_LEVELS[this.course.difficulty];

        courseCard.innerHTML = `
            <div class="course-card__header">
                <div class="course-card__description">
                    ¡La clase de <strong>${this.course.grade}</strong> necesita tus conocimientos de <strong>${this.course.subject}</strong>!
                </div>
            </div>
            
            <div class="course-card__body">
                <div class="course-card__columns">
                    <div class="course-card__students">
                        <div class="column-title">Tus alumnos:</div>
                        
                        <table class="students-table">
                            <thead>
                                <tr>
                                    <th class="student-name">Nombre</th>
                                    <th class="student-behavior">Carácter</th>
                                    <th class="student-grade">Nota</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                ${this.course.pupils.map(p => `
                                    <tr>
                                        <td class="student-name">${p.name}</td>
                                        <td class="student-behavior">${PUPIL_BEHAVIOR_TRANSLATIONS[p.behavior].en.name}</td>
                                        <td class="student-grade">${p.grade}/20</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                
                    <div class="course-card__objective">
                        <div class="column-title">Tus objetivos:</div>
                        
                        <div class="objective-box">
                            <div class="objective-item">
                                <span class="objective-label">Nota mínima</span>
                                <span class="objective-value">${this.course.goal_mark} /20</span>
                            </div>
                            
                            <span class="xp-reward">${this.course.reward}</span>
                            <span class="xp-icon"></span>
                            <span class="deadline">(Quedan ${this.course.deadline} clases)</span>
                        </div>
                    </div>
                    
                    <div class="course-card__difficulty">
                        <div class="column-title">Dificultad:</div>
                        <img src="${difficulty.icon}" alt="difficulty_icon" class="difficulty-icon">
                        
                        <div>
                            <button class="course-selection-botton" data-action="select">
                                Elige esta misión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.element = courseCard;
        this.attachEventListener();

        return courseCard;
    }

    attachEventListener() {
        const button = this.element.querySelector('[data-action="select"]');

        if (button) {
            button.addEventListener('click', () => {
                this.onSelect(this.course);
            });
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}