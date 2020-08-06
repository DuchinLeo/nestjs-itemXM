/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:24:09
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-06 17:06:33
 */
import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/login')
export class LoginController {
  @Get()
  @Render('admin/login')
  index() {
    return {};
  }
}
