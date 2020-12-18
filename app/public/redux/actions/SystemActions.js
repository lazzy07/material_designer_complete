"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_TOUPLOAD = "SET_TOUPLOAD";
exports.REMOVE_TOUPLOAD = "REMOVE_TOUPLOAD";
exports.REMOVE_ALL_TOUPLOAD = "REMOVE_ALL_TOUPLOAD";
exports.SET_ENVMAPS_SYSTEM = "SET_ENVMAPS_SYSTEM";
exports.SET_SELECTED_NODE = "SET_SELECTED_NODE";
exports.SET_IMAGE_VIEWER_NODE = "SET_IMAGE_VIEWER_NODE";
exports.SET_IMAGE_VIEWER = "SET_IMAGE_VIEWER";
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
exports.setSelectedNode = function (selected) {
    if (selected === void 0) { selected = {}; }
    return {
        type: exports.SET_SELECTED_NODE,
        payload: selected
    };
};
exports.setImageViewerNode = function (id) {
    return {
        type: exports.SET_IMAGE_VIEWER_NODE,
        payload: id
    };
};
exports.setImageViewer = function (image) {
    return {
        type: exports.SET_IMAGE_VIEWER,
        payload: image
    };
};
//# sourceMappingURL=SystemActions.js.map