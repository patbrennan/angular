"use strict";
exports.__esModule = true;
// using Firebase SDK - configured in app component when the app starts
var firebase = require("firebase");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.signupUser = function (email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)["catch"](function (error) { return console.log(error); });
    };
    AuthService.prototype.signinUser = function (email, password) {
        var _this = this;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (response) {
            firebase.auth().currentUser.getToken()
                .then(function (newToken) { return _this.token = newToken; });
        })["catch"](function (error) { return console.log(error); });
    };
    // get access to the auth token stored in browser's local storage
    AuthService.prototype.getToken = function () {
        var _this = this;
        // this is async action - look @ local storage; if still valid, OK; if not,
        // reaches out to backend automatically & gets new valid token
        firebase.auth().currentUser.getToken()
            .then(function (newToken) { return _this.token = newToken; });
        return this.token;
    };
    return AuthService;
}());
exports.AuthService = AuthService;
