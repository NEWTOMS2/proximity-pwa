<template>
    <div class="drawer">
        <v-navigation-drawer :mini-variant.sync="mini" :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
                <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>dashboard</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
            <v-list>
                <template v-for="item in routes">
                    <v-layout v-if="item.heading" :key="item.heading" row align-center>
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading  }}
                            </v-subheader>
                        </v-flex>
                    </v-layout>
                    <v-list-group popout v-else-if="item.children" v-model="item.meta.model" :key="item.meta.title" :append-icon="item.model ? item.meta.appendIcon : item.meta.appendIconAlt" :prepend-icon="item.meta.prependIcon">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.meta.title }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(child, i) in item.children" :key="i" @click="">
                        <router-link class="item-drawer-list" :to="child.path">
                                <v-list-tile-action v-if="child.meta.icon">
                                    <v-tooltip right>
                                        <v-icon 
                                        slot="activator">
                                        {{ child.meta.icon }}</v-icon>
                                        <span>{{ child.meta.title }}</span>
                                    </v-tooltip>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ child.meta.title }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                        </router-link>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.meta.title" @click="">
                        <router-link class="item-drawer-list" :to="item.path">
                        <v-list-tile-action>
                            <v-icon>{{ item.meta.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.meta.title}}
                            </v-list-tile-title>
                        </v-list-tile-content>
                        </router-link>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app clipped-left>
            <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
            <span class="title ml-3 mr-5">NEWTOMS&nbsp;<span class="font-weight-light">Proximity Marketing Agency (NPMA)</span></span>
            <!-- <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field> -->
            <v-spacer></v-spacer>
                <span class="mr-2"><b> User: </b>{{userInfo.usermane}}</span>
                <span class="mr-2"><b> Organization: </b>{{userInfo.organizationName}}</span>
                <span><b> Role: </b>{{userInfo.role}}</span>
            <v-btn flat @click="onSubmit">Log Out</v-btn>
        </v-toolbar>
    </div>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    mini: true,
    items: []
  }),
  computed: {
    userInfo () {
      return this.$store.state.user.info
    },
    routes () {
      return this.$store.state.user.availableRoutes
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('logOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
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
