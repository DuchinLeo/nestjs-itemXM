/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-09-01 10:16:44
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-09-07 14:50:32
 */
import { Injectable } from '@nestjs/common';
import { createWriteStream, createReadStream, readdir, stat } from 'fs';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { UploadChunkInterface } from 'src/interface/upload-chunk';

@Injectable()
export class ApiDownloadService {
  constructor(@InjectModel('UploadChunk') private uploadChunkModel) {}

  async getFileDir(pathName: string) {
    const fileArr = new Promise(resolve => {
      readdir(pathName, function(err, files) {
        const dirs = [];
        function iterator(i) {
          if (i == files.length) {
            resolve(dirs);
            return;
          }
          stat(path.join(pathName, files[i]), function(err, data) {
            if (data.isFile()) {
              dirs.push(files[i]);
            }
            iterator(i + 1);
          });
        }
        const result = iterator(0);
        return result;
      });
    });
    return fileArr;
  }

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
