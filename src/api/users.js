import request from '@/utils/requester'
import store from '@/store'
const baseApiUrl = 'https://npma-user-experience-api.us-e1.cloudhub.io/api'

export function fetchAllUsers () {
  return request({
    baseURL: baseApiUrl,
    url: '/users',
    method: 'get'
  })
}

export function fetchUserById (id) {
  return request({
    baseURL: baseApiUrl,
    url: `/users/${id}`,
    method: 'get'
  })
}

export function fetchAllUsersByOrganization (idOrganization) {
  return request({
    baseURL: baseApiUrl,
    url: `/users?id_organization=${idOrganization}`,
    method: 'get'
  })
}

export function creatUser (data) {
  return request({
    baseURL: baseApiUrl,
    url: '/users',
    method: 'post',
    data
  })
}

export function updateUser (id, data) {
  return request({
    baseURL: baseApiUrl,
    url: `/users/${id}`,
    method: 'put',
    data
  })
}

export function userAccess (data) {
  return request({
    baseURL: baseApiUrl,
    url: '/users/access',
    method: 'post',
    data
  })
}

export function registerTargetReached (data) {
  return request({
    baseURL: baseApiUrl,
    url: '/users/target',
    method: 'post',
    data
  })
}

export function fetchTargetsByOrganization (data) {
  return request({
    baseURL: baseApiUrl,
    url: `/users/target?id_organization=${store.state.user.info.idOrganization}`,
    method: 'get',
    data
  })
}

export function userInfo (id) {
  return request({
    baseURL: baseApiUrl,
    url: `/users/access/info/${id}`,
    method: 'get'
  })
}
