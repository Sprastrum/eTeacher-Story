"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const common_routes_config_1 = require("./common.routes.config");
const authController_1 = __importDefault(require("../controllers/authController"));
class AuthRouter extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "AuthRoutes");
    }
    configureRoutes() {
        this.app.route("/register").get(authController_1.default.GetRegisterVanilla);
        this.app.route("/register").post(authController_1.default.PostRegisterVanilla);
        this.app.route("/login").get(authController_1.default.GetLoginVanilla);
        this.app.route("/login").post(authController_1.default.PostLoginVanilla);
        return this.app;
    }
}
exports.AuthRouter = AuthRouter;
