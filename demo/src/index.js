"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("@plumjs/mongoose");
const plumier_1 = __importStar(require("@plumjs/plumier"));
const config_1 = require("./config");
new plumier_1.default()
    .set(new plumier_1.RestfulApiFacility())
    .set(new mongoose_1.MongooseFacility({ uri: "mongodb://localhost:27017/user-demo" }))
    .set(new plumier_1.JwtAuthFacility({ secret: config_1.SECRET }))
    .initialize()
    .then(koa => koa.listen(8000))
    .catch(err => console.error(err));
