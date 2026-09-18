import CourseSelectionScreen from "./screens/CourseSelectionScreen.js";
import CourseFightScreen from "./screens/CourseFightScreen.js";
import { ScreenManager } from "./core/ScreenManager.js";
import courseFightService from "./features/courseFight/service/CourseFightService.js";
import "./styles/global.css";


const app = document.getElementById("app");
const screenManager = new ScreenManager(app);
window.__screenManager = screenManager;

screenManager.registerScreen("course-selection", new CourseSelectionScreen(screenManager));

screenManager.registerScreen("course-fight", new CourseFightScreen(screenManager));

(async () => {
    const player = await courseFightService.getPlayer();

    if (player.currentClass) {
        await screenManager.goToScreen(
            "course-fight", {
                course: player.currentClass,
                alreadyHasClass: true,
            });
    } else {
        await screenManager.goToScreen("course-selection");
    }
})();