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
var MaterialActions_1 = require("../actions/MaterialActions");
var initialState = {
    capture: "",
    startCapture: false,
    materialTextures: {}
};
exports.materialReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case MaterialActions_1.SET_CAPTURE:
            return __assign({}, state, { capture: action.payload });
        case MaterialActions_1.TOGGLE_CAPTURE:
            return __assign({}, state, { startCapture: !state.startCapture });
        case MaterialActions_1.ADD_MATERIAL_TEXTURES:
            return __assign({}, state, { materialTextures: action.payload });
        case MaterialActions_1.REMOVE_MATERIAL_TEXTURES:
            return __assign({}, state, { materialTextures: {} });
        default:
            return state;
    }
};
//# sourceMappingURL=MaterialReducer.js.map