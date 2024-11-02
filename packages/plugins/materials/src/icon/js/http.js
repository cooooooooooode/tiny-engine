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

import { useHttp, request } from '@opentiny/tiny-engine-http'

const http = useHttp()

// 图标集合 -- 列表
export const getIconCollections = () => http.post(`/app-center/api/icons/list`)

// 图标集合 -- 创建集合
export const createIconCollection = ({ name, prefix }) => http.post('/app-center/api/icons/create', { name, prefix })

// 图标集合 -- 删除集合
export const removeIconCollection = (prefix) => http.post(`/app-center/api/icons/delete`, { prefix })

// 图标集合 -- 导入集合
export const importIconCollection = ({ name, prefix,iconify }) => http.post(`/app-center/api/icons/import`, { name, prefix,iconify })


// 图标 -- 新增
export const importIcon = ({ prefix, name, svg }) => http.post('/app-center/api/icon/import', { prefix, name, svg })

// 图标 -- 删除
export const removeIcon = ({ prefix, name }) => http.post(`/app-center/api/icon/delete`, { prefix, name })

/* iconify 请求解析 */
const iconifyRequest = request()
iconifyRequest.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

/* iconify资源——获得所有图标库 */
export const fetchIconifyCollections = () => iconifyRequest.get(`/iconify/api/collections`)
/* iconify资源——获得图标库内图标 */
export const fetchIconifyCollectionIcons = ({ prefix }) =>
  iconifyRequest.get(`/iconify/api/collection?prefix=${prefix}&chars=true&aliases=true`)
/* iconify资源——搜索图标 */
export const queryIconify = ({ query }) => iconifyRequest.get(`/iconify/api/search?query=${query}&limit=999`)
