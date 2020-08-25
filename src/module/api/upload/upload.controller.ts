/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-18 16:38:00
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-25 15:38:15
 */
import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Controller('api/upload')
export class UploadController {
  @Get()
  @Render('default/upload')
  index() {
    // return '上传';
    console.log(__dirname);
  }

  @Post('doAdd')
  @UseInterceptors(FileInterceptor('file'))
  doAdd(@Body() body, @UploadedFile() file) {
    console.log(body);
    console.log(file);
    const writeStream = createWriteStream(
      join(
        __dirname,
        '../../../../public/upload',
        // `${Date.now()}-${file.originalname}-${body.hash}`,
        `${Date.now()}-${body.hash}`,
      ),
    );
    writeStream.write(file.buffer);
    return '上传成功';
  }

  @Get('one')
  @Render('default/uploadmany')
  indexOne() {
    return '';
  }
}
