import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

import { CommonRoutesConfig } from "./routers/common.routes.config";
import { DevRouter } from "./routers/dev.router";
import { PlayerRouter } from "./routers/player.router";
import { CourseRunRouter } from "./routers/courseRun.router";
import { GameSessionRouter } from "./routers/gameSession.router";
import { CourseRouter } from "./routers/course.router";


dotenv.config({
	path: ".env"
});



const app: express.Application = express();
const PORT = process.env.PORT || "3000";
const routes: Array<CommonRoutesConfig> = [];


app.use(cors({
	origin: [
		'http://localhost:5173',
		'http://localhost:3000',
		'http://localhost:63342',
	],
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	next();
})

app.get("/health", (req: express.Request, res: express.Response) => {
	res.status(200).json({
		status: "OK",
		timestamp: new Date().toISOString(),
		uptime: process.uptime()
	});
});

app.get("/", (req: express.Request, res: express.Response) => {
	res.status(200).send("Server up and running");
});

routes.push(new DevRouter(app));
routes.push(new PlayerRouter(app));
routes.push(new CourseRunRouter(app));
routes.push(new GameSessionRouter(app));
routes.push(new CourseRouter(app));

app.use((req, res) => {
	res.status(404).json({
		error: 'Route not found',
		path: req.path
	});
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error('Error:', err);

	res.status(err.status || 500).json({
		error: err.message || 'Error inter of server',
		...(process.env.NODE_ENV === 'development' && { stack: err.stack })
	});
});

AppDataSource.initialize()
	.then(() => {
		console.log("✅ Database connected");

		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);

			console.log(`API available at http://localhost:${PORT}/api`);

			console.log("Configured routes:");

			routes.forEach((route: CommonRoutesConfig) => {
				console.log(`   - ${route.getName()}`);
			});
		});
	})
	.catch((err) => {
		console.error("Error connecting to database:", err);
		process.exit(1);
	});

export default app;