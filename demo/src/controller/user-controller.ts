import { authorize, bind, HttpStatusError, route, val } from "@plumjs/plumier";
import { hash, verify } from "argon2";
import { sign } from "jsonwebtoken";

import { SECRET } from "../config";
import { LoginUser, User, UserModel, userProjection } from "../model/user";


export class UsersController {

    @authorize.public()
    @route.post()
    async login(email: string, password: string) {
        const user = await UserModel.findOne({
            email: { $regex: email, $options: "i" }
        })
        if (!user || !await verify(user.password, password))
            throw new HttpStatusError(403, "Invalid user name or password")
        return {
            token: sign(<LoginUser>{ userId: user._id, role: user.role }, SECRET)
        }
    }

    @authorize.public()
    @route.post("")
    async register(data: User) {
        Object.assign(data, {
            password: await hash(data.password),
            role: "User", isActive: true
        })
        const user = await new UserModel(data).save()
        return user._id
    }

    @authorize.role("Admin", "SuperAdmin")
    @route.get("")
    getAll(@val.optional() offset = 0, @val.optional() limit = 20) {
        return UserModel.find({ isActive: true }, userProjection)
            .skip(offset)
            .limit(limit)
    }

    @route.get(":id")
    getUser(id: string, @bind.user() loginUser: LoginUser) {
        if (loginUser.role === "User" && id !== loginUser.userId)
            throw new HttpStatusError(401, "Unauthorized")
        return UserModel.findById(id, userProjection)
    }

    @route.put(":id")
    async modify(id: string, data: Array<User>,
        @bind.user() loginUser: LoginUser) {
        if (loginUser.role === "User" && id !== loginUser.userId)
            throw new HttpStatusError(401, "Unauthorized")
        const user = await UserModel.findById(id);
        if (!user)
            throw new HttpStatusError(404, "User not found");
        Object.assign(user, data)
        await user.save()
        return user._id
    }

}