<template>
        <el-row class="flex is-flex">
            <el-col :span="12">
                <div class="section-card-content">
                    <h2>Content Card Form</h2>
                    <el-form ref="form" :model="card" label-position="top">
                        <el-form-item label="Card Name">
                            <el-input placeholder="Name" v-model="card.title"></el-input>
                        </el-form-item>
                        <el-form-item label="Card Content Image">
                            <el-input placeholder="Base Image Url" v-model="card.imgUrl"></el-input>
                        </el-form-item>
                        <el-form-item label="Card Content">
                            <wysiwyg v-model="card.content" />
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="section-card-content">
                    <h2>Content Card Preview</h2>
                    <h4 v-bind:class="[card.title === '' ? 'emptyClass emptyCardName' : '']">{{ card.title }}</h4>
                    <el-card class="card-previewed" :body-style="{ padding: '0px' }">
                        <img :src="card.imgUrl" class="image">
                        <div style="padding: 14px;">
                            <div  v-bind:class="[card.content === '' ? 'emptyClass emptyCardContent' : '']" v-html="card.content"></div>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button">Operating button</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
</template>

<script>
export default {
  data: () => ({
    input: '',
    card: {
      title: '',
      imgUrl: 'https://via.placeholder.com/600x400',
      content: ''
    }
  }),
  watch: {
    'card.imgUrl' (value) {
      if (value === '') {
        this.card = 'https://via.placeholder.com/600x400'
      } else {
        this.card.imgUrl = value
      }
    }
  }
}
</script>

<style>
.card-previewed {
  max-width: 600px;
  margin: auto;
}
.section-card-content{
  padding: 1rem;
}
.emptyClass:before {
  font-style: italic;
  color: rgb(212, 212, 212);
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
</style>
