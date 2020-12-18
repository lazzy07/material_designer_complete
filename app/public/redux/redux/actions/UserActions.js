"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN_USER = "login_user";
exports.LOGOUT_USER = "logout_user";
exports.loginUser = function (userData) {
    return { type: exports.LOGIN_USER, payload: userData };
};
exports.logoutUser = function () {
    return { type: exports.LOGOUT_USER };
};
//# sourceMappingURL=UserActions.js.map