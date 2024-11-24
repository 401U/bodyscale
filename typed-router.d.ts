/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/apikey': RouteRecordInfo<'/apikey', '/apikey', Record<never, never>, Record<never, never>>,
    '/login': RouteRecordInfo<'/login', '/login', Record<never, never>, Record<never, never>>,
    '/node/': RouteRecordInfo<'/node/', '/node', Record<never, never>, Record<never, never>>,
    '/policy': RouteRecordInfo<'/policy', '/policy', Record<never, never>, Record<never, never>>,
    '/preauthkey': RouteRecordInfo<'/preauthkey', '/preauthkey', Record<never, never>, Record<never, never>>,
    '/route': RouteRecordInfo<'/route', '/route', Record<never, never>, Record<never, never>>,
    '/user/': RouteRecordInfo<'/user/', '/user', Record<never, never>, Record<never, never>>,
    '/user/[name]': RouteRecordInfo<'/user/[name]', '/user/:name', { name: ParamValue<true> }, { name: ParamValue<false> }>,
  }
}
