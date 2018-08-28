import { collection, model } from "@plumjs/mongoose";

export type UserRole = "SuperAdmin" | "Admin" | "User" | "RefreshToken"

@collection()
export class User {
    constructor(
        public name: string,
        public image: string,
        public email: string,
        public role: UserRole,
        public isDisabled:boolean,
    ) { }
}

export const UserModel = model(User)


