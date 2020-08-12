/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:24:30
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 12:04:56
 */
import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { ConfigService } from '../../../config/config.service';

@ApiTags('后台管理-管理员')
@Controller('admin/manager')
export class ManagerController {
  // constructor() {}
  // constructor(private readonly configService: ConfigService) {}

  @Get()
  @Render('admin/manager/index')
  index(){
      return {};
  }
  @Get('add')
  @Render('admin/manager/add')
  add(){
    return {};
  }

  @Get('edit')
  @Render('admin/manager/edit')
  edit(){
    return {};
  }

  // @Get('base')
  // base(): any {
  //   const base = this.configService.get('APP_URL');
  //   const info = `APP_URL:${base} APP_HOST: ${this.configService.get(
  //     'APP_HOST',
  //   )}`;
  //   return info;
  // }
}
