/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:23:58
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-06 18:48:43
 */
import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class MainController {
  @Get()
  @Render('admin/main/index')
  index(): any {
    return {};
  }

  @Get('add')
  add(): any {
    return '我是管理员页面';
  }

  @Get('edit')
  edit(): any {
    return '编辑';
  }
}
