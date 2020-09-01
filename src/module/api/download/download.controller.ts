/*
 * @Description: 获取文件
 * @Author: Duchin/梁达钦
 * @Date: 2020-09-01 10:06:10
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-09-01 10:20:36
 */
import { Controller, Get } from '@nestjs/common';
import { ApiDownloadService } from 'src/service/api-download/api-download.service';
import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';

@Controller('api/download')
export class DownloadController {
  constructor(private apiDownloadService: ApiDownloadService) {}

  @Get('getfile')
  getFile() {
    return 'a';
  }
}
