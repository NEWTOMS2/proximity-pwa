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
        { path: '/app/beacons/all', component: Beacons },
        { path: '/app/beacons/types', component: BeaconTypes },
        { path: '/app/beacons/hierarchy', component: BeaconHierarchy },
        { path: '/app/beacons/placehierarchy', component: BeaconPlaceHierarchy },
        { path: '/app/places', component: Places },
        { path: '/app/contentcards', component: ContentCards }
      ]
    }
  ]
})
