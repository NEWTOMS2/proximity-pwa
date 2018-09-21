import request from '@/utils/requester'
const baseApiUrl = 'http://npma-orgaization-experience-api.us-e1.cloudhub.io/api'

export function fetchAllOrganizations () {
  return request({
    baseURL: baseApiUrl,
    url: '/organizations',
    method: 'get'
  })
}

export function fetchOrganizationById (id) {
  return request({
    baseURL: baseApiUrl,
    url: `/organizations/${id}`,
    method: 'get'
  })
}

export function creatOrganization (data) {
  return request({
    baseURL: baseApiUrl,
    url: '/organizations',
    method: 'post',
    data
  })
}

export function updateOrganization (id, data) {
  return request({
    baseURL: baseApiUrl,
    url: `/organizations/${id}`,
    method: 'put',
    data
  })
}
