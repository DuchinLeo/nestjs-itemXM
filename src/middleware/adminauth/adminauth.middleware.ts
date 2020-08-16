/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 14:34:34
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 18:31:59
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from '../../config/config';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const pathName = req.baseUrl;
    // console.log('pathName', pathName);
    const userinfo = req.session.userinfo;
    if (userinfo && userinfo.username) {
      // 设置全局模版ejs变量
      res.locals.userinfo = userinfo;
      next();
      // console.log('登录中间件-userinfo');
    } else {
      if (
        pathName === `/${Config.adminPath}/login` ||
        pathName === `/${Config.adminPath}/login/code` ||
        pathName === `/${Config.adminPath}/login/doLogin`
      ) {
        next();
      } else {
        res.redirect(`/${Config.adminPath}/login`);
      }
    }
  }
}
