import { authorize, bind, route, val, HttpStatusError } from "@plumjs/plumier";
import { sign } from "jsonwebtoken";
import request from "request-promise";

import { TOKEN_SECRET } from "../config";
import {
    AccessToken,
    FacebookUser,
    RefreshToken,
    User,
    UserModel,
    UserRole,
    TokenStatusModel,
    TokenStatus,
} from "../model/auth-model";

@route.root("/users/auth")
export class AuthController {

    @route.ignore()
    private async createTokens(userId: any, role: UserRole) {
        const tokenStatus = await new TokenStatusModel(<TokenStatus>{ isValid: true }).save()
        const refreshToken = sign(<RefreshToken>{ userId, role: "RefreshToken", statusId: tokenStatus._id },
            TOKEN_SECRET, { expiresIn: "30d" })
        const accessToken = sign(<AccessToken>{ userId, role },
            TOKEN_SECRET, { expiresIn: "1h" })
        return { accessToken, refreshToken }
    }

    @authorize.public()
    @route.get()
    async facebook(access_token: string) {
        const json = await request("https://graph.facebook.com/me", {
            qs: { fields: "id,name,email,picture.type(large)", access_token }
        })
        const fbUser: FacebookUser = JSON.parse(json)
        const savedUser = await UserModel.findOne({ email: { $regex: fbUser.email, $options: "i" } }) ||
            await new UserModel(new User(fbUser.name, fbUser.picture.data.url, fbUser.email, "User", false)).save()
        return this.createTokens(savedUser._id, savedUser.role)
    }

    @authorize.role("RefreshToken")
    @route.get()
    async refresh(@bind.user() token: RefreshToken) {
        const user = await UserModel.findById(token.userId)
        if (!user) throw new HttpStatusError(403)
        await TokenStatusModel.findByIdAndUpdate(token.statusId, { $set: { isValid: false } })
        return this.createTokens(user._id, user.role)
    }
}



