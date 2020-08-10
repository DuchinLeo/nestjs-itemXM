/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:22:17
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 18:10:25
 */
import { Module } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from '../../service/tools/tools.service';
import { UserController } from './user/user.controller';
import { UserService } from '../../service/user/user.service';
import { ConfigService } from '../../config/config.service';
@Module({
  controllers: [
    MainController,
    LoginController,
    ManagerController,
    UserController,
  ],
  providers: [ToolsService, UserService, ConfigService],
})
export class AdminModule {}
