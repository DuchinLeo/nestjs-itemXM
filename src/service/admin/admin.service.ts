/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 22:15:00
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-16 20:43:33
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminInterface } from '../../interface/admin.interface';
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
  async finAdminUser(json: AdminInterface = {}) {
    const result = await this.adminModel.find(json).exec();
    return result;
  }

  // 创建用户
  async addAdminUser(admin: AdminInterface) {
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

  // ================ RBAC
  // 查询-条件
  async find(json: AdminInterface = {}, fields?: string) {
    try {
      return await this.adminModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  // 新增
  async add(json: AdminInterface) {
    try {
      const admin = new this.adminModel(json);
      const result = await admin.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  // 更新
  async update(json1: AdminInterface, jons2: AdminInterface) {
    try {
      const result = await this.adminModel.updateOne(json1, jons2);
      return result;
    } catch (error) {
      return null;
    }
  }

  // 删除
  async delete(json: AdminInterface) {
    try {
      const result = await this.adminModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }

  getModel() {
    return this.adminModel;
  }
}
