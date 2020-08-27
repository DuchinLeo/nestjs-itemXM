/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:22:17
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-26 22:05:14
 */
// module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// controller
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';
import { AccessController } from './access/access.controller';
// service
import { ToolsService } from '../../service/tools/tools.service';
import { UserService } from '../../service/user/user.service';
import { ConfigService } from '../../config/config.service';
import { AdminService } from '../../service/admin/admin.service';
import { RoleService } from '../../service/role/role.service';
import { AccessService } from '../../service/access/access.service';
import { RoleAccessService } from '../../service/role-access/role-access.service';
// schema
import { AdminSchema } from '../../schema/admin/admin.schema';
import { ArticleSchema } from '../../schema/admin/article.schema';
import { RoleSchema } from '../../schema/admin/role.schema';
import { AccessSchema } from '../../schema/admin/access.schema';
import { RoleAccessSchema } from '../../schema/admin/role-access.schema';

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
        {
          name: 'Access',
          schema: AccessSchema,
          collection: 'access',
        },
        {
          name: 'RoleAccess',
          schema: RoleAccessSchema,
          collection: 'role_access',
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
    AccessService,
    RoleAccessService,
  ],
  exports: [AdminService, RoleService, AccessService, RoleAccessService],
})
export class AdminModule {}
