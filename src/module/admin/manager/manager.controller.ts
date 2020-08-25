/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:24:30
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-25 16:45:29
 */
import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Response,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { ConfigService } from '../../../config/config.service';
import { Config } from '../../../config/config';
import { AdminService } from 'src/service/admin/admin.service';
import { RoleService } from 'src/service/role/role.service';
import { ToolsService } from 'src/service/tools/tools.service';
import { query } from 'express';

@ApiTags('后台管理-管理员')
@Controller(`${Config.adminPath}/manager`)
export class ManagerController {
  constructor(
    private readonly adminService: AdminService,
    private roleService: RoleService,
    private toolsService: ToolsService,
  ) {}

  @Get()
  @Render('admin/manager/index')
  async index() {
    //获取admin表以及role表关联数据
    const result = await this.adminService.getModel().aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
    ]);

    console.log(JSON.stringify(result));

    return { adminResult: result };
  }

  @Get('add')
  @Render('admin/manager/add')
  async add() {
    const roleResult = await this.roleService.find();
    return {
      roleList: roleResult,
    };
  }

  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    console.log(body);
    if (body.username === '' || body.password.length < 6) {
      this.toolsService.errorRedirect(
        res,
        '用户名或者密码长度不合法',
        `/${Config.adminPath}/manager/add`,
      );
    } else {
      // 从数据库查询当前用户名是否存在
      const adminResult = await this.adminService.find({
        username: body.username,
      });
      if (adminResult.length > 0) {
        this.toolsService.errorRedirect(
          res,
          '此管理员已经存在',
          `/${Config.adminPath}/manager/add`,
        );
      } else {
        body.password = this.toolsService.getMd5(body.password);
        this.adminService.add(body);
        this.toolsService.successRedirect(res, `/${Config.adminPath}/manager`);
      }
    }
  }

  @Get('edit')
  @Render('admin/manager/edit')
  async edit(@Query() query) {
    console.log(query);

    const adminResult = await this.adminService.find({ _id: query.id });

    const roleResult = await this.roleService.find();

    return {
      adminResult: adminResult[0],
      roleList: roleResult,
    };
  }

  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    console.log('编辑提交', body);
    const id = body._id;
    const password = body.password;
    const mobile = body.mobile;
    const email = body.email;
    const role_id = body.role_id;

    if (password !== '') {
      if (password.length < 6) {
        this.toolsService.errorRedirect(
          res,
          '密码长度不合法',
          `/${Config.adminPath}/manager/edit?id=${id}`,
        );
        return;
      } else {
        const passwordMd5 = this.toolsService.getMd5(password);
        await this.adminService.update(
          { _id: id },
          {
            mobile,
            email,
            role_id,
            password: passwordMd5,
          },
        );
      }
    } else {
      await this.adminService.update(
        { _id: id },
        {
          mobile,
          email,
          role_id,
        },
      );
    }

    this.toolsService.successRedirect(res, `/${Config.adminPath}/manager`);
  }

  @Get('delete')
  async delete(@Query() query, @Response() res) {
    const result = await this.adminService.delete({ _id: query.id });
    this.toolsService.successRedirect(res, `/${Config.adminPath}/manager`);
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
