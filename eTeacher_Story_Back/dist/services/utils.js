"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
function Random(min = 0, max) {
    return Math.floor((Math.random() * max) + min);
}
exports.Random = Random;
