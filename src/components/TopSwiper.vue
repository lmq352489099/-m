<template>
  <div class="swiper">
    <swiper
      :indicator-dots="true"
      indicator-color="#f40"
      :autoplay="true"
      :interval="6000"
      :duration="1000"
      :circular="true"
    >
      <div :key="imgindex" v-for="(top,imgindex) in imgUrls">
        <swiper-item>
          <img
            @click="booksDetail(img)"
            :key="img.id"
            :src="img.image"
            mode="aspectFit"
            class="slide-image"
            v-for="img in top"
          >
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      //   如果通用chunk函数 比如lodash的chunk方法
      let res = this.tops
      // ;轮播切片
      // var aa = [res.slice(0, 3), res.slice(3, 6), res.slice(0, 3)]
      // console.log(aa);
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6, 9)]
    }
  },
  methods: {
    booksDetail (item) {
      console.log(item)
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  },
  mounted () {
    // console.log(this.imgUrls());
  }
}
</script>

<style scoped lang='scss'>
.swiper {
  margin-top: 5px;
  .slide-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>
