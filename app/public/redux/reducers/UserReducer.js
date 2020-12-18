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
var UserActions_1 = require("../actions/UserActions");
var initState = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    sessionId: "",
    profilePicture: undefined,
    type: -1
};
exports.userReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case UserActions_1.LOGIN_USER:
            return __assign({}, action.payload);
        case UserActions_1.LOGOUT_USER:
            return __assign({}, initState);
        default:
            return state;
    }
};
//# sourceMappingURL=UserReducer.js.map