/*
 * @Description: 
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:22:37
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 14:42:28
 */
import { Module } from '@nestjs/common';
import { IndexController } from './index/index.controller';

@Module({
  controllers: [IndexController],
})
export class DefaultModule {}
