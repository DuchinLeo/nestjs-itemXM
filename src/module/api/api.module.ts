/*
 * @Description: api
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:22:54
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-09-02 15:17:44
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload/upload.controller';
import { DownloadController } from './download/download.controller';
import { ToolsService } from './../../service/tools/tools.service';
import { ApiDownloadService } from 'src/service/api-download/api-download.service';
import { UploadChunkSchema } from '../../schema/api/upload-chunk-list.schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'UploadChunk',
          schema: UploadChunkSchema,
          collection: 'upload_chunk',
        },
      ],
      'localhost',
    ),
  ],
  controllers: [UploadController, DownloadController],
  providers: [ToolsService, ApiDownloadService],
})
export class ApiModule {}
