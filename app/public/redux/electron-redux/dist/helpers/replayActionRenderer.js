"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = replayActionRenderer;
function replayActionRenderer(store) {
    var _electron = window.require("electron");
    _electron.ipcRenderer.on('redux-action', function (event, payload) {
        store.dispatch(payload);
    });
}
//# sourceMappingURL=replayActionRenderer.js.map