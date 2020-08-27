/*
 * @Description: 轮播图服务
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-27 17:32:43
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 17:42:37
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FocusInterface } from 'src/interface/focus.interface';

@Injectable()
export class FocusService {
  constructor(@InjectModel('Focus') private readonly focusModel) {}

  async find(json: FocusInterface = {}, fields?: string) {
    try {
      return await this.focusModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  async add(josn: FocusInterface) {
    try {
      const access = new this.focusModel(josn);
      const result = await access.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  async update(json1: FocusInterface, json2: FocusInterface) {
    try {
      const result = await this.focusModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return null;
    }
  }

  async delete(json: FocusInterface) {
    try {
      const result = await this.focusModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }

  getModel() {
    return this.focusModel;
  }
}
