<template>
    <div class="container flex full-height">
        <v-layout row wrap>
            <v-flex xs7>
                <v-form v-model="valid" class="full-width">
                    <v-select :loading="isFetching" :disabled="isFetching" :items="contentCards" item-text="name" item-value="id" v-model="contentCard" label="Content Card"></v-select>
                    <v-text-field v-model="card.title" label="Card Name" required></v-text-field>
                    <v-checkbox label="Enable/Disable Card Content Image" v-model="card.showCardImage" hide-details class="shrink mr-2"></v-checkbox>
                    <v-layout>
                        <v-flex xs10>
                            <v-text-field v-if="card.imageSourceType === 'Url'" :rules="imageUrlRule" v-model="card.imgUrl" label="Card Content Image" required @click:append="upload()"></v-text-field>
                            <v-text-field v-if="card.imageSourceType === 'File'" label="Select Image" @click='pickFile' v-model='imageFile.imageName ' prepend-icon='attach_file'></v-text-field>
					<input
                        v-if="card.imageSourceType === 'File'"
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
                        </v-flex>
                        <v-flex xs2>
                            <v-select :items="mediaImageSources" v-model="card.imageSourceType" label="From" class="px-2"></v-select>
                        </v-flex>
                    </v-layout>
                    <v-btn @click="changeImageSize(400)" class="content-sizes" :style="`background: url(${card.imgUrl === '' ? card.imgDefaultUrl : card.imgUrl}`">
                        400px
                    </v-btn>
                    <v-btn @click="changeImageSize(600)" class="content-sizes" :style="`background: url(${card.imgUrl === '' ? card.imgDefaultUrl : card.imgUrl}`">600px</v-btn>
                    <v-checkbox label="Enable/Disable Card Content" v-model="card.showCardContent" hide-details class="shrink mr-2 mb-3"></v-checkbox>
                    <wysiwyg v-model="card.htmlContent" />
                    <v-layout align-center>
                        <v-checkbox label="Enable/Disable Card Actions" v-model="card.showCardActions" hide-details class="shrink mr-2"></v-checkbox>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="card.actions.buttons.length === 3" flat @click="addMoreActions()">Add Another</v-btn>
                        <v-btn :disabled="card.actions.buttons.length <= 1" flat @click="removeActions()">Remove Last</v-btn>
                    </v-layout>
                    <v-layout v-for="(item, index) in card.actions.buttons" :key="index">
                        <v-flex xs5>
                            <v-text-field v-model="item.actionLabel" label="Card Name" required class="px-2"></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-if="item.actionType === 'Url'" v-model="item.contentUrl" :label="typeAction" required></v-text-field>
                            <v-select v-else :items="Forms" item-text="name" item-value="id" v-model="item.contentUrl" :label="item.actionType" class="px-2"></v-select>
                        </v-flex>
                        <v-flex xs2>
                            <v-select :items="buttonActionType" v-model="item.actionType" label="Type" class="px-2"></v-select>
                        </v-flex>
                    </v-layout>
                    <v-checkbox label="Show/Checkbox Whatsapp Notification" v-model="card.actions.showCheckBoxWhatsappNotification" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                    <v-checkbox label="Show/Checkbox App Notification" v-model="card.actions.showCheckBoxAppNotification" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                    <v-layout>
                        <v-btn large  @click="updateContentCard()">Save</v-btn>
                        <v-btn large  @click="updateContentCard()">Reset</v-btn>
                    </v-layout>
                </v-form>
            </v-flex>
            <v-flex xs5>
                <div class="section-card-content is-flex">
                    <h4 class="card-title" v-bind:class="[card.title === '' ? 'emptyClass emptyCardName' : '']">{{ card.title }}</h4>
                    <div class="device-wrapper">
                        <div class="device" data-device="Pixel" data-orientation="portrait" data-color="black">
                            <div class="screen">
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
                                            <v-layout row class="pb-2">
                                                <div v-for="item in card.actions.buttons" :key="item">
                                                    <v-btn small round>{{ item.actionLabel }}</v-btn>
                                                </div>
                                            </v-layout>
                                            <v-layout justify-end row>
                                                <transition name="bounce">
                                                    <v-checkbox v-if="card.actions.showCheckBoxWhatsappNotification" label="Whatsapp Notfication" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                                </transition>
                                                <transition name="bounce">
                                                    <v-checkbox v-if="card.actions.showCheckBoxAppNotification" label="App Notification" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                                                </transition>
                                            </v-layout>
                                        </v-card-actions>
                                    </transition>
                                </v-card>
                            </div>
                        </div>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import { updateContentCard, fetchAllContentCards, fetchContentCardById } from '@/api/content_cards'
