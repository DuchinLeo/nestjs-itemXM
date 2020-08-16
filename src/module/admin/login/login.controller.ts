/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:24:09
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 18:30:05
 */
import {
  Controller,
  Get,
  Render,
  Request,
  Response,
  Post,
  Body,
} from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
import { AdminService } from '../../../service/admin/admin.service';
import { Config } from '../../../config/config';

@Controller(`${Config.adminPath}/login`)
export class LoginController {
  constructor(
    private readonly toolsService: ToolsService,
    private readonly adminService: AdminService,
  ) {}

  @Get()
  @Render('admin/login')
  async index() {
    // console.log(await this.adminService.finAdmin());
    return {};
  }

  @Get('code')
  getcode(@Request() req, @Response() res) {
    const svgCaptcha = this.toolsService.getCaptcha();
    // 设置session
    req.session.code = svgCaptcha.text;

    res.type('image/svg+xml');

    res.send(svgCaptcha.data);
  }

  @Post('doLogin')
  async doLogin(@Body() Body, @Request() req, @Response() res) {
    const code: string = Body.code;
    const username: string = Body.username;
    const password: string = Body.password;
    console.log('Body', Body);
    console.log('req.session.code', req.session.code);
    try {
      if (username == '' || password.length < 6) {
        this.toolsService.errorRedirect(
          res,
          '/admin/login',
          '用户名或密码格式错误',
        );
      } else {
        // 判断验证码
        if (code.toUpperCase() === req.session.code.toUpperCase()) {
          const userResult = await this.adminService.finAdminUser({
            username: username,
            password: this.toolsService.getMd5(password),
          });
          if (userResult.length > 0) {
            console.log('登录成功');
            req.session.userinfo = userResult[0];
            this.toolsService.successRedirect(res, `/${Config.adminPath}/main`);
          }
        } else {
          this.toolsService.errorRedirect(
            res,
            `/${Config.adminPath}/login`,
            '验证码错误',
          );
          console.log('验证码错误');
        }
      }
    } catch (error) {
      // res.redirect('/admin/login');
      console.log('执行try-catch');
      res.redirect(`/${Config.adminPath}/login`);
    }
  }

  @Get('loginOut')
  loginOut(@Request() req, @Response() res) {
    req.session.userinfo = null;
    res.redirect(`${Config.adminPath}/login`);
  }
}
