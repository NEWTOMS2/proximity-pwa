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
          <v-toolbar card color="green accent-3">
            <v-spacer></v-spacer>
            <v-toolbar-title>Keep in touch</v-toolbar-title>
          </v-toolbar>
            <v-layout justify-center column fill-height>
            <img src="@/assets/Newtoms.png" alt="" srcset="" style="width: 75%; margin: auto;">
                <div style="text-align: center;" v-if="reachedSucces">
                    <h1>
                        Thank you!!
                    </h1>
                    <p>
                        will be in touch as soon as we can, have a nice day.
                    </p>
                </div>
                <v-form class="form-format" ref="form" v-model="valid" lazy-validation>
                    <v-text-field 
                    v-if="!reachedSucces"
                    v-model="targetUser.name"
                    :rules="nameRules"
                    label="Fullname"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-if="!reachedSucces"
                    v-model="targetUser.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-if="!reachedSucces"
                    mask="phone"
                    v-model="targetUser.phone"
                    :rules="phoneRules"
                    label="Phone Number"
                    required
                    ></v-text-field>
                    <v-layout class="flex">
                        <v-btn
                        v-if="!reachedSucces"
                        class="is-flex"
                        :disabled="!valid"
                        @click="gatherTargetInfo"
                        >
                        submit
                        </v-btn>
                        <v-btn 
                        class="is-flex"
                        @click.native="optin = false"
                        >
                        Back
                        </v-btn>
                    </v-layout>
                </v-form>
            </v-layout>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-card>
</template>

<script>
import { fetchContentCardMedia } from '@/api/content_cards'
import { registerTargetReached } from '@/api/users'
export default
{
  data: () => ({
    card: {},
    reachedSucces: false,
    valid: true,
    optin: false,
    targetUser: {
      name: '',
      email: '',
      phone: ''
    },
    email: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    phoneRules: [
      v => !!v || 'Phone is required',
      v => (v && v.length === 10) || 'Enter a correct phone number'
    ]
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
    gatherTargetInfo () {
      if (this.$refs.form.validate()) {
        this.targetUser.id = '00:1B:44:11:3A:B7'
        this.targetUser.idOrganization = this.$route.params.idOrganization
        this.targetUser.idContentCard = this.$route.params.id
        console.log(this.targetUser)
        registerTargetReached(this.targetUser).then(response => {
          this.reachedSucces = response.data.status
        })
      }
    },
    redirect (href) {
      if (href === 'OPTIN') {
        this.optin = true
      } else {
        window.location = href
      }
    },
    clear () {
      this.targetUser = {name: '', email: '', phone: ''}
    }
  }
}
</script>

<style>
.form-format {
    width: 75vw;
    margin: auto;
    height: 50vh;
}
.card-actions {
    flex-flow: column;
    display: flex;    
}
</style>
