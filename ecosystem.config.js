/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-10 17:50:43
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-10 18:22:42
 */
// 生产环境启动 pm2监听
// pm2 start ecosystem.config.js --env production
module.exports = {
  apps: [
    {
      name: 'xiaomi',
      script: './dist/main.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
