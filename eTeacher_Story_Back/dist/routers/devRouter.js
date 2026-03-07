"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevRouter = void 0;
const common_routes_config_1 = require("./common.routes.config");
const devController_1 = __importDefault(require("../controllers/devController"));
class DevRouter extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "DevRoutes");
    }
    configureRoutes() {
        this.app.route("/getclass").get(devController_1.default.sendClass);
        this.app.route("/testdb").get(devController_1.default.getFromDb);
        this.app.route("/createStud").post(devController_1.default.createStudent);
        this.app.route("/newmission").get(devController_1.default.newMission);
        return this.app;
    }
}
exports.DevRouter = DevRouter;
