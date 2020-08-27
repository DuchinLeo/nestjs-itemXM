/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 14:34:34
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-26 22:33:47
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from '../../config/config';
import { AdminService } from 'src/service/admin/admin.service';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  constructor(private adminService: AdminService) {}

  async use(req: any, res: any, next: () => void) {
    const pathName = req.baseUrl;
    // console.log('pathName', pathName);
    const userinfo = req.session.userinfo;

    if (userinfo && userinfo.username) {
      // 设置全局模版ejs变量
      res.locals.userinfo = userinfo;

      const hasAuth = await this.adminService.checkAuth(req);
      console.log('中间件权限判断', hasAuth);

      if (hasAuth) {
        next();
      } else {
        res.send('无权限访问');
      }
    } else {
      //排除不需要做权限判断的页面
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
