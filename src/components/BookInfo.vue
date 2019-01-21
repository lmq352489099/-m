<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class="back" :src="info.image" mode="aspectFill">
      <img :src="info.image" class="img" mode="aspectFit" alt>
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img class="avatar" :src="userinfo.image" mode="aspectFit" alt>
      {{userinfo.name}}
      <div class="right text-primary">
        {{info.rate}}分
        <Rate :value="info.rate"></Rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">{{info.price}}</div>
    </div>
    <div class="tags">
      <div class="badge" :key="tag" v-for="tag in info.tags">{{tag}}</div>
    </div>
    <div class="summary">
      <p :key="i" v-for="(sum, i) in info.summary">{{sum}}</p>
    </div>
  </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['info'],
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  },
  components: {
    Rate
  }
}
</script>

<style scoped lang='scss'>
.bookinfo {
  .badge {
    display: inline-block;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ea5a49;
    color: #ea5a49;
  }
  .summary {
    margin-top: 10px;
    padding: 0 15px;
    p {
      text-indent: 2em;
      font-size: 14px;
    }
  }
  //   color: #f40;
  font-size: 14px;
  .right {
    float: right;
  }
  .detail {
    padding: 5px 10px;
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
  }

  .back {
    filter: blur(15px);
    width: 100%;
  }
  .img {
    position: absolute;
    width: 100%;
    height: 300rpx;
    left: 0;
    top: 30rpx;
  }
  .info {
    color: #f40;
    position: absolute;
    width: 100%;
    left: 0;
    top: 330rpx;
    text-align: center;
  }
  .author {
    font-size: 14px;
  }
}
</style>