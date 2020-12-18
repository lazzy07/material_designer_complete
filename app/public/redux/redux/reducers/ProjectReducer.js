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
var ProjectActions_1 = require("../actions/ProjectActions");
var ProjectActions_2 = require("./../actions/ProjectActions");
var CreateNewMaterialGraph_1 = require("../../services/new_material_graph/CreateNewMaterialGraph");
var initialState = {
    user: "",
    activeGraph: "",
    graphs: [],
    textureList: [],
    config: {
        projectName: "",
        projectPath: "",
        settings: {},
        geometry: { type: "cube", subdivision: 0, path: "", wireframe: false },
        envMap: { tex: "autumn_ground_4k.matenv", exposure: 1, rotation: 0 },
        noWindowMaximized: false
    }
};
exports.projectReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ProjectActions_1.ADD_PROJECT_DATA:
            return __assign({}, action.payload);
        case ProjectActions_1.ADD_TEXTURE_DATA:
            return __assign({}, state, { textureList: state.textureList.concat([action.payload]) });
        case ProjectActions_1.REMOVE_TEXTURE_DATA:
            var textureList = [];
            for (var i = 0; i < state.textureList.length; i++) {
                if (state.textureList[i].uuid !== action.payload) {
                    textureList.push(state.textureList[i]);
                }
            }
            return __assign({}, state, { textureList: textureList });
        case ProjectActions_2.CHANGE_ENVMAP:
            return __assign({}, state, { config: __assign({}, state.config, { envMap: __assign({}, state.config.envMap, { tex: action.payload }) }) });
        case ProjectActions_1.CHANGE_ENVMAP_EXPOSURE:
            return __assign({}, state, { config: __assign({}, state.config, { envMap: __assign({}, state.config.envMap, { exposure: action.payload }) }) });
        case ProjectActions_1.CHANGE_ENVMAP_ROTATION:
            return __assign({}, state, { config: __assign({}, state.config, { envMap: __assign({}, state.config.envMap, { rotation: action.payload }) }) });
        case ProjectActions_1.CHANGE_GEOMETRY:
            return __assign({}, state, { config: __assign({}, state.config, { geometry: __assign({}, state.config.geometry, { type: action.payload }) }) });
        case ProjectActions_1.CHANGE_SUBDIVISIONS:
            return __assign({}, state, { config: __assign({}, state.config, { geometry: __assign({}, state.config.geometry, { subdivision: action.payload }) }) });
        case ProjectActions_1.CHANGE_GEOMETRY_PATH:
            return __assign({}, state, { config: __assign({}, state.config, { geometry: __assign({}, state.config.geometry, { path: action.payload }) }) });
        case ProjectActions_1.CHANGE_WIREFRAME:
            return __assign({}, state, { config: __assign({}, state.config, { geometry: __assign({}, state.config.geometry, { wireframe: !state.config.geometry.wireframe }) }) });
        case ProjectActions_1.ADD_NEW_GRAPH:
            return __assign({}, state, { graphs: state.graphs.concat([CreateNewMaterialGraph_1.createNewMaterialGraph()]) });
        case ProjectActions_1.REMOVE_GRAPH:
            var graphs = [];
            for (var i = 0; i < state.graphs.length; i++) {
                if (state.graphs[i].uuid !== action.payload) {
                    graphs.push(state.graphs[i]);
                }
            }
            return __assign({}, state, { graphs: graphs });
        case ProjectActions_1.CHANGE_ACTIVE_GRAPH:
            return __assign({}, state, { activeGraph: action.payload });
        default:
            return state;
    }
};
//# sourceMappingURL=ProjectReducer.js.map