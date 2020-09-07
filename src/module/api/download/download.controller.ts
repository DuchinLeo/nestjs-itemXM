/*
 * @Description: 获取文件
 * @Author: Duchin/梁达钦
 * @Date: 2020-09-01 10:06:10
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-09-07 14:53:43
 */
import { Controller, Get, Query, Post, Response, Body } from '@nestjs/common';
import { ApiDownloadService } from 'src/service/api-download/api-download.service';
import { createWriteStream, createReadStream, readdir, readFileSync } from 'fs';
import { join } from 'path';
import { query } from 'express';

@Controller('api/download')
export class DownloadController {
  constructor(private apiDownloadService: ApiDownloadService) {}

  @Get()
  index() {
    return 'api';
  }

  // 获取文件夹下的文件名称
  @Get('getfileList')
  async getFile(@Query() query) {
    const pathName = query.pathName;
    console.log('pathname', pathName);
    const fileDirArr = await this.apiDownloadService.getFileDir(
      join(__dirname, '../../../../public/upload', `${pathName}`),
    );
    console.log('fileDirArr', fileDirArr);
    return {
      fileDirArr,
    };
  }

  @Get('getfile')
  async getRead(@Query() query) {
    const fileName = query.fileName;
    const pathName = query.pathName;
    const readStream = createReadStream(
      join(
        __dirname,
        '../../../../public/upload',
        `${pathName}`,
        `${fileName}`,
      ),
    );
    // let data = '';
    // const fileBuff = await new Promise(resolve => {
    //   readStream.on('data', function(chunk) {
    //     data += chunk;
    //   });
    //   readStream.on('end', function(e) {
    //     // console.log('e--', e);
    //     // console.log('data', data);
    //     resolve(data);
    //   });
    //   readStream.on('error', function(err) {
    //     console.log(err);
    //   });
    // });
    const data = readFileSync(
      join(
        __dirname,
        '../../../../public/upload',
        `${pathName}`,
        `${fileName}`,
      ),
      'utf-8',
    );
    // console.log(data);
    // return {
    //   // fileBuff: fileBuff,
    //   fileBuff: data,
    //   fileName: fileName,
    // };
    return data;
  }
  @Post('getfiles')
  async getReads(@Response() res, @Body() body) {
    // console.log(body);
    // console.log('---');
    // console.log(res);
    const fileName = body.fileName;
    const pathName = body.pathName;
    const readStream = createReadStream(
      join(
        __dirname,
        '../../../../public/upload',
        `${pathName}`,
        `${fileName}`,
      ),
    );
    // let data = '';
    // const fileBuff = await new Promise(resolve => {
    //   readStream.on('data', function(chunk) {
    //     data += chunk;
    //   });
    //   readStream.on('end', function(e) {
    //     // console.log('e--', e);
    //     // console.log('data', data);
    //     resolve(data);
    //   });
    //   readStream.on('error', function(err) {
    //     console.log(err);
    //   });
    // });
    const data = readFileSync(
      join(
        __dirname,
        '../../../../public/upload',
        `${pathName}`,
        `${fileName}`,
      ),
    );
    // console.log(data);
    res.send({
      // fileBuff: fileBuff,
      fileBuff: data,
      fileName: fileName,
    });
    // return {
    //   // fileBuff: fileBuff,
    //   fileBuff: data,
    //   fileName: fileName,
    // };

    // return data;
  }

  // 返回数据库存储的文件列表
  @Get('getUpload')
  async getUpload(@Query() query) {
    let fileHash = undefined;
    let list = null;
    try {
      fileHash = query.fileHash;
      if (fileHash !== undefined) {
        list = await this.apiDownloadService.findUploadList({
          file_hash: fileHash,
        });
      } else {
        console.log('无参数');
        list = await this.apiDownloadService.findUploadList();
      }
    } catch (error) {
      list = {
        code: 500,
      };
    }

    return {
      result: list,
    };
  }

  @Post('addUploadList')
  async addUploadList(@Body() body, @Response() res) {
    const result = await this.apiDownloadService.addUploadList(body);
    res.send({
      succeed: '添加成功',
      result,
    });
  }
}
