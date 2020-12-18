"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _validateAction = _interopRequireDefault(require("../helpers/validateAction"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var forwardToMain = function forwardToMain(store) {
    return function (next) {
        return function (action) {
            // eslint-disable-line no-unused-vars
            if (!(0, _validateAction.default)(action))
                return next(action);
            if (action.type.substr(0, 2) !== '@@' && action.type.substr(0, 10) !== 'redux-form' && (!action.meta || !action.meta.scope || action.meta.scope !== 'local')) {
                var _electron = window.require("electron");
                _electron.ipcRenderer.send('redux-action', action); // stop action in-flight
                // eslint-disable-next-line consistent-return
                return;
            } // eslint-disable-next-line consistent-return
            return next(action);
        };
    };
};
var _default = forwardToMain;
exports.default = _default;
//# sourceMappingURL=forwardToMain.js.map