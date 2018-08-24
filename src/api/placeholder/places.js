import request from '@/utils/requester'

export function fetchPlacesPlaceholder () {
  return request({
    url: '/places',
    method: 'get'
  })
}
export function fetchPlacePlaceholder (id) {
  return request({
    url: `/places/${id}`,
    method: 'get'
  })
}

export function creatPlacePlaceholder (data) {
  return request({
    url: '/places',
    method: 'post',
    data
  })
}

export function updatePlacePlaceholder (data) {
  return request({
    url: `/places/${data.id}`,
    method: 'patch',
    data
  })
}
