<template>
    <div class="drawer">
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
            <v-list>
                <template v-for="item in items">
                    <v-layout v-if="item.heading" :key="item.heading" row align-center>
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading  }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :append-icon="item.model ? item.icon : item['icon-alt']" :prepend-icon="item.baseIncon">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(child, i) in item.children" :key="i" @click="">
                        <router-link class="item-drawer-list" :to="child.path">
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </router-link>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" @click="">
                        <router-link class="item-drawer-list" :to="item.path">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                        </router-link>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app absolute clipped-left>
            <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
            <span class="title ml-3 mr-5">NEWTOMS&nbsp;<span class="font-weight-light">Proximity Marketing Agency (NPMA)</span></span>
            <!-- <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field> -->
            <v-spacer></v-spacer>
            <v-btn flat @click="onSubmit">Log Out</v-btn>
        </v-toolbar>
    </div>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'lightbulb_outline', text: 'Home', path: '/app' },
      {
        baseIncon: 'adjust',
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Beacons',
        model: true,
        children: [
          { text: 'All Beacons', path: '/app/beacons/all', icon: 'scatter_plot' },
          /* { text: 'Edit Beacons', path: '/app/beacons/all' }, */
          { text: 'Types', path: '/app/beacons/types', icon: 'linear_scale' },
          { text: 'Hierarchy', path: '/app/beacons/hierarchy', icon: 'border_vertical' },
          { text: 'Place Hierarchy', path: '/app/beacons/placehierarchy', icon: 'group_work' }
        ]
      },
      { icon: 'place', text: 'Places', path: '/app/places' },
      { icon: 'art_track', text: 'Content Cards', path: '/app/contentcards' }
      /* { divider: true },
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
      { icon: 'keyboard', text: 'Keyboard shortcuts' } */
    ]
  }),
  created () {
    console.log(this.$router)
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('logInOut').then(() => {
        this.$router.push({path: '/', replace: true})
      })
    }
  },
  props: {
    source: String
  }
}
</script>

<style>
.item-drawer-list {
    display: flex;
    text-decoration: none;
}
</style>
