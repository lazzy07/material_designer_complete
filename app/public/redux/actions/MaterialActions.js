"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_CAPTURE = "SET_CAPTURE";
exports.TOGGLE_CAPTURE = "TOGGLE_CAPTURE";
exports.ADD_MATERIAL_TEXTURES = "ADD_MATERIAL_TEXTURES";
exports.REMOVE_MATERIAL_TEXTURES = "REMOVE_MATERIAL_TEXTURES";
exports.setCapture = function (capture) {
    return { type: exports.SET_CAPTURE, payload: capture };
};
exports.toggleCapture = function () {
    return { type: exports.TOGGLE_CAPTURE };
};
exports.addMaterialTextures = function (textures) {
    return { type: exports.ADD_MATERIAL_TEXTURES, payload: textures };
};
exports.removeMaterialTextures = function () {
    return { type: exports.REMOVE_MATERIAL_TEXTURES };
};
//# sourceMappingURL=MaterialActions.js.map