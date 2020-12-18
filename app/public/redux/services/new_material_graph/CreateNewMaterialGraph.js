"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = __importDefault(require("uuid/v4"));
exports.createNewMaterialGraph = function (user) {
    if (user === void 0) { user = ""; }
    return {
        user: user,
        uuid: v4_1.default(),
        title: "new graph",
        type: "default",
        share: false,
        web: false,
        data: []
    };
};
//# sourceMappingURL=CreateNewMaterialGraph.js.map