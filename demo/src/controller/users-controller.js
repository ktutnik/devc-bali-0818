"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumier_1 = require("@plumjs/plumier");
const user_1 = require("../model/user");
class UsersController {
    list(offset = 0, limit = 20) {
        return user_1.UserModel.find({})
            .skip(offset)
            .limit(limit);
    }
    get(token) {
        return user_1.UserModel.findById(token.userId);
    }
}
tslib_1.__decorate([
    plumier_1.route.get(""),
    plumier_1.authorize.role("Admin", "SuperAdmin"),
    tslib_1.__param(0, plumier_1.val.optional()), tslib_1.__param(1, plumier_1.val.optional()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "list", null);
tslib_1.__decorate([
    plumier_1.route.get("me"),
    tslib_1.__param(0, plumier_1.bind.user()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "get", null);
exports.UsersController = UsersController;
