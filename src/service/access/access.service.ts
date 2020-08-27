/*
 * @Description: a
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-25 16:57:41
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-25 17:45:37
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AccessInterface } from '../../interface/access.interface';

@Injectable()
export class AccessService {
  constructor(@InjectModel('Access') private readonly accessModule) {}

  async find(json: AccessInterface = {}, fields?: string) {
    try {
      return await this.accessModule.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  async add(json: AccessInterface) {
    try {
      const access = new this.accessModule(json);
      const result = await access.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  async update(json1: AccessInterface, json2: AccessInterface) {
    try {
      const result = await this.accessModule.updateOne(json1, json2);
      return result;
    } catch (error) {
      return null;
    }
  }

  async delete(json: AccessInterface) {
    try {
      const result = await this.accessModule.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }

  getModel() {
    return this.accessModule;
  }
}
