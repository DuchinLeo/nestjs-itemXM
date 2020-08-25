/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-12 16:11:20
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-25 15:43:12
 */
export interface AdminInterface {
  _id?: string;
  username?: string;
  password?: string;
  mobile?: string;
  email?: string;
  status?: number;
  role_id?: string;
  add_time?: number;
  is_super?: number;
}
