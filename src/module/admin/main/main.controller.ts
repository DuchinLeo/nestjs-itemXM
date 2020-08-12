/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:23:58
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 22:21:29
 */
import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from '../../../service/admin/admin.service';

@Controller('admin/main')
export class MainController {
  constructor(private adminService: AdminService) {}

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

  @Get('article')
  async article() {
    const result = await this.adminService.finAll();
    return result;
  }
}
