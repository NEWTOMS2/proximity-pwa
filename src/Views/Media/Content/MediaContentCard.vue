<template>
    <v-card class="full-height card">
        <transition name="bounce">
            <v-card-media v-if="card.showCardImage" class="image" :contain="true" :height="card.imageSize" :src="card.imgUrl === '' ? card.imgDefaultUrl : card.imgUrl" />
        </transition>
        <transition name="bounce">
            <v-card-text class="card-content" v-if="card.showCardContent">
                <div v-bind:class="[card.htmlContent === '' ? `emptyClass emptyCardContent ${templateClass}` : `${templateClass}`]" v-html="card.htmlContent"></div>
            </v-card-text>
        </transition>
        <transition name="bounce">
            <v-card-actions class="card-actions" v-if="card.showCardActions">
                <v-layout row>
                    <div v-for="item in card.actions.buttons" :key="item">
                        <v-layout class="px-3">
                            <v-btn small round @click="redirect(item.contentUrl)">
                                {{ item.actionLabel }}
                            </v-btn>
                        </v-layout>
                    </div>
                </v-layout>
                <v-layout row v-if="card.actions.showCheckBoxWhatsappNotification === true && card.actions.showCheckBoxAppNotification === true">
                    <transition name="bounce">
                        <v-checkbox height="20" v-if="card.actions.showCheckBoxWhatsappNotification" label="Whatsapp Notfication" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                    </transition>
                    <transition name="bounce">
                        <v-checkbox height="20" v-if="card.actions.showCheckBoxAppNotification" label="App Notification" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                    </transition>
                </v-layout>
            </v-card-actions>
        </transition>
        <v-dialog
        v-model="optin"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="optin = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="optin = false">Save</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-card-text>
            <v-btn color="primary" dark @click="dialog2 = !dialog2">Open Dialog 2</v-btn>
            <v-tooltip right>
              <v-btn slot="activator">Tool Tip Activator</v-btn>
              Tool Tip
            </v-tooltip>
            <v-list three-line subheader>
              <v-subheader>User Controls</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Content filtering</v-list-tile-title>
                  <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Password</v-list-tile-title>
                  <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="notifications"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Notifications</v-list-tile-title>
                  <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="sound"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Sound</v-list-tile-title>
                  <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="widgets"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                  <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-card>
</template>

<script>
import { fetchContentCardMedia } from '@/api/content_cards'
export default
{
  data: () => ({
    card: {},
    optin: false
  }),
  created () {
    this.fecthData()
    console.log(this.$route.params.id)
    console.log(this.$route.params.idOrganization)
  },
  methods: {
    fecthData () {
      fetchContentCardMedia(this.$route.params.idOrganization, this.$route.params.id).then(response => {
        this.card = response.data
      })
    },
    redirect (href) {
      if (href === 'OPTIN') {
        this.optin = true
      } else {
        window.location = href
      }
    }
  }
}
</script>

<style>
.card-actions {
    flex-flow: column;
    display: flex;    
}
</style>
