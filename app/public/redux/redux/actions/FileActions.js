"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANGE_OPENED_FILE = "CHANGE_OPENED_FILE";
exports.NEW_LOCAL_PROJECT = "NEW_LOCAL_PROJECT";
exports.OPEN_PROJECT_FILE = "OPEN_PROJECT_FILE";
exports.SET_RESOURCES_PATH = "SET_RESOURCES_PATH";
exports.newLocalProject = function (filePath) {
    var path;
    if (window) {
        path = window.require("path");
    }
    else {
        path = require("path");
    }
    if (filePath) {
        var name_1 = path.basename(filePath);
        var file = {
            path: filePath,
            name: name_1
        };
        return {
            type: exports.NEW_LOCAL_PROJECT,
            payload: file
        };
    }
};
exports.openProjectFile = function (filePath) {
    var path;
    if (window) {
        path = window.require("path");
    }
    else {
        path = require("path");
    }
    if (filePath) {
        var name_2 = path.basename(filePath);
        var file = {
            path: filePath,
            name: name_2
        };
        return {
            type: exports.OPEN_PROJECT_FILE,
            payload: file
        };
    }
};
//# sourceMappingURL=FileActions.js.map