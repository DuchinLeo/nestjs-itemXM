/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:18:13
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 11:53:54
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { ConfigModule } from './config/config';
import { ConfigService } from './config/config';
import { setupSwagger } from './swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    //   , {
    //   cors: true, // 设置跨站访问
    //   logger: false
    // }
  );
  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  //配置模板引擎
  // app.setBaseViewsDir('views');
  app.setBaseViewsDir('views');
  // app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  //配置cookie 中间件
  app.use(cookieParser('this signed cookies'));
  //配置 session 的中间件
  app.use(
    session({
      // 签名
      secret: 'keyboard cat',
      // 强制保存 session 即使它并没有变化
      resave: true,
      // 强制将未初始化的 session 存储
      saveUninitialized: true,
      cookie: { maxAge: 219000, httpOnly: true },
      // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间
      rolling: true,
    }),
  );
  const configService = app.select(ConfigModule).get(ConfigService);
  if (['development'].includes(configService.nodeEnv)) {
    setupSwagger(app);
  }

  await app.listen(3000);
}
bootstrap();
