import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { GamePupilStateController } from "../controllers/gamePupilState.controller";
import e from "express";

export class GamePupilStateRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "GamePupilStateRoutes");
    }

    configureRoutes(): e.Application {
        this.app.route("/api/game-pupil-state/create").post(GamePupilStateController.create);

        return this.app;
    }
}