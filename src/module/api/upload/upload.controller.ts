/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-18 16:38:00
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-10-18 17:38:21
 */
import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller('api/upload')
export class UploadController {
  constructor(private toolsService: ToolsService) {}
  @Get()
  @Render('default/upload')
  index() {
    // return '上传';
    console.log(__dirname);
  }

  @Post('doAdd')
  @UseInterceptors(FileInterceptor('file'))
  doAdd(@Body() body, @UploadedFile() file, @Response() res) {
    console.log('body', body);
    console.log('file',body);
    const writeStream = createWriteStream(
      join(
        __dirname,
        '../../../../public/upload',
        // `${Date.now()}-${file.originalname}-${body.hash}`,
        `${Date.now()}-${body.hash}`,
      ),
    );
    writeStream.write(file.buffer);
    res.send({
      msg: "上传成功"
    })
  }

  @Get('one')
  @Render('default/uploadmany')
  indexOne() {
    return '';
  }

  @Post('doAddT')
  @UseInterceptors(FileInterceptor('focus_img'))
  async doAddT(@Body() body, @UploadedFile() file, @Response() res) {
    console.log(body);
    console.log(file);

    // 保存文件，形成路径返回
    const saveDir = this.toolsService.uploadFile(file);
    console.log('文件存储返回', saveDir);
    // await this.focusService.add(
    //   Object.assign(body, {
    //     focus_img: saveDir,
    //   }),
    // );

    // this.toolsService.successRedirect(res, `/${Config.adminPath}/focus`);
  }

  @Post("verify")
  async verify(@Body() body, @Response() res) {
    const fileHash = body.fileHash;
    console.log('fileHash', fileHash);
    const fileHashList = await this.toolsService.getFileDir(
      join(__dirname, '../../../../public/upload', `${fileHash}`),
    );
    console.log('fileHashList', fileHashList);
    res.send({
      succeed: '获取成功',
      data: {
        fileHashList
      }
    })
  }
}
