/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-12 16:11:20
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-12 16:11:27
 */
export interface Admin {
  username?: string;
  password?: string;
  mobile?: string;
  email?: string;
  status?: number;
  // role_id: {
  //   type: Schema.Types.ObjectId,
  // },
  add_time?: number;
  is_super?: number;
}
