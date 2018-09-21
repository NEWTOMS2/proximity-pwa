<template>
    <div class="drawer">
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
            <v-list>
                <template v-for="item in routes">
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
                                <v-icon>{{ child.meta.icon }}</v-icon>
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
        <v-toolbar app absolute clipped-left>
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
    items: []
  }),
  mounted () {
    this.configRoutes()
  },
  created () {
    // this.configRoutes()
  },
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
