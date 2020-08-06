/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:23:58
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-06 17:14:21
 */
import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class MainController {
  @Get()
  @Render('admin/main/index')
  index() {
    return {};
  }
}
