"use strict";
const user_1 = require("../models/user");
const player_1 = require("../models/player");
const userService_1 = require("../services/userService");
const pug = require("pug");
class AuthController {
    //GET
    async GetRegisterVanilla(req, res) {
        let registerView = pug.compileFile("./src/views/register.pug");
        res.status(200).send(registerView());
    }
    //POST
    async PostRegisterVanilla(req, res) {
        let view = pug.compileFile("./src/views/template.pug");
        let body = req.body;
        let foundUser = undefined; //await findUser("username", body.username)
        if (foundUser != undefined) {
            res.status(200).send("Username already exists");
        }
        else {
            let user = new user_1.User();
            user.username = body.username;
            user.password = body.password;
            user.player = new player_1.Player();
            res.status(200).send(view({
                name: user.username,
                password: user.password
            }));
        }
    }
    //GET
    async GetLoginVanilla(req, res) {
        res.status(200).send(pug.compileFile("./src/views/login.pug"));
    }
    //POST
    async PostLoginVanilla(req, res) {
        let body = req.body;
        let foundUser = await (0, userService_1.login)(body.username, body.password);
        if (foundUser != undefined) {
            res.status(200).send("Connection successful");
        }
        else {
            res.status(200).send("Username or password incorrect");
        }
    }
}
module.exports = new AuthController();
