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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.arrayDeduplicate = void 0;
var fs_1 = require("fs");
var axios_1 = require("axios");
function writeAPI() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var apiList, res, pathObj_1, tagsList_1, conversionData, res2, writeData, key, funName, method, error_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    apiList = [
                        'http://192.168.3.201:8002/v3/api-docs?group=%E7%B3%BB%E7%BB%9F%E6%9C%8D%E5%8A%A1',
                    ];
                    return [4 /*yield*/, Promise.all(apiList.map(function (items) { return __awaiter(_this, void 0, void 0, function () {
                            var respon;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, axios_1.default.get(items)];
                                    case 1:
                                        respon = _a.sent();
                                        if (!respon) {
                                            return [2 /*return*/, []];
                                        }
                                        return [2 /*return*/, respon];
                                }
                            });
                        }); }))];
                case 1:
                    res = _b.sent();
                    pathObj_1 = {};
                    tagsList_1 = [];
                    // 合并路径对象以及tags数组
                    res.forEach(function (item) {
                        pathObj_1 = __assign(__assign({}, pathObj_1), item.data.paths);
                        tagsList_1 = __spreadArray(__spreadArray([], tagsList_1, true), item.data.tags, true);
                    });
                    conversionData = (_a = res.shift()) === null || _a === void 0 ? void 0 : _a.data;
                    conversionData.paths = pathObj_1;
                    conversionData.tags = arrayDeduplicate(tagsList_1, 'name');
                    res2 = JSON.stringify(conversionData).replace(/\«|»|\s+/g, '_');
                    writeData = JSON.parse(res2);
                    for (key in writeData.paths) {
                        funName = key
                            .split('/')
                            .filter(function (item) { return item && item !== 'api' && item !== 'v1'; })
                            .map(function (item, index) {
                            if (index === 0) {
                                return item;
                            }
                            else {
                                return "".concat(item[0].toUpperCase()).concat(item.slice(1));
                            }
                        })
                            .join('');
                        method = Object.keys(writeData.paths[key])[0];
                        writeData.paths[key][method].operationId = "".concat(funName).concat(method.toUpperCase());
                    }
                    (0, fs_1.writeFileSync)('./src/json/api.json', JSON.stringify(writeData));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log('出错了');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
writeAPI();
/**
 * 对象数组去重，根据key值
 * @param arr 需要去重的对象数组
 * @returns hashList 返回去重后的列表
 */
function arrayDeduplicate(arr, name) {
    var hash = {};
    var hashList = JSON.parse(JSON.stringify(arr));
    hashList = hashList.reduce(function (total, currentValue) {
        if (!hash[currentValue[name]]) {
            hash[currentValue[name]] = true;
            total.push(currentValue);
        }
        return total;
    }, []);
    return hashList;
}
exports.arrayDeduplicate = arrayDeduplicate;
