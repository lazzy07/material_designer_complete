"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var aliases = {};
var _default = {
    get: function get(key) {
        return aliases[key];
    },
    set: function set(key, value) {
        aliases[key] = value;
    }
};
exports.default = _default;
//# sourceMappingURL=alias.js.map