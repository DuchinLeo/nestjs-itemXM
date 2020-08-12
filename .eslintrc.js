/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-06 16:18:13
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-11 14:53:39
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // res req 警告 参数“res”应该被键入 屏蔽
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
