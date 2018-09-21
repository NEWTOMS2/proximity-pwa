import request from '@/utils/requester'
const baseApiUrl = 'http://npma-users-system-api.us-e1.cloudhub.io/api/users'

export function fetchAllRoles () {
  return request({
    baseURL: baseApiUrl,
    url: '/roles',
    method: 'get'
  })
}

export function fetchRoleById (id) {
  return request({
    baseURL: baseApiUrl,
    url: `/roles/${id}`,
    method: 'get'
  })
}

export function creatRole (data) {
  return request({
    baseURL: baseApiUrl,
    url: '/roles',
    method: 'post',
    data
  })
}

export function updateRole (id, data) {
  return request({
    baseURL: baseApiUrl,
    url: `/roles/${id}`,
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
