/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-27 21:29:16
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 22:23:44
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
import { GoodsTypeService } from '../../../service/goods-type/goods-type.service';
import { ToolsService } from '../../../service/tools/tools.service';
import { Config } from 'src/config/config';

@Controller(`${Config.adminPath}/goods-type`)
export class GoodsTypeController {
  constructor(
    private goodsTypeService: GoodsTypeService,
    private toolsService: ToolsService,
  ) {}

  @Get()
  @Render('admin/goodsType/index')
  async index() {
    // 获取到所有的商品类型
    const result = await this.goodsTypeService.find({});
    return {
      list: result,
    };
  }

  @Get('add')
  @Render('admin/goodsType/add')
  async add() {
    return {};
  }

  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    await this.goodsTypeService.add(body);
    this.toolsService.successRedirect(res, `/${Config.adminPath}/goodsType`);
  }

  @Get('edit')
  @Render('admin/goodsType/edit')
  async edit(@Query() query) {
    const result = await this.goodsTypeService.find({ _id: query.id });
    return {
      list: result[0],
    };
  }

  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    const id = body._id;
    await this.goodsTypeService.update({ _id: id }, body);
    this.toolsService.successRedirect(res, `${Config.adminPath}/goodsType`);
  }

  @Get('delete')
  async delete(@Query() query, @Response() res) {
    const result = await this.goodsTypeService.delete({ _id: query.id });
    this.toolsService.successRedirect(res, `/${Config.adminPath}/goodsType`);
  }
}
