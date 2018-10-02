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
import 'video.js/dist/video-js.css'
import 'vuetify/dist/vuetify.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import 'html5-device-mockups/dist/device-mockups.min.css'

Vue.use(ElementUI)
Vue.use(Vuetify)
Vue.use(wysiwyg, {})
Vue.use(VueVideoPlayer)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
