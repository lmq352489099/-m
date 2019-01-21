<template>
  <div class="container">
    <div class="userinfo" @click="login">
      <img :src="userinfo.avatarUrl" alt>
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if="userinfo.openId" @click="scanBook" class="btn">添加图书</button>
    <button
      v-show="!userinfo.openId"
      open-type="getUserInfo"
      lang="zh_CN"
      class="btn"
      @getuserinfo="login"
    >点击登录</button>
  </div>
</template>

<script>
import YearProgress from "@/components/YearProgress.vue";
import { showSuccess, post, showModal } from "@/util";
import qcloud from "wafer2-client-sdk";
import config from "@/config.js";
// import { userInfo } from "os";
export default {
  data() {
    return {
      userinfo: {
        avatarUrl: "../../../static/img/unlogin.png",
        nickName: "点击登录"
      }
    };
  },
  components: {
    YearProgress
  },
  methods: {
    async addBook(isbn) {
      const res = await post("/weapp/addbook", {
        isbn,
        openid: this.userinfo.openId
      });
      console.log(res);
      showModal("添加成功", `${res.title}添加成功`);
      // if ((res.data = 0 && res.data.titile)) {
      //   showSuccess("添加成功", `${res.data.title}添加成功`);
      // }
    },
    scanBook() {
      wx.scanCode({
        success: res => {
          console.log(res);
          if (res.result) {
            this.addBook(res.result);
          }
        },
        fail: res => {
          showModal("添加失败", res.errMsg);
        }
      });
    },
    loginSuccess(res) {
      showSuccess("登录成功");
      wx.setStorageSync("userinfo", res);
      this.userinfo = res;
    },
    login() {
      wx.showToast({
        title: "登录中",
        icon: "loading"
      });
      qcloud.setLoginUrl(config.loginUrl);
      const session = qcloud.Session.get();
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            console.log("没过期的登录", res);
            this.loginSuccess(res);
          },
          fail: err => {
            console.error(err);
          }
        });
      } else {
        qcloud.login({
          success: res => {
            console.log("登录成功", res);
            // showSuccess("登录成功");
            this.loginSuccess(res);
            // wx.setStorageSync("userinfo", res);
          },
          fail: err => {
            console.error(err);
          }
        });
      }
    }
  },
  onShow() {
    wx.showShareMenu();
    let userinfo = wx.getStorageSync("userinfo");
    if (userinfo) {
      this.userinfo = userinfo;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 30rpx;
  text-align: center;
  .userinfo {
    img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
    }
    margin-top: 100rpx;
  }
}
</style>