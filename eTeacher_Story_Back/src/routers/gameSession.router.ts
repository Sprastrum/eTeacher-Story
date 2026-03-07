import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { GameSessionController } from "../controllers/gameSession.controller";
import e from "express";

export class GameSessionRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "GameSessionRoutes");
    }

    configureRoutes(): e.Application {
        this.app.route("/api/game-session/create").post(GameSessionController.start);

        return this.app;
    }
}