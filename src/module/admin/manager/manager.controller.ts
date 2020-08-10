/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:24:30
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-09 12:34:57
 */
import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/manager')
export class ManagerController {
  @Get()
  @Render('admin/manager/index')
  index(): any {
    console.log('process.env.NODE_ENV;', process.env.NODE_ENV);
    return process.env.NODE_ENV;
  }

  @Get('add')
  @Render('admin/manager/add')
  add(): any {
    return {};
  }

  @Get('edit')
  @Render('admin/manager/edit')
  edit(): any {
    return {};
  }
}
