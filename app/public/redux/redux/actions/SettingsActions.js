"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_VERSION = "SET_VERSION";
exports.SET_TEXTURE_DISPLAY = "SET_TEXTURE_DISPLAY";
exports.setTextureDisplay = function (type) {
    return {
        type: exports.SET_TEXTURE_DISPLAY,
        payload: type
    };
};
//# sourceMappingURL=SettingsActions.js.map