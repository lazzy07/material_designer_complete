"use strict";

var _electron = require("electron");

var _getInitialStateRenderer = _interopRequireDefault(require("../getInitialStateRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('../getInitialStateRenderer');
describe('getInitialStateRenderer', function () {
  it('should return the initial state', function () {
    var state = {
      foo: 456
    };

    _electron.remote.getGlobal.mockImplementation(function () {
      return function () {
        return JSON.stringify(state);
      };
    });

    expect((0, _getInitialStateRenderer.default)()).toEqual(state);
  });
});