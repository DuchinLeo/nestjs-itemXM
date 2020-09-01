import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { DownloadController } from './download/download.controller';

@Module({
  controllers: [UploadController, DownloadController]
})
export class ApiModule {}
