<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea class="textare" v-model="comment" :maxlength="100" placeholder="请输入图书评论"></textarea>
      <div class="location">地理位置:
        <switch color="#EA5A49" :check="location" @change="getGeo"/>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">手机型号:
        <switch color="#EA5A49" :check="phone" @change="getPhone"/>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">未登录或者已经评论过啦</div>
    <button open-type="share" class="btn">转发给好友</button>
  </div>
</template>

<script>
import { get, post, showModal } from "@/util";
import BookInfo from "@/components/BookInfo";
import CommentList from "@/components/CommentList";
export default {
  components: {
    BookInfo,
    CommentList
  },
  data() {
    return {
      comments: [],
      userinfo: {},
      bookid: "",
      info: {},
      comment: "",
      location: "",
      phone: ""
    };
  },
  computed: {
    // 显示登录还是未登录
    showAdd() {
      if (!this.userinfo.openId) {
        console.log(1);
        return false;
      }
      // 评论页面里查到有自己的openid
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        console.log(2);

        return false;
      }
      console.log(3);
      return true;
    }
  },
  methods: {
    // 评论列表接口
    async getComments() {
      const comments = await get("/weapp/commentlist", { bookid: this.bookid });
      console.log(comments);
      this.comments = comments.list || [];
    },
    async addComment() {
      if (!this.comment) {
        return;
      }
      // 评论内容 手机型号 地理位置  图书id 用户的openid
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      };
      //  console.log(data);
      try {
        //
        //评论的时候用户的id也传过来
        //给评论页面使用
        //前提是要先登录才有页面id,
        //没传进入后台是空数组
        await post("/weapp/addcomment", data);
        this.comment = "";
        this.getComments();
      } catch (e) {
        console.log(123);

        showModal("失败", e.msg);
      }
    },
    async getDetail() {
      const info = await get("/weapp/bookdetail", { id: this.bookid });
      // 小程序页面
      wx.setNavigationBarTitle({
        title: info.title
      });
      this.info = info;
      // console.log(info);
    },

    getGeo(e) {
      if (e.target.value) {
        // ZbC4rmxqUVuSY07j9tOYtexb3bgWGRjK
        const ak = "ZbC4rmxqUVuSY07j9tOYtexb3bgWGRjK";
        let url = "http://api.map.baidu.com/geocoder/v2/";
        wx.getLocation({
          success: geo => {
            console.log(geo);
            wx.request({
              url,
              data: {
                location: `${geo.latitude},${geo.longitude}`,
                output: "json",
                ak
              },
              success: res => {
                // console.log(res);
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city;
                } else {
                  this.location = "未知低点";
                  console.log("出错了");
                }
              }
            });
          }
        });
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        console.log(phoneInfo);
        this.phone = phoneInfo.model;
      } else {
        // 没选中
        this.phone = "";
      }
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getDetail();
    this.getComments();
    const userinfo = wx.getStorageSync("userinfo");
    console.log({ 111: userinfo });

    if (userinfo) {
      this.userinfo = userinfo;
    }
  }
};
</script>

<style scoped lang="scss">
.comment {
  margin-top: 10px;
  .textare {
    width: 730rpx;
    height: 200rpx;
    background: #eee;
    padding: 10rpx;
  }
  .location {
    margin-top: 10px;
  }
  .phone {
    margin-top: 10px;
  }
}
</style>