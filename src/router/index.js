import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/Views/Landing'
import Main from '@/Views/Main'

import Beacons from '@/Views/Client/Beacons'
import BeaconTypes from '@/Views/Client/BeaconTypes'
import BeaconHierarchy from '@/Views/Client/BeaconHierarchy'
import BeaconPlaceHierarchy from '@/Views/Client/BeaconPlaceHierarchy'
import Places from '@/Views/Client/Places'

import Users from '@/Views/Master/Users'
import Roles from '@/Views/Master/Roles'
import Organizations from '@/Views/Master/Organizations'

import ContentCards from '@/Views/Media/ContentCards'
import CreatContentCard from '@/Views/Media/CreatContentCard'
import UpdateContentCard from '@/Views/Media/UpdateContentCard'
import MediaContentCard from '@/Views/Media/Content/MediaContentCard'

import Targets from '@/Views/Analytics/Targets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/access',
      name: 'Access',
      component: Landing,
      meta: {noRender: true}
    },
    {
      path: '/app',
      name: 'Landing',
      component: Main,
      meta: {title: 'Home', icon: 'home', roles: ['Client', 'Administrator', 'Master', 'Moderator']}
    },
    {
      path: '/media/content/:id/:idOrganization',
      name: 'Media Content',
      component: MediaContentCard,
      meta: {noRender: true, requiredAuth: false}
    },
    {
      path: '/app/beacons',
      name: 'Beacons',
      component: Main,
      meta: {title: 'Beacons', model: true, prependIcon: 'adjust', appendIcon: 'keyboard_arrow_up', appendIconAlt: 'keyboard_arrow_down', roles: ['Client', 'Administrator']},
      children: [
        { path: '/app/beacons/all', component: Beacons, meta: {title: 'All Beacons', icon: 'scatter_plot'} },
        { path: '/app/beacons/types', component: BeaconTypes, meta: {title: 'Types', icon: 'linear_scale'} },
        { path: '/app/beacons/places', component: Places, meta: {title: 'Places', icon: 'place', group: ''} },
        { path: '/app/beacons/hierarchy', component: BeaconHierarchy, meta: {title: 'Hierarchy', icon: 'border_vertical'} },
        { path: '/app/beacons/placehierarchy', component: BeaconPlaceHierarchy, meta: {title: 'Place Hierarchy', icon: 'group_work'} }
      ]
    },
    {
      path: '/app/media',
      name: 'Media',
      component: Main,
      meta: {title: 'Media Content', model: true, prependIcon: 'perm_media', appendIcon: 'keyboard_arrow_up', appendIconAlt: 'keyboard_arrow_down', roles: ['Client', 'Administrator', 'Moderator']},
      children: [
        { path: '/app/media/contentcards', component: ContentCards, meta: {title: 'Content Cards', icon: 'art_track', group: ''} },
        { path: '/app/media/new_content_card', component: CreatContentCard, meta: {title: 'New Content Card', icon: 'art_track', group: ''} },
        { path: '/app/media/update_content_card', component: UpdateContentCard, meta: {title: 'Update Content Card', icon: 'art_track', group: ''} }
      ]
    },
    {
      path: '/app/analytics',
      name: 'Analytics',
      component: Main,
      meta: {title: 'Analytics', model: true, prependIcon: 'equalizer', appendIcon: 'keyboard_arrow_up', appendIconAlt: 'keyboard_arrow_down', roles: ['Client', 'Administrator']},
      children: [
        { path: '/app/analytics/targets', component: Targets, meta: {title: 'Reached Targets', icon: 'center_focus_weak', group: ''} }
      ]
    },
    {
      path: '/app/master',
      name: 'Master',
      component: Main,
      meta: {title: 'Administration', model: true, prependIcon: 'settings', appendIcon: 'keyboard_arrow_up', appendIconAlt: 'keyboard_arrow_down', roles: ['Master', 'Administrator']},
      children: [
        { path: '/app/master/users', component: Users, meta: {title: 'Users', icon: 'people', group: ''} },
        { path: '/app/master/roles', component: Roles, meta: {title: 'Roles', icon: 'category', group: ''} },
        { path: '/app/master/organizations', component: Organizations, meta: {title: 'Organization', icon: 'store_mall_directory', group: ''} }
      ]
    }
  ]
})
