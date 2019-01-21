
<script>
// import config from "./config";
// import { get } from "./util";
// import qcloud from "wafer2-client-sdk";
// import config from "./config.js";
export default {
  async created () {
    // wx.request({
    //   url: config.host + "/weapp/demo",
    //   success(res) {
    //     console.log(res.data);
    //   }
    // });

    // 设置登录地址
    // qcloud.setLoginUrl(config.loginUrl);

    // qcloud.login({
    //   success: function(userInfo) {
    //     console.log("登录成功", userInfo);
    //   },
    //   fail: function(err) {
    //     console.log("登录失败", err);
    //   }
    // });

    // const res = await get("/waapp/demo");
    // console.log(123, res);
    console.log('小程序启动了')
  }
}
</script>

<style >
.text-footer {
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.text-primary {
  color: #ea5149;
}
.page-title {
  padding: 20px;
  background: #eee;
  line-height: 40px;
  font-size: 20px;
}
.btn {
  color: white;
  background: #ea5a49;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
.right {
  float: right;
}
.btn:active {
  background: #321321;
}
</style>