"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.findUser = void 0;
const user_1 = require("../models/user");
const typeorm_1 = require("typeorm");
function findUser(attr, content) {
    return (0, typeorm_1.getRepository)(user_1.User).findOne({ where: { attr: content } });
}
exports.findUser = findUser;
function login(username, password) {
    return (0, typeorm_1.getRepository)(user_1.User).findOne({ where: { "username": username, "password": password } });
}
exports.login = login;
