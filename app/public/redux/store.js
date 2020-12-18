"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducers_1 = require("./reducers");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var electron_redux_1 = require("electron-redux");
var initialState = {};
/* tslint:disable */
exports.rendererStore = function () {
    var initialState = electron_redux_1.getInitialStateRenderer();
    exports.store = redux_1.createStore(reducers_1.rootReducer, initialState, redux_1.compose(redux_1.applyMiddleware(electron_redux_1.forwardToMain, redux_thunk_1.default), (window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        redux_1.compose));
    electron_redux_1.replayActionRenderer(exports.store);
    return exports.store;
};
exports.mainStore = function () {
    var store = redux_1.createStore(reducers_1.rootReducer, initialState, redux_1.applyMiddleware(electron_redux_1.triggerAlias, redux_thunk_1.default, electron_redux_1.forwardToRenderer));
    electron_redux_1.replayActionMain(store);
    return store;
};
//# sourceMappingURL=store.js.map