export default {
  data: () => ({
    isFetching: false,
    templateClass: 'base',
    input: '',
    isActionEnable: false,
    isRemoveActionVisible: false,
    message: {
      show: false,
      text: ''
    },
    imageFile: {
      imageName: '',
      imageUrl: '',
      imageFile: ''
    },
    card: {
      title: '',
      imgUrl: '',
      showCardImage: true,
      imgDefaultUrl: require('@/assets/card_default_bg.png'),
      imageSize: '400px',
      imageSourceType: 'Url',
      htmlContent: '',
      showCardContent: true,
      showCardActions: true,
      actions: {
        buttons: [
          {
            actionLabel: 'Action',
            contentUrl: '',
            actionType: 'Url'
          }
        ],
        showCheckBoxWhatsappNotification: true,
        showCheckBoxAppNotification: true
      }
    },
    valid: true,
    titleRule: [
      v => !!v || 'The card must have a title'
    ],
    imageUrlRule: [
      v => !!v || 'The card must have a cover image',
      v => /(http(s?):)([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png)/.test(v) || 'the url must have containt and image'
    ],
    actionText: [
      v => !!v || 'The action must have a description'
    ],
    actionUrl: [
      v => !!v || 'The action must have a url'
    ],
    actionForm: [
      v => !!v || 'Select a form'
    ],
    contentCard: '',
    contentCards: [],
    buttonActionType: ['Url', 'Form'],
    typeAction: 'Url',
    Forms: [{id: 'OPTIN', name: 'Poll - Opt in'}],
    mediaImageSources: ['Url', 'File']

  }),
  watch: {
    'card.imgUrl' (value) {
      if (value === '') {
        this.card.imgDefaultUrl = require('@/assets/card_default_bg.png')
      } else {
        this.card.imgUrl = value
        this.card.imgDefaultUrl = ''
      }
    },
    'card.imageSourceType' (value) {
      console.log(value)
    },
    contentCard (value) {
      fetchContentCardById(value).then(response => {
        this.card = response.data
      })
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.isFetching = true
      fetchAllContentCards().then(response => {
        this.contentCards = response.data
        this.isFetching = false
      })
    },
    changeImageSize (sizes) {
      this.card.imageSize = `${sizes}px`
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      console.log(files)
      if (files[0] !== undefined) {
        this.imageFile.imageName = files[0].name
        if (this.imageFile.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          console.log(fr.result)
          this.card.imgUrl = fr.result
          this.imageFile.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.card.imgUrl = ''
        this.imageFile.imageFile = ''
        this.imageFile.imageUrl = ''
      }
    },
    toggle (which) {
      switch (which) {
        case 'Image':
          this.card.showCardImage = !this.card.showCardImage
          break
      }
    },
    addMoreActions () {
      if (this.card.actions.hasOwnProperty('buttons')) {
        if (this.card.actions.buttons.length < 3) {
          this.isRemoveActionVisible = true
          var actionButtonTemplate = {
            actionLabel: 'Action',
            contentUrl: '',
            actionType: 'Url'
          }
          this.card.actions.buttons.push(actionButtonTemplate)
        } else {
          this.isActionEnable = !this.isActionEnable
        }
      }
    },
    updateContentCard () {
      updateContentCard(this.card.idCard, this.card).then(response => {
        console.log(response)
      })
    },
    removeActions () {
      this.card.actions.buttons.pop()
    }
  }
}
</script>

<style>

.card {
    display: flex;
    flex-flow: column;
}

.card-image {
    flex: 3 1 60%;
}

.card-content {
    flex: 1 1 40%;
}

.card-actions {
    flex-flow: column;
    display: flex;    
}

.card-actions .v-input--selection-controls.v-input .v-label {
    font-size: 0.9rem;
}

.full-height {
    min-height: 100%;
    max-height: 100%;
}

.full-width {
    min-width: 100%;
}
.content-card {
    min-height: 100vh;
}

.card-previewed {
    max-width: 598px;
    margin: auto;
}

.content-sizes {
    padding: 3rem!important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    margin-top: 1rem!important;
}
.content-sizes .v-btn__content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    background: #fff;
}

.top-check {
    position: absolute!important;
    top: -50px;
    right: 0;
}

.section-card-content {
    padding: 1rem;
}

.emptyClass:before {
    font-style: italic;
    color: rgb(212, 212, 212);
}

.image {
    cursor: pointer;
    width: 100%;
    -webkit-transition: all .5s;
    /* Safari */
}
.image .v-card__media__background {
    background-size: cover!important;
}
.card-title {
    text-align: center;
    font-size: 1.5rem;
}

.phone {
    background: url("~/assets/O.png")
}

.emptyCardContent:before {
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda unde vero optio dicta ab? Blanditiis corporis nemo aspernatur ipsa, nihil quasi officia quas? Labore eos veniam cum numquam impedit, dolor alias ipsa praesentium. ...";
}

.emptyCardName:before {
    content: "Card Name";
}

.section-card-content .el-card__body {
    display: flex;
    flex-flow: column;
}

.smooth-away {
    transition: height .2s;
}

.bounce-enter-active {
  animation: bounce-in .8s;
}
.bounce-leave-active {
  animation: bounce-in .8s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.device-wrapper {
    max-width: 400px!important;
    width: 100%;
    margin: 0 auto;
}
.screen {
   
}
</style>
