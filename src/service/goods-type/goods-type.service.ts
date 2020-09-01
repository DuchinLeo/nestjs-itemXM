/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-27 21:27:39
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 22:27:05
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsTypeInterface } from 'src/interface/goods-type.interface';

@Injectable()
export class GoodsTypeService {
  constructor(@InjectModel('GoodsType') private readonly goodsTypeModel) {}

  async find(json: GoodsTypeInterface = {}, fields?: string) {
    try {
      return await this.goodsTypeModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  async add(json: GoodsTypeInterface) {
    try {
      const admin = new this.goodsTypeModel(json);
      const result = await admin.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  async update(json1: GoodsTypeInterface, json2: GoodsTypeInterface) {
    try {
      const result = await this.goodsTypeModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return null;
    }
  }

  async delete(json: GoodsTypeInterface) {
    try {
      const result = await this.goodsTypeModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }

  getModel() {
    return this.goodsTypeModel;
  }
}
