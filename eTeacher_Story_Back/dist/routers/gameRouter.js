"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRouter = void 0;
const common_routes_config_1 = require("./common.routes.config");
const gameController_1 = __importDefault(require("../controllers/gameController"));
class GameRouter extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "GameRoutes");
    }
    configureRoutes() {
        this.app.route("/lessonaction").post(gameController_1.default.lessonAction);
        this.app.route("/newmission").get(gameController_1.default.ShowNewMissions);
        this.app.route("/newmission").post(gameController_1.default.ActivateMission);
        this.app.route("/testfront").get(gameController_1.default.TestFront);
        return this.app;
    }
}
exports.GameRouter = GameRouter;
