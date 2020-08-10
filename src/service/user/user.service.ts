/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-10 11:56:24
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 11:57:00
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  public getUser(id: string): string {
    return `用户的id:${id}`;
  }
}
