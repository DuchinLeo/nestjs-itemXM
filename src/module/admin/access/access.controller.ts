/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-25 16:56:47
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-26 17:04:35
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
import { Config } from 'src/config/config';
import { AccessService } from 'src/service/access/access.service';
import { ToolsService } from 'src/service/tools/tools.service';
import * as mongoose from 'mongoose';

@Controller(`${Config.adminPath}/access`)
export class AccessController {
  constructor(
    private accessService: AccessService,
    private toolsService: ToolsService,
  ) {}

  @Get()
  @Render('admin/access/index')
  async index() {
    //1、在access表中找出  module_id=0的数据

    //2、让access表和access表关联    条件：找出access表中module_id等于_id的数据
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

    console.log(
      '查找access关联access表顶级菜单数据type=0',
      JSON.stringify(result),
    );

    return {
      list: result,
    };
  }

  // Get请求获取页面所需数据， 进行渲染、Post请求处理实际功能
  @Get('add')
  @Render('admin/access/add')
  async add() {
    // 获取模版列表
    const result = await this.accessService.find({ module_id: '0' });

    return {
      moduleList: result,
    };
  }

  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    const module_id = body.module_id;
    if (module_id != 0) {
      // 混合类型。非0时需要转换成ObjectId
      body.module_id = mongoose.Types.ObjectId(module_id);
    }
    await this.accessService.add(body);

    this.toolsService.successRedirect(res, `/${Config.adminPath}/access`);
  }

  @Get('edit')
  @Render('admin/access/edit')
  async edit(@Query() query) {
    // 获取模块列表
    const result = await this.accessService.find({ module_id: '0' });

    const accessResult = await this.accessService.find({ _id: query.id });

    return {
      list: accessResult[0],
      moduleList: result,
    };
  }

  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    console.log(body);
    const _id = body._id;
    try {
      const module_id = body.module_id;
      if (module_id != 0) {
        body.module_id = mongoose.Types.ObjectId(module_id);
      }

      await this.accessService.update({ _id: _id }, body);
      this.toolsService.successRedirect(
        res,
        `/${Config.adminPath}/access/edit?id=${_id}`,
      );
    } catch (error) {
      this.toolsService.errorRedirect(
        res,
        '非法请求',
        `/${Config.adminPath}/access/edit?id=${_id}`,
      );
    }
  }

  @Get('delete')
  async delete(@Query() query, @Response() res) {
    try {
      await this.accessService.delete({ _id: query.id });
      this.toolsService.successRedirect(res, `/${Config.adminPath}/access`);
    } catch (error) {
      this.toolsService.errorRedirect(
        res,
        '非法请求',
        `/${Config.adminPath}/access`,
      );
    }
  }
}
