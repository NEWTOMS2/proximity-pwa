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
                <v-layout>
                    <div v-for="item in card.actions.buttons" :key="item">
                        <a :href="item.contentUrl">{{ item.actionLabel }}</a>
                        <!-- <v-btn flat>{{ item.actionLabel }}</v-btn> -->
                    </div>
                </v-layout>
                <v-layout>
                    <transition name="bounce">
                        <v-checkbox height="20" v-if="card.actions.showCheckBoxWhatsappNotification" label="Whatsapp Notfication" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                    </transition>
                    <transition name="bounce">
                        <v-checkbox height="20" v-if="card.actions.showCheckBoxAppNotification" label="App Notification" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                    </transition>
                </v-layout>
            </v-card-actions>
        </transition>
    </v-card>
</template>

<script>
import { fetchContentCardMedia } from '@/api/content_cards'
export default
{
  data: () => ({
    card: {}
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
    }
  }
}
</script>

<style>

</style>
