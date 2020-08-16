/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-12 18:19:42
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 18:40:39
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from '../config/config';
import { Helper } from '../extend/helper';

@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // ejs全局配置
    res.locals.config = Config;

    // 方法全局配置
    res.locals.helper = Helper;
    next();
  }
}
