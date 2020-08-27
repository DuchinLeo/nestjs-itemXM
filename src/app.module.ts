/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:18:13
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 21:28:01
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
import { ConfigModule, ConfigService } from './config/config';
import { UserController } from './module/admin/user/user.controller';

import { Config } from './config/config';

import { UserService } from './service/user/user.service';

import { MongooseModule } from '@nestjs/mongoose';

// admin 中间件
import { AdminauthMiddleware } from './middleware/adminauth/adminauth.middleware';
import { InitMiddleware } from './middleware/init.middleware';

@Module({
  imports: [
    AdminModule,
    DefaultModule,
    ApiModule,
    ConfigModule,
    // MongooseModule.forRoot(
    //   'mongodb://xiaomiadmin:123456@localhost:27017/xiaomiadmin',
    // ),
    MongooseModule.forRootAsync({
      connectionName: 'localhost',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_USER')}:${configService.get(
          'DB_PASSWORD',
        )}@localhost:${configService.get('DB_PORT')}/${configService.get(
          'DB_NAME',
        )}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
  ],
  controllers: [UserController],
  providers: [ConfigService, UserService],
  // exports: [AdminService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware)
      .forRoutes(`${Config.adminPath}/*`)
      // ejs模版配置
      .apply(InitMiddleware)
      .forRoutes('*');
  }
}
