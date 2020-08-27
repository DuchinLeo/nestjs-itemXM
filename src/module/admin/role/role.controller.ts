/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-16 17:50:49
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-26 21:23:24
 */
import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Response,
  Query,
  Delete,
} from '@nestjs/common';
import { RoleService } from '../../../service/role/role.service';
import { ToolsService } from 'src/service/tools/tools.service';
import { Config } from '../../../config/config';
import { AccessService } from 'src/service/access/access.service';
import { RoleAccessService } from 'src/service/role-access/role-access.service';

@Controller(`${Config.adminPath}/role`)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private toolsService: ToolsService,
    private accessService: AccessService,
    private roleAccessService: RoleAccessService,
  ) {}

  @Get()
  @Render('admin/role/index')
  async index() {
    const result = await this.roleService.find({});
    return {
      roleList: result,
    };
  }

  @Get('add')
  @Render('admin/role/add')
  async add() {
    return {};
  }

  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    console.log('doAdd-body', body);

    if (body.title !== '') {
      const result = await this.roleService.add(body);
      if (result) {
        this.toolsService.successRedirect(res, `/${Config.adminPath}/role`);
      } else {
        this.toolsService.errorRedirect(
          res,
          '增加失败',
          `/${Config.adminPath}/role`,
        );
      }
    } else {
      this.toolsService.errorRedirect(
        res,
        '标题不能为空',
        `/${Config.adminPath}/role`,
      );
    }
  }

  @Get('edit')
  @Render('admin/role/edit')
  async edit(@Query() query) {
    const result = await this.roleService.find({ _id: query.id });
    return {
      roleList: result[0],
    };
  }

  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    if (body.title !== '') {
      const result = await this.roleService.update({ _id: body._id }, body);
      if (result) {
        this.toolsService.successRedirect(res, `/${Config.adminPath}/role`);
      } else {
        this.toolsService.errorRedirect(
          res,
          '增加失败',
          `/${Config.adminPath}/role`,
        );
      }
    } else {
      this.toolsService.errorRedirect(
        res,
        '标题不能为空',
        `/${Config.adminPath}/role`,
      );
    }
  }

  @Get('delete')
  async delete(@Query() query, @Response() res) {
    const result = await this.roleService.delete({ _id: query.id });
    console.log(result);
    this.toolsService.successRedirect(res, `/${Config.adminPath}/role`);
  }

  // 授权
  @Get('auth')
  @Render('admin/role/auth')
  async auth(@Query() query) {
    //1、获取全部的权限
    const role_id = query.id;
    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);

    // 2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中

    const accessResult = await this.roleAccessService.find({
      role_id: role_id,
    });

    const roleAccessArray = [];
    accessResult.forEach(val => {
      roleAccessArray.push(val.access_id.toString());
    });

    console.log('权限列表', roleAccessArray);

    // 3、循环遍历所有的权限数据，判断当前权限是否在角色权限的数组中,如果是的话给当前数据加入checked属性

    for (let i = 0; i < result.length; i++) {
      if (roleAccessArray.indexOf(result[i]._id.toString()) !== -1) {
        result[i].checked = true;
      }

      for (let j = 0; j < result[i].items.length; j++) {
        if (roleAccessArray.indexOf(result[i].items[j]._id.toString()) !== -1) {
          result[i].items[j].checked = true;
        }
      }
    }

    return {
      list: result,
      role_id: role_id,
    };
  }

  @Post('doAuth')
  async doAuth(@Body() body, @Response() res) {
    console.log('doAuth', body);

    const role_id = body.role_id;
    const access_node = body.access_node;

    // 1.删除当前角色下面的所有权限
    await this.roleAccessService.deleteMany({ role_id: role_id });

    // 2.把当前角色对应的所有权限增加到role_access表里面
    for (let i = 0; i < access_node.length; i++) {
      await this.roleAccessService.add({
        role_id: role_id,
        access_id: access_node[i],
      });
    }

    this.toolsService.successRedirect(
      res,
      `/${Config.adminPath}/role/auth?id=${role_id}`,
    );
  }
}
