"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@plumjs/core");
const auth_model_1 = require("../model/auth-model");
class AuthMiddleware {
    async execute(invocation) {
        const token = invocation.context.state.user;
        if (token instanceof auth_model_1.RefreshToken) {
            const tokenStatus = await auth_model_1.TokenStatusModel.findOne({ _id: token.statusId, isValid: true });
            if (!tokenStatus)
                throw new core_1.HttpStatusError(403);
        }
        return invocation.proceed();
    }
}
exports.AuthMiddleware = AuthMiddleware;
