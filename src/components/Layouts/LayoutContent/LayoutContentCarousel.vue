  <el-carousel indicator-position="inside">
    <el-carousel-item v-for="image in carouselImages" :key="image.index">
        <img style="height: 100%" :src="image.imgSrc" alt="" srcset="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data: () => ({
    carouselImages: [
      {imgSrc: require('@/assets/B.png')},
      {imgSrc: require('@/assets/O.png')},
      {imgSrc: require('@/assets/P.png')},
      {imgSrc: require('@/assets/G.png')}
    ]
  }),
  created () {
    // this.getImagePlaceholder()
  }
}
</script>
<style>
  .el-carousel {
    height: 100%;
  }
  .el-carousel__container {
    height: 100%;
  }
  .el-carousel__item {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    margin: 0;
  }
</style>