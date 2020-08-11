/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:23:58
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 10:03:59
 */
import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/main')
export class MainController {
  @Get()
  @Render('admin/main/index')
  index(): any {
    return {};
  }

  @Get('welcome')
  @Render('admin/main/welcome')
  welcome(): any {
    return {};
  }
}
