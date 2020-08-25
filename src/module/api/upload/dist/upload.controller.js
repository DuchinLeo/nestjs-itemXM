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
exports.__esModule = true;
exports.UploadController = void 0;
/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-18 16:38:00
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-25 15:38:15
 */
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var fs_1 = require("fs");
var path_1 = require("path");
var UploadController = /** @class */ (function () {
    function UploadController() {
    }
    UploadController.prototype.index = function () {
        // return '上传';
        console.log(__dirname);
    };
    UploadController.prototype.doAdd = function (body, file) {
        console.log(body);
        console.log(file);
        var writeStream = fs_1.createWriteStream(path_1.join(__dirname, '../../../../public/upload', 
        // `${Date.now()}-${file.originalname}-${body.hash}`,
        Date.now() + "-" + body.hash));
        writeStream.write(file.buffer);
        return '上传成功';
    };
    UploadController.prototype.indexOne = function () {
        return '';
    };
    __decorate([
        common_1.Get(),
        common_1.Render('default/upload')
    ], UploadController.prototype, "index");
    __decorate([
        common_1.Post('doAdd'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
        __param(0, common_1.Body()), __param(1, common_1.UploadedFile())
    ], UploadController.prototype, "doAdd");
    __decorate([
        common_1.Get('one'),
        common_1.Render('default/uploadmany')
    ], UploadController.prototype, "indexOne");
    UploadController = __decorate([
        common_1.Controller('api/upload')
    ], UploadController);
    return UploadController;
}());
exports.UploadController = UploadController;
