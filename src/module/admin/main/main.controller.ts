/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:23:58
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 19:30:56
 */
import { Controller, Get, Render, Request, Query } from '@nestjs/common';
import { AdminService } from '../../../service/admin/admin.service';
import { Config } from '../../../config/config';
import { AccessService } from 'src/service/access/access.service';
import { RoleAccessService } from 'src/service/role-access/role-access.service';
import { FocusService } from 'src/service/focus/focus.service';
import { query } from 'express';
@Controller(`${Config.adminPath}/main`)
export class MainController {
  constructor(
    private adminService: AdminService,
    private accessService: AccessService,
    private roleAccessService: RoleAccessService,
    private focusService: FocusService,
  ) {}

  @Get()
  @Render('admin/main/index')
  async index(@Request() req) {
    // 1.获取全部的权限
    const userinfo = req.session.userinfo;
    const role_id = userinfo.role_id;
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
    console.log('登录-admin/main,获取全部权限result', result);
    // 2.查询当前角色拥有的权限（根据角色id查询当前角色的权限id）把查找到的数据放在数组中

    const accessResult = await this.roleAccessService.find({
      role_id: role_id,
    });

    const roleAccessArray = [];
    accessResult.forEach(val => {
      roleAccessArray.push(val.access_id.toString());
    });

    console.log('登录-admin/main,查询当前角色拥有的权限', roleAccessArray);

    // 3.循环遍历所有的权限数据，判断当前权限是否在角色权限的数组中，如果是的话给当前数据加入checked属性
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
      asideList: result,
    };
  }

  @Get('welcome')
  @Render('admin/main/welcome')
  welcome(): any {
    return {};
  }

  @Get('changeStatus')
  async changeStatus(@Query() query) {
    //1、获取要修改数据的id
    //2、我们需要查询当前数据的状态
    //3、修改状态   0 修改成 1    1修改成0

    const id = query.id;
    // 要操作的数据模型，即focusService
    let model = query.model + 'Service';
    // 需要修改的字段  status
    const fields = query.fields;
    let json;
    const modelResult = await this[model].find({ _id: id });

    if (modelResult.length > 0) {
      const tempFields = modelResult[0][fields];

      tempFields === 1 ? (json = { [fields]: 0 }) : (json = { [fields]: 1 });

      await this[model].update({ _id: id }, json);

      return {
        success: true,
        message: '修改状态成功',
      };
    } else {
      return {
        success: false,
        message: '传入参数错误',
      };
    }
  }

  // 更新数量
  @Get('editNum')
  async editNum(@Query() query) {
    // 更新的id
    const id = query.id;
    const model = query.model + 'Service';
    const fields = query.fields;
    const num = query.num;

    const modelResult = await this[model].find({ _id: id });

    if (modelResult.length > 0) {
      const json = {
        [fields]: num,
      };
      console.log('更新数量json', json);
      await this[model].update({ _id: id }, json);

      return {
        success: true,
        message: '修改成功',
      };
    } else {
      return {
        success: false,
        message: '传入参数错误',
      };
    }
  }

  @Get('article')
  async article() {
    const result = await this.adminService.finAll();
    return result;
  }
}
