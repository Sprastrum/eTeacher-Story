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
var Pupil_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pupil = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../services/utils");
const class_1 = require("./class");
let Pupil = Pupil_1 = class Pupil {
    constructor(init) {
        this.id = 1;
        this.name = "pupil";
        this.appearance = [1, 1, 1, 1, 1];
        this.mark = 10;
        this.traitId = 1;
        this.skillId = 1;
        this.isFavorite = false;
        this.hp = 0;
        this.shields = 0;
        this.state = "";
        this.debuff = [];
        this.buff = [];
        this.desk = 0;
        this.group = new class_1.Class();
        Object.assign(this, init);
    }
    static Create(json) {
        let data = JSON.parse(json);
        let pupil = Object.create(Pupil_1.prototype);
        return Object.assign(pupil, data);
    }
    TakeDamage(damage, target) {
        switch (target) {
            case "true":
                this.hp -= damage;
            case "shield":
                this.shields -= damage;
            case "normal":
                if (this.shields < 0)
                    this.shields = 0;
                this.shields -= damage;
                this.hp -= this.shields <= 0 ? this.shields : 0;
            default:
        }
    }
    LoseDebuff(id) {
        if (id == null) {
            this.debuff.splice(this.debuff[(0, utils_1.Random)(0, this.debuff.length)], 1);
        }
        else {
            this.debuff.splice(id, 1);
        }
    }
    CheckNewDefeat() {
        return (this.hp <= 0 && this.state != "beaten");
    }
    Defeat() {
        if (this.hp <= 0 && this.state != "beaten") {
            this.state = "beaten";
            if (this.desk <= 10) {
                this.mark += 2;
            }
            else if (this.desk <= 20) {
                this.mark += 1;
            }
            if (this.mark > 20) {
                this.mark = 20;
            }
            if (this.isFavorite) {
                this.isFavorite = false;
            }
        }
        else {
            throw new Error("Pupil already beaten !");
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Number)
], Pupil.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pupil.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        array: true
    }),
    __metadata("design:type", Array)
], Pupil.prototype, "appearance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pupil.prototype, "mark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pupil.prototype, "traitId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pupil.prototype, "skillId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Pupil.prototype, "isFavorite", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pupil.prototype, "hp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pupil.prototype, "shields", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pupil.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        array: true
    }),
    __metadata("design:type", Array)
], Pupil.prototype, "debuff", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        array: true
    }),
    __metadata("design:type", Array)
], Pupil.prototype, "buff", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pupil.prototype, "desk", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => class_1.Class, group => group.pupils, {
        cascade: ["insert", "update"]
    }),
    __metadata("design:type", class_1.Class)
], Pupil.prototype, "group", void 0);
Pupil = Pupil_1 = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Pupil);
exports.Pupil = Pupil;
