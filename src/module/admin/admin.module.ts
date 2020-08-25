/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:22:17
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-16 17:48:33
 */
import { Module } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';

import { UserController } from './user/user.controller';

// service
import { ToolsService } from '../../service/tools/tools.service';
import { UserService } from '../../service/user/user.service';
import { ConfigService } from '../../config/config.service';
import { AdminService } from '../../service/admin/admin.service';
import { RoleService } from '../../service/role/role.service';

import { AdminSchema } from '../../schema/admin/admin.schema';
import { ArticleSchema } from '../../schema/admin/article.schema';
import { RoleSchema } from '../../schema/admin/role.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role/role.controller';
import { AccessController } from './access/access.controller';

@Module({
  // imports: [
  //   // MongooseModule.forFeature([
  //   //   { name: 'Admin', schema: AdminSchema, collection: 'admin' },
  //   // ]),
  //   // MongooseModule.forFeatureAsync([
  //   //   {
  //   //     name: 'Article',
  //   //     useFactory: () => {
  //   //       const schema = ArticleSchema;
  //   //       return schema;
  //   //     },
  //   //     collection: 'article',
  //   //   },
  //   // ]),
  // ],
  // imports: [
  //   MongooseModule.forFeature([
  //     { name: 'Article', schema: ArticleSchema, collection: 'article' },
  //     'localhost',
  //   ]),
  // ],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Article',
          schema: ArticleSchema,
          collection: 'article',
        },
        {
          name: 'Admin',
          schema: AdminSchema,
          collection: 'admin',
        },
        {
          name: 'Role',
          schema: RoleSchema,
          collection: 'role',
        },
      ],
      'localhost',
    ),
  ],
  controllers: [
    MainController,
    LoginController,
    ManagerController,
    UserController,
    RoleController,
    AccessController,
  ],
  providers: [
    ToolsService,
    UserService,
    ConfigService,
    AdminService,
    RoleService,
  ],
  // exports: [AdminModule],
})
export class AdminModule {}
