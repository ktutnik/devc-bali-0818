import { MongooseFacility } from "@plumjs/mongoose";
import Plumier, { authorize, JwtAuthFacility, RestfulApiFacility } from "@plumjs/plumier";

import { TOKEN_SECRET } from "./config";

new Plumier()
    .set(new RestfulApiFacility())
    .set(new MongooseFacility({
        uri: "mongodb://localhost:27017/refresh-token-test"
    }))
    .set(new JwtAuthFacility({
        secret: TOKEN_SECRET,
        //set global authorization agar RefreshToken tidak bisa digunakan
        //untuk mengakses private resource
        global: authorize.role("User", "Admin", "SuperAdmin")
    }))
    .initialize()
    .then(x => x.listen(8000))
    .catch(e => console.error(e))
