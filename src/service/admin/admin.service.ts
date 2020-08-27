/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-11 22:15:00
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-27 14:35:32
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminInterface } from '../../interface/admin.interface';
import { Config } from 'src/config/config';
import { RoleAccessService } from '../role-access/role-access.service';
import { AccessService } from '../access/access.service';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Article') private articleModel,
    @InjectModel('Admin') private adminModel,
    private roleAccessService: RoleAccessService,
    private accessService: AccessService,
  ) {}

  // 查询所有文章--测试
  async finAll() {
    const result = await this.articleModel.find().exec();
    return result;
  }

  // 查询admin
  async finAdmin() {
    const result = await this.adminModel.find().exec();
    return result;
  }

  // 查询用户是否匹配
  async finAdminUser(json: AdminInterface = {}) {
    const result = await this.adminModel.find(json).exec();
    return result;
  }

  // 创建用户
  async addAdminUser(admin: AdminInterface) {
    // const adminL = new this.adminModel(admin);
    // // const adminL = this.adminModel.insertOne(admin);
    // const result = await adminL.save();
    // return result;
    const result = await this.finAdminUser({
      username: admin.username,
    });
    if (result.length > 0) {
      return undefined;
    } else {
      this.adminModel.insertMany([admin], (err, doc) => {
        if (err) {
          return err;
        }
        return doc;
      });
    }
  }

  // ================ RBAC
  // 查询-条件
  async find(json: AdminInterface = {}, fields?: string) {
    try {
      return await this.adminModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  // 新增
  async add(json: AdminInterface) {
    try {
      const admin = new this.adminModel(json);
      const result = await admin.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  // 更新
  async update(json1: AdminInterface, jons2: AdminInterface) {
    try {
      const result = await this.adminModel.updateOne(json1, jons2);
      return result;
    } catch (error) {
      return null;
    }
  }

  // 删除
  async delete(json: AdminInterface) {
    try {
      const result = await this.adminModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }

  getModel() {
    return this.adminModel;
  }

  async checkAuth(req) {
    /*
      1、获取当前用户的角色    （如果超级管理员跳过权限判断 is_super=1）
      2、根据角色获取当前角色的权限列表                       
      3、获取当前访问的url 对应的权限id
      4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    */

    const Vpathname: string = req.baseUrl;
    // 去掉 Config.adminPath
    const pathNmae = Vpathname.replace(`/${Config.adminPath}/`, '');

    const userinfo = req.session.userinfo;
    const role_id = userinfo.role_id;
    if (
      userinfo.is_super === 1 ||
      pathNmae === 'login/loginOut' ||
      pathNmae === 'main/welcome' ||
      pathNmae == 'main' ||
      pathNmae == 'login' ||
      pathNmae == 'login/doLogin'
    ) {
      return true;
    }

    // 2、根据角色获取当前角色的权限列表
    const accessResult = await this.roleAccessService.find({
      role_id: role_id,
    });
    const roleAccessArray = [];
    accessResult.forEach(val => {
      roleAccessArray.push(val.access_id.toString());
    });

    console.log('中间件权限判断权限列表', roleAccessArray);
    console.log('中间件权限判断权限的url', pathNmae);

    // 3. 获取当前访问url对应的权限id

    const accessResultTo = await this.accessService.find({ url: pathNmae });

    if (accessResultTo.length > 0) {
      // 4. 判断当前访问的url对应的权限id 是否在权限列表中的id中
      if (roleAccessArray.indexOf(accessResultTo[0]._id.toString()) !== -1) {
        console.log('判断当前访问的url对应的权限id 是否在权限列表中的id中true');
        return true;
      }
      console.log('判断当前访问的url对应的权限id 是否在权限列表中的id中false');
      return false;
    } else {
      console.log('获取当前访问url对应的权限id, 数据为空false');
      return false;
    }
  }
}
