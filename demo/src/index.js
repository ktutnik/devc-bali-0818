"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("@plumjs/mongoose");
const plumier_1 = tslib_1.__importStar(require("@plumjs/plumier"));
const config_1 = require("./config");
new plumier_1.default()
    .set(new plumier_1.RestfulApiFacility())
    .set(new mongoose_1.MongooseFacility({
    uri: "mongodb://localhost:27017/refresh-token-test"
}))
    .set(new plumier_1.JwtAuthFacility({
    secret: config_1.TOKEN_SECRET,
    global: plumier_1.authorize.role("User", "Admin", "SuperAdmin")
}))
    .initialize()
    .then(x => x.listen(8000))
    .catch(e => console.error(e));
