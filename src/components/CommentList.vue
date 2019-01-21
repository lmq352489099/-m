<template>
  <div class="comment-list">
    <div class="page-titile" v-if="comments.length">评论</div>
    <div
      @click="handleClick(comment)"
      class="comment"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="user">
        <div class="inline">
          <img :src="comment.image" class="avatar" mode="aspectFit">
          {{comment.title}}
        </div>
        <div class="right">
          {{comment.location || '未知地点'}}
          <span class="text-primary">--</span>
          {{comment.phone || '未知型号'}}
        </div>
      </div>
      <div class="content">{{comment.comment}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comments", "type"],

  methods: {
    handleClick(comment) {
      if (this.type === "user")
        wx.navigateTo({
          url: "/pages/detail/main?id=" + comment.id
        });
    }
  }
};
</script>

<style scoped lang='scss'>
.comment-list {
  background: #eee;
  font-size: 14px;
  .comment {
    background: white;
    margin-bottom: 10px;
    padding: 5px 20px;
    .user {
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .inline {
        display: inline;
      }
    }
  }
}
</style>