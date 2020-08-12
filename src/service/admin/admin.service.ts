/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 22:15:00
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 22:17:06
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Article') private articleModel) {}

  // 查询所有文章--测试
  async finAll() {
    const result = await this.articleModel.find().exec();
    return result;
  }
}
