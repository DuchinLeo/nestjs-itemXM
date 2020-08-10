/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:18:13
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 18:30:20
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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 设置跨站访问
    logger: false,
  });
  //配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  //配置模板引擎
  // app.setBaseViewsDir('views');
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  //配置cookie 中间件
  app.use(cookieParser('thissignedcookies'));
  //配置 session 的中间件
  app.use(
    session({
      secret: 'keyboardcat',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 30, httpOnly: true },
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
