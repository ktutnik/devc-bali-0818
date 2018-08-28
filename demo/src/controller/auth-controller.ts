import { authorize, bind, HttpStatusError, route } from "@plumjs/plumier";
import { sign } from "jsonwebtoken";
import request from "request-promise";

import { TOKEN_SECRET } from "../config";
import { User, UserModel, UserRole } from "../model/user";

export class AuthController {

    @route.ignore()
    private async createTokens(userId: any, role: UserRole) {
        const refreshToken = sign({ userId, role: "RefreshToken" },
            TOKEN_SECRET, { expiresIn: "30d" })
        const accessToken = sign({ userId, role },
            TOKEN_SECRET, { expiresIn: "1h" })
        return { accessToken, refreshToken }
    }

    @authorize.public()
    @route.get()
    async facebook(access_token: string) {
        const json = await request("https://graph.facebook.com/me", {
            qs: { fields: "id,name,email,picture.type(large)", access_token }
        })
        const fbUser = JSON.parse(json)
        const savedUser = await UserModel.findOne({ email: { $regex: fbUser.email, $options: "i" } }) ||
            await new UserModel(new User(fbUser.name, fbUser.picture.data.url, fbUser.email, "User", false)).save()
        return this.createTokens(savedUser._id, savedUser.role)
    }

    @authorize.role("RefreshToken")
    @route.get()
    async refresh(@bind.user() token: any) {
        const user = await UserModel.findById(token.userId)
        if (!user) throw new HttpStatusError(403)
        return this.createTokens(user._id, user.role)
    }
}



