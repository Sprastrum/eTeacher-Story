import express from "express";
import { CommonRoutesConfig } from "./common.routes.config";
import { CourseRunController } from "../controllers/courseRunController";


export class CourseRunRouter extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "CourseRunRoutes");
    }

    configureRoutes() {
        this.app.route("/api/course-run/create").post(CourseRunController.create);
        this.app.route("/api/course-run/delete").delete(CourseRunController.delete);

        return this.app;
    }
}