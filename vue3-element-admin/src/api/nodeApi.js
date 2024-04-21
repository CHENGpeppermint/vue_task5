import request from '@/utils/request'
import { VUE_APP_BASE_API } from '../../public/config'

// 获取二维码
export function get_Code (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/string',
    method: 'get',
    params: data
  })
}
// 登录
export function post_Login (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/login',
    method: 'post',
    data: data
  })
}
// 获取文件列表
export function get_filelist (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/filelist',
    method: 'get',
    params: data
  })
}
// 删除文件
export function del_file (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/delfile',
    method: 'post',
    data: data
  })
}


// 获取列表
export function get_List (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/findMany',
    method: 'post',
    data: data
  })
}
// 获取信息
export function get_Info (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/findOne',
    method: 'post',
    data: data
  })
}
// 添加信息
export function add_List (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/insertOne',
    method: 'post',
    data: data
  })
}
// 编辑信息
export function set_List (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/updateOne',
    method: 'post',
    data: data
  })
}
// 删除信息
export function del_List (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/deleteOne',
    method: 'post',
    data: data
  })
}
// 自定义
export function executeSql (data) {
  return request({
    baseURL: VUE_APP_BASE_API,
    url: '/executeSql',
    method: 'post',
    data: data
  })
}