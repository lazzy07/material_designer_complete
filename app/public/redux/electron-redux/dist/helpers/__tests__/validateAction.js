"use strict";
var _validateAction = _interopRequireDefault(require("../validateAction"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
jest.unmock('../validateAction');
jest.unmock('flux-standard-action');
describe('validateAction', function () {
    it('should accept FSA-compliant actions', function () {
        var action = {
            type: 'TEST',
            payload: 123,
            meta: {
                foo: 'bar'
            }
        };
        expect((0, _validateAction.default)(action)).toBeTruthy();
    });
    it('should reject non-FSA-compliant actions', function () {
        expect((0, _validateAction.default)({})).toBeFalsy();
        expect((0, _validateAction.default)({
            meta: {}
        })).toBeFalsy();
        expect((0, _validateAction.default)(function () { })).toBeFalsy();
    });
});
//# sourceMappingURL=validateAction.js.map