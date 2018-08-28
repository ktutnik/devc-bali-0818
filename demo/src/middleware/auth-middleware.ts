import { Middleware, ActionResult, Invocation, HttpStatusError } from "@plumjs/core";
import { RefreshToken, AccessToken, UserModel, TokenStatusModel } from "../model/auth-model";


export class AuthMiddleware implements Middleware {
    async execute(invocation: Readonly<Invocation>): Promise<ActionResult> {
        const token: RefreshToken | AccessToken | undefined = invocation.context.state.user
        if (token instanceof RefreshToken) {
            const tokenStatus = await TokenStatusModel.findOne({ _id: token.statusId, isValid: true })
            if (!tokenStatus) throw new HttpStatusError(403)
        }
        return invocation.proceed()
    }
}