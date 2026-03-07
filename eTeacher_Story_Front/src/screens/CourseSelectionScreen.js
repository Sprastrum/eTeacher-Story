import { BaseScreen } from "./BaseScreen.js";
import CourseSelectionService from "../features/courseSelection/service/CourseSelectionService.js";
import { CourseList } from "../features/courseSelection/components/CourseList/CourseList.js";
import "../styles/CourseSelectionScreen.css"


export class CourseSelectionScreen extends BaseScreen {

    constructor(screenManager) {
        super(screenManager);
        this.courses = []
        this.courseList = null;
        this.isLoading = false;
    }

    async render(parentElement, data) {
        this.element = document.createElement('div');
        this.element.className = 'course-selection-screen';
        this.element.innerHTML = `
            <div class="course-selection-screen__header">
                <h1>Selecciona un curso</h1>
            </div>
            
            <div class="course-selection-screen__content">
                <div class="course-list-container">
                    <div class="loading-placeholder">
                        <div class="spinner"></div>
                        <p>Cargando cursos...</p>
                    </div>
                </div>
            </div>
        `;

        parentElement.appendChild(this.element);

        return this.element;
    }

    async onEnter(params) {
        await this._loadCourses();
    }

    async onExit() {
        if (this.courseList) {
            this.courseList.destroy();
            this.courseList = null;
        }
    }

    async _loadCourses() {

        const listContainer = this.element.querySelector('.course-list-container');

        if (!listContainer) return;

        this.isLoading = true;

        try {
            this.courses = await CourseSelectionService.fetchCourses();

            listContainer.innerHTML = '';

            if (this.courses.length === 0) return;

            this.courseList = new CourseList(this.courses, {
                layout: 'grid',
                onCourseSelect: (selectedCourse) => {
                    this.handleCourseSelection(selectedCourse);
                }
            });

            const courseListElement = this.courseList.render();

            listContainer.appendChild(courseListElement);

        } catch (error) {
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    handleCourseSelection(course) {
        this.screenManager.goToScreen("course-fight", { course });
    }
}

export default CourseSelectionScreen;