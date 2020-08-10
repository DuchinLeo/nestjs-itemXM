/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:18:13
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 12:01:19
 */
import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
import { ConfigModule, ConfigService } from './config/config';
import { UserController } from './module/admin/user/user.controller';
import { UserService } from './service/user/user.service';
@Module({
  imports: [AdminModule, DefaultModule, ApiModule, ConfigModule],
  controllers: [UserController],
  providers: [ConfigService, UserService],
})
export class AppModule {}
