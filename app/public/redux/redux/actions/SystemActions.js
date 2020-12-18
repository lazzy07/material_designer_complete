"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_TOUPLOAD = "SET_TOUPLOAD";
exports.REMOVE_TOUPLOAD = "REMOVE_TOUPLOAD";
exports.REMOVE_ALL_TOUPLOAD = "REMOVE_ALL_TOUPLOAD";
exports.SET_ENVMAPS_SYSTEM = "SET_ENVMAPS_SYSTEM";
exports.setToUpload = function (files) {
    return {
        type: exports.SET_TOUPLOAD,
        payload: files
    };
};
exports.removeToUpload = function (filePath) {
    return {
        type: exports.REMOVE_TOUPLOAD,
        payload: filePath
    };
};
exports.removeAllToUpload = function () {
    return {
        type: exports.REMOVE_ALL_TOUPLOAD
    };
};
exports.setEnvMapsSystem = function (files) {
    return {
        type: exports.SET_ENVMAPS_SYSTEM,
        payload: files
    };
};
//# sourceMappingURL=SystemActions.js.map