/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:24:09
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 14:54:42
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

@Controller('admin/login')
export class LoginController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  @Render('admin/login')
  index(): any {
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
    console.log('Body', Body);
  }
}
