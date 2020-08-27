/*
 * @Description: 角色-权限关系服务
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-26 17:36:04
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-26 17:54:57
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleAccessService {
  constructor(@InjectModel('RoleAccess') private roleAccessModel) {}

  async find(json, fields?: string) {
    try {
      return await this.roleAccessModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  async add(json) {
    try {
      const role = new this.roleAccessModel(json);
      const result = await role.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  async update(json1, json2) {
    try {
      const result = await this.roleAccessModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return null;
    }
  }

  async delete(json) {
    try {
      const result = await this.roleAccessModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }

  async deleteMany(json) {
    try {
      const result = await this.roleAccessModel.deleteMany(json);
      return result;
    } catch (error) {
      return null;
    }
  }
}
