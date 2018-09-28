<template>
    <div class="home">
    <home-layout-navigation-drawer/>
    <v-content class="all-universe">
      <v-container fluid class="all-sky">
        <transition name="fade">
          <router-view/>
        </transition>
      </v-container>
    </v-content>
    </div>
</template>

<script>
import HomeLayoutNavigationDrawer from '@/components/Layouts/HomeLayouts/HomeLayoutNavigationDrawer'
export default {
  components: {HomeLayoutNavigationDrawer},
  data: () => ({
    drawer: null,
    items: [
      { icon: 'lightbulb_outline', text: 'Notes' },
      { icon: 'touch_app', text: 'Reminders' },
      { divider: true },
      { heading: 'Labels' },
      { icon: 'add', text: 'Create new label' },
      { divider: true },
      { icon: 'archive', text: 'Archive' },
      { icon: 'delete', text: 'Trash' },
      { divider: true },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Trash' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Keyboard shortcuts' }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    showDrawer () {
      this.$store.dispatch('showDrawer')
    }
  }
}
</script>

<style>
.all-sky.container {
  padding: inherit!important;
}
.all-sky {
  background: #fff;
  height: 100%;
}
.all-universe {
  min-height: 100vh;
}
</style>
