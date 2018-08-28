"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumier_1 = require("@plumjs/plumier");
const jsonwebtoken_1 = require("jsonwebtoken");
const request_promise_1 = tslib_1.__importDefault(require("request-promise"));
const config_1 = require("../config");
const user_1 = require("../model/user");
class AuthController {
    async createTokens(userId, role) {
        const refreshToken = jsonwebtoken_1.sign({ userId, role: "RefreshToken" }, config_1.TOKEN_SECRET, { expiresIn: "30d" });
        const accessToken = jsonwebtoken_1.sign({ userId, role }, config_1.TOKEN_SECRET, { expiresIn: "1h" });
        return { accessToken, refreshToken };
    }
    async facebook(access_token) {
        const json = await request_promise_1.default("https://graph.facebook.com/me", {
            qs: { fields: "id,name,email,picture.type(large)", access_token }
        });
        const fbUser = JSON.parse(json);
        const savedUser = await user_1.UserModel.findOne({ email: { $regex: fbUser.email, $options: "i" } }) ||
            await new user_1.UserModel(new user_1.User(fbUser.name, fbUser.picture.data.url, fbUser.email, "User", false)).save();
        return this.createTokens(savedUser._id, savedUser.role);
    }
    async refresh(token) {
        const user = await user_1.UserModel.findById(token.userId);
        if (!user)
            throw new plumier_1.HttpStatusError(403);
        return this.createTokens(user._id, user.role);
    }
}
tslib_1.__decorate([
    plumier_1.route.ignore(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "createTokens", null);
tslib_1.__decorate([
    plumier_1.authorize.public(),
    plumier_1.route.get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "facebook", null);
tslib_1.__decorate([
    plumier_1.authorize.role("RefreshToken"),
    plumier_1.route.get(),
    tslib_1.__param(0, plumier_1.bind.user()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController;
