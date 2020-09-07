/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-09-02 15:08:46
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-09-02 15:28:53
 */
export interface UploadChunkInterface {
  upload_list?: string;
  file_name?: string;
  file_size?: string;
  description?: string;
  status?: number;
  add_time?: number;
  file_hash?: string;
}
