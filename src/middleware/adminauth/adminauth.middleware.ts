/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 14:34:34
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 15:00:21
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const pathName = req.baseUrl;
    // console.log('pathName', pathName);
    const userinfo = req.session.userinfo;
    if (userinfo && userinfo.username) {
      next();
      // console.log('登录中间件-userinfo');
    } else {
      if (
        pathName === '/admin/login' ||
        pathName === '/admin/login/code' ||
        pathName === '/admin/login/doLogin'
      ) {
        next();
      } else {
        res.redirect('/admin/login');
      }
    }
  }
}
