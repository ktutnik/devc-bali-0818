"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("@plumjs/mongoose");
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
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Boolean])
], User);
exports.User = User;
exports.UserModel = mongoose_1.model(User);
