import { collection, model } from "@plumjs/mongoose";
import { val, domain, authorize } from "@plumjs/plumier";

export type UserRole = "SuperAdmin" | "Admin" | "User" | "RefreshToken"

export interface FacebookUser {
    id: string,
    name: string,
    email: string,
    picture: { data: { url: string } }
}

@domain()
export class AccessToken {
    constructor(
        public userId: string,
        public role: UserRole
    ) { }
}

@domain()
export class RefreshToken  {
    constructor(
        public statusId:string,
        public userId: string,
        public role: "RefreshToken"
    ) { }
}

@collection()
export class TokenStatus {
    constructor(
        public isValid:boolean
    ) { }
}

export const TokenStatusModel = model(TokenStatus)

@collection()
export class User {
    constructor(
        public name: string,
        public image: string,
        @authorize.role("SuperAdmin")
        public email: string,
        @authorize.role("SuperAdmin")
        public role: UserRole,
        @authorize.role("SuperAdmin", "Admin")
        public isDisabled:boolean,
    ) { }
}

export const UserModel = model(User)


