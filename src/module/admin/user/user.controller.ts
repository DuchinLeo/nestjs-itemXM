/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-10 11:52:39
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 12:31:07
 */
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiHeader,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from '../../../service/user/user.service';
import { User } from './User';
@ApiTags('用户,安全')
@Controller('admin/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/get/:id')
  @ApiParam({
    name: 'id',
    description: '这是用户id',
  })
  @ApiQuery({
    name: 'role',
    description: '这是需要传递的参数',
  })
  @ApiHeader({
    name: 'authoriation',
    required: true,
    description: '本次请求请带上token',
  })
  public getUser(@Param('id') id: string, @Query('role') role: string): string {
    return this.userService.getUser(id);
  }
  @Post('/add')
  @ApiResponse({ status: 401, description: '权限不足' })
  // 文件上传修饰器
  // @ApiImplicitFile({
  //   name: '头像',
  //   description: '上传头像',
  //   required: false,
  // })
  public addUser(@Body() user: User): any {
    return user;
  }
}
