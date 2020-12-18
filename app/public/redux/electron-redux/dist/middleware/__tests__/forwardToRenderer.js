"use strict";
var _electron = require("electron");
var _forwardToRenderer = _interopRequireDefault(require("../forwardToRenderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
jest.unmock('../forwardToRenderer');
describe('forwardToRenderer', function () {
    it('should pass an action through to the main store', function () {
        var next = jest.fn();
        var action = {
            type: 'SOMETHING'
        };
        (0, _forwardToRenderer.default)()(next)(action);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(action);
    });
    it('should forward any actions to the renderer', function () {
        var next = jest.fn();
        var action = {
            type: 'SOMETHING',
            meta: {
                some: 'meta'
            }
        };
        var send = jest.fn();
        _electron.webContents.getAllWebContents.mockImplementation(function () {
            return [{
                    send: send
                }];
        });
        (0, _forwardToRenderer.default)()(next)(action);
        expect(send).toHaveBeenCalledTimes(1);
        expect(send).toHaveBeenCalledWith('redux-action', {
            type: 'SOMETHING',
            meta: {
                some: 'meta',
                scope: 'local'
            }
        });
    });
    it('should ignore local actions', function () {
        var next = jest.fn();
        var action = {
            type: 'SOMETHING',
            meta: {
                scope: 'local'
            }
        };
        var send = jest.fn();
        _electron.webContents.getAllWebContents.mockImplementation(function () {
            return [{
                    send: send
                }];
        });
        (0, _forwardToRenderer.default)()(next)(action);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(action);
        expect(send).toHaveBeenCalledTimes(0);
    });
});
//# sourceMappingURL=forwardToRenderer.js.map