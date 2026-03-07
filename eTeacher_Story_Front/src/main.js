import CourseSelectionScreen from "./screens/CourseSelectionScreen.js";
import CourseFightScreen from "./screens/CourseFightScreen.js";
import { ScreenManager } from "./core/ScreenManager.js";
import "./styles/global.css";


const app = document.getElementById("app");

const screenManager = new ScreenManager(app);

screenManager.registerScreen(
    "course-selection",
    new CourseSelectionScreen(screenManager)
);

screenManager.registerScreen(
    "course-fight",
    new CourseFightScreen(screenManager)
);

(async () => {
    await screenManager.goToScreen("course-selection");
})();