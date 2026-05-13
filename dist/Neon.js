"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// eslint-disable-next-line
// @ts-ignore
const neon_js_1 = __importDefault(require("neon-js"));
const decode = (path) => neon_js_1.default.decode((0, fs_1.readFileSync)(path).toString()).toObject(true);
const replaceParam = (param, needle, replace) => param.replace(needle, replace);
const replaceWwwDir = (param, wwwDir) => replaceParam(param, '%wwwDir%', wwwDir);
exports.default = { decode, replaceParam, replaceWwwDir };
//# sourceMappingURL=Neon.js.map