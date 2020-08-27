/*
 * @Description: 权限管理
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-25 16:58:49
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-25 17:03:30
 */
export interface AccessInterface {
  _id?: string;
  module_name?: string;
  action_name?: string;
  type?: number;
  url?: string;
  module_id?: string;
  sort?: number;
  description?: string;
  status?: number;
  add_time?: number;
}
