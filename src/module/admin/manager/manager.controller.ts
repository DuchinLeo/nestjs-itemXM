/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:24:30
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-06 17:06:50
 */
import { Controller, Get } from '@nestjs/common';

@Controller('admin/manager')
export class ManagerController {
  @Get()
  index() {
    return '后台管理员';
  }
}
