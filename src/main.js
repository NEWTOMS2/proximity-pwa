// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import Vuetify from 'vuetify'
import VueVideoPlayer from 'vue-video-player'
import wysiwyg from 'vue-wysiwyg'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'video.js/dist/video-js.css'
import 'vuetify/dist/vuetify.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import 'html5-device-mockups/dist/device-mockups.min.css'
import './permision'
Vue.use(ElementUI)
Vue.use(Vuetify)
Vue.use(wysiwyg, {})
Vue.use(VueVideoPlayer)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBNHF0Df-A0QANcNhhxSUs9etFvqsV6FuE',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    /// / If you want to set the version, you can do so:
    // v: '3.26',
  }

  /// / If you intend to programmatically custom event listener code
  /// / (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  /// / instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  /// / you might need to turn this on.
  // autobindAllEvents: false,

  /// / If you want to manually install components, e.g.
  /// / import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  /// / Vue.component('GmapMarker', GmapMarker)
  /// / then disable the following:
  // installComponents: true,
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
