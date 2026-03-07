

class CourseSelectionService {
    constructor() {
        this.baseURL = this.getBaseURL();
    }

    getBaseURL() {
        return 'http://localhost:3000/api'
    }

    async fetchCourses() {
        try {
            const response = await fetch(`${this.baseURL}/courses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error(`HTTP error. Status: ${response.status}`);

            const data = await response.json();

            return Array.isArray(data) ? data : data.course || [];

        } catch (error) {
            throw error;
        }
    }
}

const courseSelectionService = new CourseSelectionService();
export default courseSelectionService;