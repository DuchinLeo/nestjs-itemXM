/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:18:13
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-06 16:29:59
 */
import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';

@Module({
  imports: [AdminModule, DefaultModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
