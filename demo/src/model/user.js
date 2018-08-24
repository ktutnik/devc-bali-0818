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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("@plumjs/mongoose");
const plumier_1 = require("@plumjs/plumier");
let User = class User {
    constructor(name, email, password, isActive, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.role = role;
    }
};
User = __decorate([
    mongoose_1.collection(),
    __param(1, plumier_1.val.email()),
    __param(1, plumier_1.val.unique()),
    __param(3, plumier_1.authorize.role("Admin", "SuperAdmin")),
    __param(4, plumier_1.authorize.role("SuperAdmin")),
    __metadata("design:paramtypes", [String, String, String, Boolean, String])
], User);
exports.User = User;
exports.userProjection = { __v: 0, password: 0 };
exports.UserModel = mongoose_1.model(User);
let LoginUser = class LoginUser {
    constructor(userId, role) {
        this.userId = userId;
        this.role = role;
    }
};
LoginUser = __decorate([
    plumier_1.domain(),
    __metadata("design:paramtypes", [String, String])
], LoginUser);
exports.LoginUser = LoginUser;
