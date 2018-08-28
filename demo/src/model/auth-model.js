"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("@plumjs/mongoose");
const plumier_1 = require("@plumjs/plumier");
let AccessToken = class AccessToken {
    constructor(userId, role) {
        this.userId = userId;
        this.role = role;
    }
};
AccessToken = tslib_1.__decorate([
    plumier_1.domain(),
    tslib_1.__metadata("design:paramtypes", [String, String])
], AccessToken);
exports.AccessToken = AccessToken;
let RefreshToken = class RefreshToken {
    constructor(statusId, userId, role) {
        this.statusId = statusId;
        this.userId = userId;
        this.role = role;
    }
};
RefreshToken = tslib_1.__decorate([
    plumier_1.domain(),
    tslib_1.__metadata("design:paramtypes", [String, String, String])
], RefreshToken);
exports.RefreshToken = RefreshToken;
let TokenStatus = class TokenStatus {
    constructor(isValid) {
        this.isValid = isValid;
    }
};
TokenStatus = tslib_1.__decorate([
    mongoose_1.collection(),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], TokenStatus);
exports.TokenStatus = TokenStatus;
exports.TokenStatusModel = mongoose_1.model(TokenStatus);
let User = class User {
    constructor(name, image, email, role, isDisabled) {
        this.name = name;
        this.image = image;
        this.email = email;
        this.role = role;
        this.isDisabled = isDisabled;
    }
};
User = tslib_1.__decorate([
    mongoose_1.collection(),
    tslib_1.__param(2, plumier_1.authorize.role("SuperAdmin")),
    tslib_1.__param(3, plumier_1.authorize.role("SuperAdmin")),
    tslib_1.__param(4, plumier_1.authorize.role("SuperAdmin", "Admin")),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Boolean])
], User);
exports.User = User;
exports.UserModel = mongoose_1.model(User);
