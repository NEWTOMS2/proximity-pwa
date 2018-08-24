import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/Views/Main'
import LayoutContentCarousel from '@/components/Layouts/LayoutContent/LayoutContentCarousel'
import Home from '@/Views/ViewsUser/Home'
import Beacon from '@/Views/ViewsUser/Beacon'
import BeaconTypes from '@/Views/ViewsUser/BeaconTypes'
import BeaconHierarchy from '@/Views/ViewsUser/BeaconHierarchy'
import ContentCards from '@/Views/ViewsUser/ContentCards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        { path: '/', component: LayoutContentCarousel },
        { path: '/Home', component: Home },
        { path: '/Beacon', component: Beacon },
        { path: '/BeaconTypes', component: BeaconTypes },
        { path: '/BeaconHierarchy', component: BeaconHierarchy },
        { path: '/ContentCards', component: ContentCards }
      ]
    }
  ]
})
