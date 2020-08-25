/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-16 17:15:43
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-16 18:13:59
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleInterface } from '../../interface/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel) {}
  async find(json: RoleInterface = {}, fields?: string) {
    try {
      return await this.roleModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  async add(json: RoleInterface) {
    try {
      const role = new this.roleModel(json);
      const result = await role.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  async update(json1: RoleInterface, json2: RoleInterface) {
    try {
      const result = await this.roleModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return null;
    }
  }

  async delete(json: RoleInterface) {
    try {
      const result = await this.roleModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }
}
