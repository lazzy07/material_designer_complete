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
var SettingsActions_1 = require("../actions/SettingsActions");
var initState = {
    version: "0.0.0",
    textureDisplay: "thumbSmall"
};
exports.settingsReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case SettingsActions_1.SET_VERSION:
            return __assign({}, state, { version: action.payload });
        case SettingsActions_1.SET_TEXTURE_DISPLAY:
            return __assign({}, state, { textureDisplay: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=SettingsReducer.js.map