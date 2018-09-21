import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/Views/Landing'
import Home from '@/Views/Home'
import Beacons from '@/Views/ViewsUser/Beacons'
import BeaconTypes from '@/Views/ViewsUser/BeaconTypes'
import BeaconHierarchy from '@/Views/ViewsUser/BeaconHierarchy'
import BeaconPlaceHierarchy from '@/Views/ViewsUser/BeaconPlaceHierarchy'
import Places from '@/Views/ViewsUser/Places'
import ContentCards from '@/Views/ViewsUser/ContentCards'
import Users from '@/Views/Master/Users'
import Roles from '@/Views/Master/Roles'
import Organizations from '@/Views/Master/Organizations'
// import { Loading } from 'element-ui';
/* import Main from '@/Views/Main'
import LayoutContentCarousel from '@/components/Layouts/LayoutContent/LayoutContentCarousel'
import Home from '@/Views/ViewsUser/Home'
import Beacon from '@/Views/ViewsUser/Beacon'
import BeaconTypes from '@/Views/ViewsUser/BeaconTypes'
import BeaconHierarchy from '@/Views/ViewsUser/BeaconHierarchy'
import BeaconPlaceHierarchy from '@/Views/ViewsUser/BeaconPlaceHierarchy'
import ContentCards from '@/Views/ViewsUser/ContentCards'
*/
Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        { path: '/', component: LayoutContentCarousel },
        { path: '/Home', component: Home },
        { path: '/Beacon', component: Beacon },
        { path: '/BeaconTypes', component: BeaconTypes },
        { path: '/BeaconHierarchy', component: BeaconHierarchy },
        { path: '/BeaconPlaceHierarchy', component: BeaconPlaceHierarchy },
        { path: '/Places', component: Places },
        { path: '/ContentCards', component: ContentCards }
      ]
    } */
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/app',
      name: 'Home',
      component: Home,
      children: [
        { path: '/app/beacons/all', component: Beacons, meta: {title: 'All Beacons', icon: 'scatter_plot', group: 'beacon'} },
        { path: '/app/beacons/types', component: BeaconTypes, meta: {title: 'Types', icon: 'inear_scale', group: 'beacon'} },
        { path: '/app/beacons/hierarchy', component: BeaconHierarchy, meta: {title: 'Hierarchy', icon: 'border_vertical', group: 'beacon'} },
        { path: '/app/beacons/placehierarchy', component: BeaconPlaceHierarchy, meta: {title: 'Place Hierarchy', icon: 'group_work', group: 'beacon'} },
        { path: '/app/places', component: Places, meta: {title: 'Places', icon: 'place', group: ''} },
        { path: '/app/contentcards', component: ContentCards, meta: {title: 'Content Cards', icon: 'art_track', group: ''} },
        { path: '/app/master/users', component: Users, meta: {title: 'Users', icon: 'people', group: ''} },
        { path: '/app/master/roles', component: Roles, meta: {title: 'Roles', icon: 'category', group: ''} },
        { path: '/app/master/organizations', component: Organizations, meta: {title: 'Organization', icon: 'store_mall_directory', group: ''} }
      ]
    }
  ]
})
