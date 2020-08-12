/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-10 10:57:08
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 17:41:14
 */
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  SWAGGER_API_ROOT,
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
} from './constants';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    // nest入门接口标题
    .setTitle(SWAGGER_API_NAME)
    // 使用nest书写的常用性接口 文档介绍
    .setDescription(SWAGGER_API_DESCRIPTION)
    // .setBasePath('api')
    // 文档版本
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    // .setSchemes(...SWAGGER_API_SCHEMES)
    // .addBearerAuth(SWAGGER_API_AUTH_NAME, SWAGGER_API_AUTH_LOCATION)
    // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
    .addTag('用户,安全')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
};
