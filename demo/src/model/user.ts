import { collection, model } from "@plumjs/mongoose";
import { authorize, domain, val } from "@plumjs/plumier";

export type UserRole = "User" | "Admin" | "SuperAdmin"

@collection()
export class User {
    constructor(
        public name: string,
        @val.email()
        @val.unique()
        public email: string,
        public password: string,
        @authorize.role("Admin", "SuperAdmin")
        public isActive: boolean,
        @authorize.role("SuperAdmin")
        public role: UserRole
    ) { }
}

export const userProjection = { __v: 0, password: 0 }
export const UserModel = model(User)

@domain()
export class LoginUser {
    constructor(
        public userId: string,
        public role: UserRole
    ) { }
}