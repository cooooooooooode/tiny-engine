/**
 * Copyright (c) 2023 - present TinyEngine Authors.
 * Copyright (c) 2023 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

import { useHttp,request } from '@opentiny/tiny-engine-http'

const http = useHttp()

// 自定义图标库 -- 列表
export const getCustomIconCollections = () => http.get(`/app-center/api/icons/list`)

// 自定义图标库 -- 新增
export const addCustomIconCollection = ({title}) => http.post('/app-center/api/icons/create', {title})

// 自定义图标库 -- 删除
export const delCustomIconCollection = (id) => http.get(`/app-center/api/icons/delete/${id}`)

// 自定义图标库 -- 更新
export const updateCustomIconCollection = (id, {title}) =>http.post(`/app-center/api/icons/update/${id}`, {title})


// 自定义图标 -- 列表
export const getCustomIcons = () => http.get(`/app-center/api/icon/list`)

// 自定义图标 -- 新增
export const addCustomIcon = ({title,name,svg}) => http.post('/app-center/api/icon/create', {title,name,svg})

// 自定义图标 -- 删除
export const delCustomIcon = (id) => http.get(`/app-center/api/icon/delete/${id}`)

// 自定义图标 -- 更新
export const updateCustomIcon = (id, {title,name,svg}) =>http.post(`/app-center/api/icon/update/${id}`, {title,name,svg})


/* iconify 请求解析 */
const iconifyRequest = request();
iconifyRequest.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  return Promise.reject(err)
})

/* iconify资源——获得所有图标库 */
export const fetchIconifyCollections = () => iconifyRequest.get(`/iconify/api/collections`)
/* iconify资源——获得图标库内图标 */
export const fetchIconifyCollectionIcons = ({prefix}) => iconifyRequest.get(`/iconify/api/collection?prefix=${prefix}&chars=true&aliases=true`)
/* iconify资源——搜索图标 */
export const queryIconify = ({query}) => iconifyRequest.get(`/iconify/api/search?query=${query}&limit=999`)
