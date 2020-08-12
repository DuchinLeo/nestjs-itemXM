/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 14:40:36
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 14:43:38
 */
import { Controller, Get } from '@nestjs/common';

@Controller('default')
export class IndexController {
  @Get()
  index() {
    return '前台';
  }
}
