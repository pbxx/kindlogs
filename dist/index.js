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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KindLogs = void 0;
// process["FORCE_COLOR"] = 3
// import ansis from "ansis"
/**
 *
 */
var KindLogs = /** @class */ (function () {
    function KindLogs(opts) {
        var _this = this;
        this.logMethods = ["debug", "log", "warn", "error"];
        this.colors = null;
        this.levelColors = null;
        this.evalColor = function (text, level) {
            return _this.options.color ? level != 0 ? _this.levelColors[level](text) : null : text;
        };
        this.levelTextFromInt = function (level) {
            var levelStrings = [
                null,
                "[FATAL]",
                "[ERROR]",
                "[WARN]",
                "[INFO]",
                "[DEBUG]",
                "[TRACE]",
            ];
            var outStr = _this.evalColor(levelStrings[level], level);
            return outStr;
        };
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            //level based logging
            if (args[0] <= _this.options.logLevel) {
                //logs.log this
                var levelText = _this.levelTextFromInt(args[0]);
                var level = args[0];
                args.shift();
                return level == 0 ? console.log.apply(console, args) : console.log.apply(console, __spreadArray([levelText], args, false));
            }
        };
        this.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            //level based logging
            if (args[0] <= _this.options.logLevel) {
                //logs.log this
                var levelText = _this.levelTextFromInt(args[0]);
                var level = args[0];
                args.shift();
                return level == 0 ? console.error.apply(console, args) : console.error.apply(console, __spreadArray([levelText], args, false));
            }
        };
        this.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            //level based logging
            if (args[0] <= _this.options.logLevel) {
                //logs.log this
                var levelText = _this.levelTextFromInt(args[0]);
                var level = args[0];
                args.shift();
                return level == 0 ? console.warn.apply(console, args) : console.warn.apply(console, __spreadArray([levelText], args, false));
            }
        };
        this.trace = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            //level based logging
            if (args[0] <= _this.options.logLevel) {
                //logs.log this
                var levelText = _this.levelTextFromInt(args[0]);
                var level = args[0];
                args.shift();
                return level == 0 ? console.trace.apply(console, args) : console.trace.apply(console, __spreadArray([levelText], args, false));
            }
        };
        this.options = __assign({ logLevel: 3, color: false }, opts);
        // Import ansis if color is truey
        if (this.options.color == true) {
            // this.colors = require("ansis")
            // this.colors = (await import("ansis")).default
            this.colors = require("ansis");
            this.levelColors = [
                null,
                this.colors.bold.black.bgRed,
                this.colors.bold.red,
                this.colors.bold.yellow,
                this.colors.bold.cyan,
                this.colors.bold.blue,
                this.colors.bold.white
            ];
        }
    }
    return KindLogs;
}());
exports.KindLogs = KindLogs;
exports.default = KindLogs;
