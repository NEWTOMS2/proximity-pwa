<template>
    <div class="content-card flex is-flex">
        <el-row class="flex is-flex">
            <el-col :span="12" class="flex is-flex">
                <div class="section-card-content is-flex">
                    <h2>Content Card Form</h2>
                    <el-form ref="form" :model="card" label-position="top">
                        <el-form-item label="Card Name">
                            <el-input placeholder="Name" v-model="card.title"></el-input>
                        </el-form-item>
                        <el-form-item label="Card Content Image">
                            <el-checkbox class="top-check" v-model="showCardImage">Show</el-checkbox>
                            <el-input placeholder="Image Url" v-model="card.imgUrl"></el-input>
                            <div class="image-sizes-control">
                                <el-button type="text" class="button content-sizes" @click="changeImageSize(400)" :style="`background: url(${card.imgUrl === '' ? card.imgDefaultUrl : card.imgUrl})`">400px</el-button>
                                <el-button type="text" class="button content-sizes" @click="changeImageSize(600)" :style="`background: url(${card.imgUrl === '' ? card.imgDefaultUrl : card.imgUrl})`">600px</el-button>
                            </div>
                        </el-form-item>
                        <el-form-item label="Card Content">
                            <el-checkbox class="top-check" v-model="showCardContent">Show</el-checkbox>
                            <wysiwyg v-model="card.content" />
                        </el-form-item>
                        <el-form-item label="Card Actions">
                            <el-checkbox class="top-check" v-model="showCardActions">Show</el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="12" class="flex is-flex">
                <div class="section-card-content is-flex">
                    <h2>Content Card Preview</h2>
                    <h4 class="card-title" v-bind:class="[card.title === '' ? 'emptyClass emptyCardName' : '']">{{ card.title }}</h4>
                    <transition name="bounce">
                    <el-card class="card-previewed smooth-away" :body-style="{ padding: '0px' }">
                        <transition name="bounce">
                            <img v-if="showCardImage" :src="card.imgUrl === '' ? card.imgDefaultUrl : card.imgUrl" class="image smooth-away" :style="`height: ${card.imageSizes}`">
                        </transition>
                        <div style="padding: 14px;">
                            <transition name="bounce">
                                <div v-if="showCardContent" v-bind:class="[card.content === '' ? 'emptyClass emptyCardContent' : '']" v-html="card.content"></div>
                            </transition>
                            <transition name="bounce">
                                <div class="bottom clearfix" v-if="showCardActions">
                                    <el-button type="text" class="button">Operating button</el-button>
                                </div>
                            </transition>
                        </div>
                    </el-card>
                    </transition>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data: () => ({
    showCardImage: true,
    showCardContent: true,
    showCardActions: true,
    input: '',
    card: {
      title: '',
      imgUrl: '',
      imgDefaultUrl: require('@/assets/card_default_bg.png'),
      imageSizes: '400px',
      content: ''
    }
  }),
  watch: {
    'card.imgUrl' (value) {
      if (value === '') {
        this.card.imgDefaultUrl = require('@/assets/card_default_bg.png')
      } else {
        this.card.imgUrl = value
        this.card.imgDefaultUrl = ''
      }
    }
  },
  methods: {
    changeImageSize (sizes) {
      this.card.imageSizes = `${sizes}px`
    }
  }
}
</script>

<style>
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

.card-title {
    text-align: center;
    font-size: 1.5rem;
}

.emptyCardContent:before {
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate omnis eligendi odio mollitia explicabo veritatis nihil, voluptatem quidem fugiat dignissimos, rerum eius earum alias inventore assumenda unde vero optio dicta ab? Blanditiis corporis nemo aspernatur ipsa, nihil quasi officia quas? Labore eos veniam cum numquam impedit, dolor alias ipsa praesentium. ...";
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
</style>
