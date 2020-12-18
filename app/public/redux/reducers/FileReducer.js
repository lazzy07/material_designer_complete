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
var FileActions_1 = require("../actions/FileActions");
var initState = {
    filePath: "",
    recentLocal: [],
    recentCloud: [],
    resourcesPath: "./resources"
};
exports.fileReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case FileActions_1.CHANGE_OPENED_FILE:
            return __assign({}, state, { filePath: action.payload });
        case FileActions_1.NEW_LOCAL_PROJECT:
            var localFiles = state.recentLocal.slice();
            if (localFiles.length > 9) {
                localFiles = localFiles.slice(0, 9);
            }
            localFiles.push(action.payload);
            return __assign({}, state, { filePath: action.payload.path, recentLocal: localFiles.slice() });
        case FileActions_1.OPEN_PROJECT_FILE:
            for (var i = 0; i < state.recentLocal.length; i++) {
                if (state.recentLocal[i].path === action.payload.path) {
                    return state;
                }
            }
            var lFiles = state.recentLocal.slice();
            if (lFiles.length > 9) {
                localFiles = lFiles.slice(0, 9);
            }
            lFiles.push(action.payload);
            return __assign({}, state, { filePath: action.payload.path, recentLocal: lFiles.slice() });
        case FileActions_1.SET_RESOURCES_PATH:
            return __assign({}, state, { resourcesPath: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=FileReducer.js.map