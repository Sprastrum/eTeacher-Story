import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { GameStateController } from "../controllers/gameStateController";
import e from "express";

export class GameStateRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "GameFightRoutes");
    }

    configureRoutes(): e.Application {
        this.app.route("/game-state/:userId").get(GameStateController.getStateFromUserId);

        return this.app;
    }
}