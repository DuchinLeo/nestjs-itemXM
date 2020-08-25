"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.__esModule = true;
exports.ManagerController = void 0;
/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:24:30
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-25 16:45:29
 */
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
// import { ConfigService } from '../../../config/config.service';
var config_1 = require("../../../config/config");
var ManagerController = /** @class */ (function () {
    function ManagerController(adminService, roleService, toolsService) {
        this.adminService = adminService;
        this.roleService = roleService;
        this.toolsService = toolsService;
    }
    ManagerController.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminService.getModel().aggregate([
                            {
                                $lookup: {
                                    from: 'role',
                                    localField: 'role_id',
                                    foreignField: '_id',
                                    as: 'role'
                                }
                            },
                        ])];
                    case 1:
                        result = _a.sent();
                        console.log(JSON.stringify(result));
                        return [2 /*return*/, { adminResult: result }];
                }
            });
        });
    };
    ManagerController.prototype.add = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roleResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roleService.find()];
                    case 1:
                        roleResult = _a.sent();
                        return [2 /*return*/, {
                                roleList: roleResult
                            }];
                }
            });
        });
    };
    ManagerController.prototype.doAdd = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var adminResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(body);
                        if (!(body.username === '' || body.password.length < 6)) return [3 /*break*/, 1];
                        this.toolsService.errorRedirect(res, '用户名或者密码长度不合法', "/" + config_1.Config.adminPath + "/manager/add");
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.adminService.find({
                            username: body.username
                        })];
                    case 2:
                        adminResult = _a.sent();
                        if (adminResult.length > 0) {
                            this.toolsService.errorRedirect(res, '此管理员已经存在', "/" + config_1.Config.adminPath + "/manager/add");
                        }
                        else {
                            body.password = this.toolsService.getMd5(body.password);
                            this.adminService.add(body);
                            this.toolsService.successRedirect(res, "/" + config_1.Config.adminPath + "/manager");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManagerController.prototype.edit = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var adminResult, roleResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(query);
                        return [4 /*yield*/, this.adminService.find({ _id: query.id })];
                    case 1:
                        adminResult = _a.sent();
                        return [4 /*yield*/, this.roleService.find()];
                    case 2:
                        roleResult = _a.sent();
                        return [2 /*return*/, {
                                adminResult: adminResult[0],
                                roleList: roleResult
                            }];
                }
            });
        });
    };
    ManagerController.prototype.doEdit = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, password, mobile, email, role_id, passwordMd5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('编辑提交', body);
                        id = body._id;
                        password = body.password;
                        mobile = body.mobile;
                        email = body.email;
                        role_id = body.role_id;
                        if (!(password !== '')) return [3 /*break*/, 4];
                        if (!(password.length < 6)) return [3 /*break*/, 1];
                        this.toolsService.errorRedirect(res, '密码长度不合法', "/" + config_1.Config.adminPath + "/manager/edit?id=" + id);
                        return [2 /*return*/];
                    case 1:
                        passwordMd5 = this.toolsService.getMd5(password);
                        return [4 /*yield*/, this.adminService.update({ _id: id }, {
                                mobile: mobile,
                                email: email,
                                role_id: role_id,
                                password: passwordMd5
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.adminService.update({ _id: id }, {
                            mobile: mobile,
                            email: email,
                            role_id: role_id
                        })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        this.toolsService.successRedirect(res, "/" + config_1.Config.adminPath + "/manager");
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagerController.prototype["delete"] = function (query, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminService["delete"]({ _id: query.id })];
                    case 1:
                        result = _a.sent();
                        this.toolsService.successRedirect(res, "/" + config_1.Config.adminPath + "/manager");
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        common_1.Get(),
        common_1.Render('admin/manager/index')
    ], ManagerController.prototype, "index");
    __decorate([
        common_1.Get('add'),
        common_1.Render('admin/manager/add')
    ], ManagerController.prototype, "add");
    __decorate([
        common_1.Post('doAdd'),
        __param(0, common_1.Body()), __param(1, common_1.Response())
    ], ManagerController.prototype, "doAdd");
    __decorate([
        common_1.Get('edit'),
        common_1.Render('admin/manager/edit'),
        __param(0, common_1.Query())
    ], ManagerController.prototype, "edit");
    __decorate([
        common_1.Post('doEdit'),
        __param(0, common_1.Body()), __param(1, common_1.Response())
    ], ManagerController.prototype, "doEdit");
    __decorate([
        common_1.Get('delete'),
        __param(0, common_1.Query()), __param(1, common_1.Response())
    ], ManagerController.prototype, "delete");
    ManagerController = __decorate([
        swagger_1.ApiTags('后台管理-管理员'),
        common_1.Controller(config_1.Config.adminPath + "/manager")
    ], ManagerController);
    return ManagerController;
}());
exports.ManagerController = ManagerController;
