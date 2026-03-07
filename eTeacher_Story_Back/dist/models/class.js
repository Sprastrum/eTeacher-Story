"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Class_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const pupil_1 = require("./pupil");
const typeorm_1 = require("typeorm");
const player_1 = require("./player");
let Class = Class_1 = class Class {
    constructor(init) {
        this.id = 1;
        this.grade = "6A";
        this.subject = "Native";
        this.difficulty = 1;
        this.deadline = 1;
        this.goal_mark = 20;
        this.goal_number = -1;
        this.reward = 0;
        this.player = null;
        Object.assign(this, init);
    }
    static Create(json) {
        let data = JSON.parse(json);
        let group = Object.create(Class_1.prototype);
        return Object.assign(group, data);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Number)
], Class.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Class.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Class.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Class.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Class.prototype, "goal_mark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Class.prototype, "goal_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Class.prototype, "reward", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => pupil_1.Pupil, pupil => pupil.group, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Class.prototype, "pupils", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => player_1.Player, player => player.currentMission, {
        cascade: ["update"]
    }),
    __metadata("design:type", player_1.Player)
], Class.prototype, "player", void 0);
Class = Class_1 = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Class);
exports.Class = Class;
