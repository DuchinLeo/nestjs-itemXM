/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 22:15:00
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 17:29:19
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../../interface/admin.interface';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Article') private articleModel,
    @InjectModel('Admin') private adminModel,
  ) {}

  // 查询所有文章--测试
  async finAll() {
    const result = await this.articleModel.find().exec();
    return result;
  }

  // 查询admin
  async finAdmin() {
    const result = await this.adminModel.find().exec();
    return result;
  }

  // 查询用户是否匹配
  async finAdminUser(json: Admin = {}) {
    const result = await this.adminModel.find(json).exec();
    return result;
  }

  // 创建用户
  async addAdminUser(admin: Admin) {
    // const adminL = new this.adminModel(admin);
    // // const adminL = this.adminModel.insertOne(admin);
    // const result = await adminL.save();
    // return result;
    const result = await this.finAdminUser({
      username: admin.username,
    });
    if (result.length > 0) {
      return undefined;
    } else {
      this.adminModel.insertMany([admin], (err, doc) => {
        if (err) {
          return err;
        }
        return doc;
      });
    }
  }
}
