import { CourseCard } from "../CourseCard/CourseCard.js";
import "./CourseList.css";


export class CourseList {

    constructor(courses = [], options = {}) {
        this.courses = courses;
        this.layout = options.layout || 'grid';
        this.onCourseSelect = options.onCourseSelect;
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `course-list-container`;

        if (this.courses.length === 0) {
            console.log('Courses not found');
            return this.element;
        }

        const grid = document.createElement('div');
        grid.className = `courses-${this.layout}`;

        this.courses.forEach((courseData, index) => {
            const card = new CourseCard(courseData, (selectedCourse) => {
                this.handleCourseSelection(selectedCourse);
            });
            const cardElement = card.render();
            cardElement.className = `course-card`;

            grid.appendChild(cardElement);
        });

        this.element.appendChild(grid);

        return this.element;
    }

    handleCourseSelection(course) {
        if (this.onCourseSelect) {
            this.onCourseSelect(course);
        }
    }

    destroy() {
        if (this.element) {
            this.element.remove();
            this.element =  null;
        }
    }
}