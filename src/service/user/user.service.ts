/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-10 11:56:24
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 16:19:44
 */
import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  // constructor(@InjectModel('Article') private readonly articleModel) {}

  public getUser(id: string): string {
    return `用户的id:${id}`;
  }

  // async findAll() {
  //   return await this.articleModel.find().exec();
  // }
}
