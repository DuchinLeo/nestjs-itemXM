/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-27 15:29:16
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 22:07:44
 */
import {
  Controller,
  Get,
  Render,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Response,
  Query,
} from '@nestjs/common';
import { Config } from 'src/config/config';
import { ToolsService } from 'src/service/tools/tools.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FocusService } from 'src/service/focus/focus.service';

@Controller(`${Config.adminPath}/focus`)
export class FocusController {
  constructor(
    private toolsService: ToolsService,
    private focusService: FocusService,
  ) {}

  @Get()
  @Render('admin/focus/index')
  async index() {
    const result = await this.focusService.find();
    return {
      focusList: result,
    };
  }

  @Get('add')
  @Render('admin/focus/add')
  add() {
    return {};
  }

  @Post('doAdd')
  @UseInterceptors(FileInterceptor('focus_img'))
  async doAdd(@Body() body, @UploadedFile() file, @Response() res) {
    console.log(body);
    console.log(file);

    // 保存文件，形成路径返回
    const saveDir = this.toolsService.uploadFile(file);
    console.log('文件存储返回', saveDir);
    await this.focusService.add(
      Object.assign(body, {
        focus_img: saveDir,
      }),
    );

    this.toolsService.successRedirect(res, `/${Config.adminPath}/focus`);
  }

  @Get('edit')
  @Render('admin/focus/edit')
  async edit(@Query() query) {
    try {
      const result = await this.focusService.find({ _id: query.id });

      return {
        focus: result[0],
      };
    } catch (error) {
      console.log('编辑focus-err', error);
    }
  }

  @Post('doEdit')
  @UseInterceptors(FileInterceptor('focus_img'))
  async doEdit(@Body() body, @UploadedFile() file, @Response() res) {
    const _id = body._id;

    if (file) {
      const saveDir = this.toolsService.uploadFile(file);
      await this.focusService.update(
        {
          _id: _id,
        },
        Object.assign(body, {
          focus_img: saveDir,
        }),
      );
    } else {
      await this.focusService.update(
        {
          _id: _id,
        },
        body,
      );
    }

    this.toolsService.successRedirect(res, `/${Config.adminPath}/focus`);
  }

  @Get('delete')
  async delete(@Query() query, @Response() res) {
    const result = await this.focusService.delete({ _id: query.id });
    this.toolsService.successRedirect(res, `/${Config.adminPath}/focus`);
  }
}
