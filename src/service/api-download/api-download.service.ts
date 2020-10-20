/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-09-01 10:16:44
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-10-18 16:43:54
 */
import { Injectable } from '@nestjs/common';
import { createWriteStream, createReadStream, readdir, stat } from 'fs';
// import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { UploadChunkInterface } from 'src/interface/upload-chunk';

@Injectable()
export class ApiDownloadService {
  constructor(@InjectModel('UploadChunk') private uploadChunkModel) {}



  // add list
  async addUploadList(json: UploadChunkInterface) {
    try {
      const uploadlist = new this.uploadChunkModel(json);
      const result = await uploadlist.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  // 查询-获取
  async findUploadList(jsonA: UploadChunkInterface = {}, fields?: string) {
    try {
      // if () {
      return await this.uploadChunkModel.find(jsonA, fields);
      // } else {
      //   const result = await this.uploadChunkModel.find({}).exec();
      //   return result;
      // }
    } catch (error) {
      return [];
    }
  }
}
