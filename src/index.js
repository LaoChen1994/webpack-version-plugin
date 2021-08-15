"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var path_1 = require("path");
var url_1 = require("url");
var fs_1 = require("fs");
var chalk_1 = require("chalk");
var interface_1 = require("./interface");
var STATIC_FILE_TYPE = {
    CSS: 'css',
    JS: 'js',
    STATIC_FILE: 'static'
};
var VersionPlugin = /** @class */ (function (_super) {
    __extends(VersionPlugin, _super);
    function VersionPlugin(props) {
        var _this = _super.call(this, props) || this;
        var _a = props.jsPublicPath, jsPublicPath = _a === void 0 ? '' : _a, _b = props.cssPublicPath, cssPublicPath = _b === void 0 ? '' : _b, _c = props.localPath, localPath = _c === void 0 ? '' : _c, _d = props.isProduction, isProduction = _d === void 0 ? false : _d, _e = props.publicPath, publicPath = _e === void 0 ? '' : _e, _f = props.mode, mode = _f === void 0 ? interface_1.GEN_MODE.OVERITE : _f, _g = props.jsVersionPath, jsVersionPath = _g === void 0 ? '' : _g, _h = props.cssVersionPath, cssVersionPath = _h === void 0 ? '' : _h;
        _this.jsPublicPath = jsPublicPath;
        _this.cssPublicPath = cssPublicPath;
        _this.localPath = localPath;
        _this.isProduction = isProduction;
        _this.publicPath = publicPath;
        _this.mode = mode;
        _this.jsVersionPath = jsVersionPath;
        _this.cssVersionPath = cssVersionPath;
        return _this;
    }
    VersionPlugin.prototype.getStaticPath = function (fileName) {
        var isJS = fileName.match(/\.js$/);
        var isCss = fileName.match(/.css$/);
        var prefixUrl = '';
        if (!this.isProduction) {
            prefixUrl = path_1["default"].join(this.localPath, fileName);
        }
        else {
            prefixUrl = new url_1.URL(fileName, isJS ? this.jsPublicPath : isCss ? this.cssPublicPath : this.publicPath).href;
        }
        return {
            type: isJS
                ? STATIC_FILE_TYPE.JS
                : isCss
                    ? STATIC_FILE_TYPE.CSS
                    : STATIC_FILE_TYPE.STATIC_FILE,
            path: prefixUrl
        };
    };
    VersionPlugin.prototype.apply = function (compiler) {
        var _this = this;
        var chunkJSMap = {};
        var chunkCssMap = {};
        var jsVersionPath = path_1["default"].resolve(__dirname, this.jsVersionPath);
        var cssVersionPath = path_1["default"].resolve(__dirname, this.cssVersionPath);
        compiler.hooks.emit.tapAsync('myPlugin', function (compilation, cb) { return __awaiter(_this, void 0, void 0, function () {
            var prevJsMap, prevCssMap;
            var _this = this;
            return __generator(this, function (_a) {
                compilation.chunks.forEach(function (chunk) {
                    var chunkName = chunk.name;
                    chunk.files.forEach(function (filename) {
                        var _a = _this.getStaticPath(filename), type = _a.type, _staticPath = _a.path;
                        switch (type) {
                            case STATIC_FILE_TYPE.JS:
                                chunkJSMap[chunkName] = _staticPath;
                                break;
                            case STATIC_FILE_TYPE.CSS:
                                chunkCssMap[chunkName] = _staticPath;
                                break;
                            default:
                                break;
                        }
                    });
                });
                if (this.mode === interface_1.GEN_MODE.MERGE) {
                    try {
                        prevJsMap = JSON.parse(fs_1["default"].readFileSync(jsVersionPath).toString() || '{}');
                        prevCssMap = JSON.parse(fs_1["default"].readFileSync(cssVersionPath).toString() || '{}');
                        chunkJSMap = __assign(__assign({}, chunkJSMap), prevJsMap);
                        chunkCssMap = __assign(__assign({}, chunkCssMap), prevCssMap);
                    }
                    catch (error) {
                        console.log('读取文件错误 ->', error);
                    }
                }
                fs_1["default"].writeFileSync(jsVersionPath, JSON.stringify(chunkJSMap));
                fs_1["default"].writeFileSync(cssVersionPath, JSON.stringify(chunkCssMap));
                console.log(chalk_1["default"].yellow("js version \u6587\u4EF6\u5DF2\u7ECF\u751F\u6210" + jsVersionPath));
                console.log(chalk_1["default"].yellow("css version \u6587\u4EF6\u5DF2\u7ECF\u751F\u6210" + cssVersionPath));
                cb();
                return [2 /*return*/];
            });
        }); });
    };
    return VersionPlugin;
}(interface_1.BaseVersion));
module.exports = VersionPlugin;
