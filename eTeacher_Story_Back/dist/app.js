"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const devRouter_1 = require("./routers/devRouter");
const authRouter_1 = require("./routers/authRouter");
const gameRouter_1 = require("./routers/gameRouter");
dotenv_1.default.config({
    path: ".env"
});
const app = (0, express_1.default)();
const server = http.createServer(app);
const port = 13001;
const routes = [];
const bodyParser = require('body-parser');
(0, typeorm_1.createConnection)();
// class Server {
// 	public app = express();
// 	public router = MasterRouter;
// }
// const server = new Server();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
//Middleware pour permettre les requêtes cross-origins
//app.use(cors());
//Middleware qui log les requêtes HTTP
// app.use(expressWinston.logger({
//     transports: [
//         new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json()
//     )
// }));
routes.push(new devRouter_1.DevRouter(app));
routes.push(new authRouter_1.AuthRouter(app));
routes.push(new gameRouter_1.GameRouter(app));
app.get("/", (req, res) => {
    res.status(200).send("Server up and running");
});
server.listen(port, () => {
    routes.forEach((route) => {
        console.log(`Routes configurées pour ${route.getName()}`);
    });
    console.log("Serveur paré à l'action");
});
