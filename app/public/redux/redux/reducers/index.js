"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var FileReducer_1 = require("./FileReducer");
var SettingsReducer_1 = require("./SettingsReducer");
var ProjectReducer_1 = require("./ProjectReducer");
var SystemReducer_1 = require("./SystemReducer");
exports.rootReducer = redux_1.combineReducers({
    file: FileReducer_1.fileReducer,
    settings: SettingsReducer_1.settingsReducer,
    project: ProjectReducer_1.projectReducer,
    system: SystemReducer_1.systemReducer
});
//# sourceMappingURL=index.js.map