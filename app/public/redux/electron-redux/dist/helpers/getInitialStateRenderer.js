"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getInitialStateRenderer;
function getInitialStateRenderer() {
    var _electron = window.require("electron");
    var getReduxState = _electron.remote.getGlobal('getReduxState');
    if (!getReduxState) {
        throw new Error('Could not find reduxState global in main process, did you forget to call replayActionMain?');
    }
    return JSON.parse(getReduxState());
}
//# sourceMappingURL=getInitialStateRenderer.js.map