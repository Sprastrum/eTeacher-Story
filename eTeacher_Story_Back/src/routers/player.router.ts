import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { PlayerController } from "../controllers/playerController";


export class PlayerRouter extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "PlayerRoutes");
	}

	configureRoutes() {
		this.app.route(`/api/player/:playerId`).get(PlayerController.getPlayer);

		return this.app;
	}
}