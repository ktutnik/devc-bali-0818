import { MongooseFacility } from "@plumjs/mongoose";
import Plumier, { JwtAuthFacility, RestfulApiFacility } from "@plumjs/plumier";

import { SECRET } from "./config";


new Plumier()
    .set(new RestfulApiFacility())
    .set(new MongooseFacility({uri: "mongodb://localhost:27017/user-demo"}))
    .set(new JwtAuthFacility({secret: SECRET}))
    .initialize()
    .then(koa => koa.listen(8000))
    .catch(err => console.error(err))