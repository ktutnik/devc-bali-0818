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
const plumier_1 = require("@plumjs/plumier");
const argon2_1 = require("argon2");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const user_1 = require("../model/user");
class UsersController {
    async login(email, password) {
        const user = await user_1.UserModel.findOne({
            email: { $regex: email, $options: "i" }
        });
        if (!user || !await argon2_1.verify(user.password, password))
            throw new plumier_1.HttpStatusError(403, "Invalid user name or password");
        return {
            token: jsonwebtoken_1.sign({ userId: user._id, role: user.role }, config_1.SECRET)
        };
    }
    async register(data) {
        Object.assign(data, {
            password: await argon2_1.hash(data.password),
            role: "User", isActive: true
        });
        const user = await new user_1.UserModel(data).save();
        return user._id;
    }
    getAll(offset = 0, limit = 20) {
        return user_1.UserModel.find({ isActive: true }, user_1.userProjection)
            .skip(offset)
            .limit(limit);
    }
    getUser(id, loginUser) {
        if (loginUser.role === "User" && id !== loginUser.userId)
            throw new plumier_1.HttpStatusError(401, "Unauthorized");
        return user_1.UserModel.findById(id, user_1.userProjection);
    }
    async modify(id, data, loginUser) {
        if (loginUser.role === "User" && id !== loginUser.userId)
            throw new plumier_1.HttpStatusError(401, "Unauthorized");
        const user = await user_1.UserModel.findById(id);
        if (!user)
            throw new plumier_1.HttpStatusError(404, "User not found");
        Object.assign(user, data);
        await user.save();
        return user._id;
    }
}
__decorate([
    plumier_1.authorize.public(),
    plumier_1.route.post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    plumier_1.authorize.public(),
    plumier_1.route.post(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    plumier_1.authorize.role("Admin", "SuperAdmin"),
    plumier_1.route.get(""),
    __param(0, plumier_1.val.optional()), __param(1, plumier_1.val.optional()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAll", null);
__decorate([
    plumier_1.route.get(":id"),
    __param(1, plumier_1.bind.user()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.LoginUser]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    plumier_1.route.put(":id"),
    __param(2, plumier_1.bind.user()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array,
        user_1.LoginUser]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "modify", null);
exports.UsersController = UsersController;
