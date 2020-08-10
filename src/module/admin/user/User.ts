/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-10 12:20:13
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 12:20:21
 */
// User.ts
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: '用户名',
  })
  username: string;
  @ApiProperty({
    description: '密码',
  })
  password: string;
}
