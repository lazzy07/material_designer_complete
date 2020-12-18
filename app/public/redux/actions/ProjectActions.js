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
var CreateNewMaterialGraph_1 = require("../new_material_graph/CreateNewMaterialGraph");
exports.ADD_PROJECT_DATA = "ADD_PROJECT_DATA";
exports.ADD_TEXTURE_DATA = "ADD_TEXTURE_DATA";
exports.REMOVE_TEXTURE_DATA = "REMOVE_TEXTURE_DATA";
exports.CHANGE_ENVMAP = "CHANGE_ENVMAP";
exports.CHANGE_ENVMAP_EXPOSURE = "CHANGE_ENVMAP_EXPOSURE";
exports.CHANGE_GEOMETRY = "CHANGE_GEOMETRY";
exports.CHANGE_SUBDIVISIONS = "CHANGE_SUBDIVISIONS";
exports.CHANGE_ENVMAP_ROTATION = "CHANGE_ENVMAP_ROTATION";
exports.CHANGE_GEOMETRY_PATH = "CHANGE_GEOMETRY_PATH";
exports.CHANGE_WIREFRAME = "CHANGE_WIREFRAME";
exports.ADD_NEW_GRAPH = "ADD_NEW_GRAPH";
exports.REMOVE_GRAPH = "REMOVE_GRAPH";
exports.CHANGE_ACTIVE_GRAPH = "CHANGE_ACTIVE_GRAPH";
exports.SET_ACTIVE_GRAPH_TITLE = "SET_ACTIVE_GRAPH_TITLE";
exports.EDIT_ACTIVE_GRAPH = "EDIT_ACTIVE_GRAPH";
exports.SET_GLOBAL_RESOLUTION = "SET_GLOBAL_RESOLUTION";
exports.addProjectData = function (data) {
    return {
        type: exports.ADD_PROJECT_DATA,
        payload: data
    };
};
exports.addTextureData = function (texture) {
    return {
        type: exports.ADD_TEXTURE_DATA,
        payload: texture
    };
};
exports.changeEnvmap = function (envmap) {
    return {
        type: exports.CHANGE_ENVMAP,
        payload: envmap
    };
};
exports.changeEnvmapExposure = function (exposure) {
    return {
        type: exports.CHANGE_ENVMAP_EXPOSURE,
        payload: exposure
    };
};
exports.changeGeometry = function (type) {
    return {
        type: exports.CHANGE_GEOMETRY,
        payload: type
    };
};
exports.changeSubdivisions = function (subdivs) {
    return {
        type: exports.CHANGE_SUBDIVISIONS,
        payload: subdivs
    };
};
exports.changeEnvmapRotation = function (rotation) {
    return {
        type: exports.CHANGE_ENVMAP_ROTATION,
        payload: rotation
    };
};
exports.changeGeometryPath = function (path) {
    return {
        type: exports.CHANGE_GEOMETRY_PATH,
        payload: path
    };
};
exports.changeWireframe = function () {
    return {
        type: exports.CHANGE_WIREFRAME
    };
};
exports.removeTextureProject = function (uuid) {
    return {
        type: exports.REMOVE_TEXTURE_DATA,
        payload: uuid
    };
};
exports.addNewGraph = function () {
    return {
        type: exports.ADD_NEW_GRAPH,
        payload: __assign({}, CreateNewMaterialGraph_1.createNewMaterialGraph())
    };
};
exports.removeGraph = function (uuid) {
    return {
        type: exports.REMOVE_GRAPH,
        payload: uuid
    };
};
exports.changeActiveGraph = function (uuid) {
    return {
        type: exports.CHANGE_ACTIVE_GRAPH,
        payload: uuid
    };
};
exports.setActiveGraphTitle = function (key, value) {
    return {
        type: exports.SET_ACTIVE_GRAPH_TITLE,
        payload: { key: key, value: value }
    };
};
exports.editActiveGraph = function (graphId, data) {
    return {
        type: exports.EDIT_ACTIVE_GRAPH,
        payload: {
            graphId: graphId,
            data: data
        }
    };
};
exports.setGlobalResolution = function (resolution) {
    return {
        type: exports.SET_GLOBAL_RESOLUTION,
        payload: resolution
    };
};
//# sourceMappingURL=ProjectActions.js.map