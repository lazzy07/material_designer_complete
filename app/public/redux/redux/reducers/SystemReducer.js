"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var SystemActions_1 = require("../actions/SystemActions");
var initialState = {
    toBeUploaded: [],
    envMapsSystem: [],
    environmentMap: ""
};
exports.systemReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SystemActions_1.SET_TOUPLOAD:
            return __assign({}, state, { toBeUploaded: action.payload });
        case SystemActions_1.REMOVE_TOUPLOAD:
            var toUpload = state.toBeUploaded;
            var newToUpload_1 = [];
            toUpload.forEach(function (ele) {
                if (action.payload !== ele) {
                    newToUpload_1.push(ele);
                }
            });
            return __assign({}, state, { toBeUploaded: newToUpload_1 });
        case SystemActions_1.REMOVE_ALL_TOUPLOAD:
            return __assign({}, state, { toBeUploaded: [] });
        case SystemActions_1.SET_ENVMAPS_SYSTEM:
            return __assign({}, state, { envMapsSystem: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=SystemReducer.js.map