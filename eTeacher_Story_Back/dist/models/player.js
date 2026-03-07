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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const typeorm_1 = require("typeorm");
const class_1 = require("./class");
let Player = class Player {
    constructor() {
        this.id = 1;
        this.grade = 1;
        this.level = 1;
        this.xp = 0;
        this.SkillsId = [];
        this.Max_SC = 20;
        this.SC = 20;
        this.HatsId = [];
        this.AssistantsId = [];
        this.AssistantProgress = 0;
        this.MissionsAccomplished = 0;
        this.Housing = {};
        this.GameState = {
            cooldowns: {},
            turns_left: 10,
            skills_id: [],
            favorite_id: 0,
            layout: [0 * 30],
            XP_gained: 0
        };
        this.currentMission = null;
    }
    GainXP(amount) {
        this.xp += amount;
    }
    ResetGameState() {
        this.GameState = {
            cooldowns: {},
            turns_left: 10,
            skills_id: [],
            favorite_id: 0,
            layout: [0 * 30],
            XP_gained: 0
        };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "xp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        array: true
    }),
    __metadata("design:type", Array)
], Player.prototype, "SkillsId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "Max_SC", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "SC", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        array: true
    }),
    __metadata("design:type", Array)
], Player.prototype, "HatsId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        array: true
    }),
    __metadata("design:type", Array)
], Player.prototype, "AssistantsId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "AssistantProgress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "MissionsAccomplished", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "Rank", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text"
    }),
    __metadata("design:type", Object)
], Player.prototype, "Housing", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text"
    }),
    __metadata("design:type", Object)
], Player.prototype, "GameState", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => class_1.Class, mission => mission.player, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", class_1.Class)
], Player.prototype, "currentMission", void 0);
Player = __decorate([
    (0, typeorm_1.Entity)()
], Player);
exports.Player = Player;
