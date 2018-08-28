import { val, authorize, route, bind, HttpStatusError } from '@plumjs/plumier';
import { UserModel } from '../model/user';


export class UsersController {
    @route.get("")
    @authorize.role("Admin", "SuperAdmin")
    list(@val.optional() offset = 0, @val.optional() limit = 20) {
        return UserModel.find({})
            .skip(offset)
            .limit(limit)
    }

    @route.get("me")
    get(@bind.user() token:any){
        return UserModel.findById(token.userId)
    }
}