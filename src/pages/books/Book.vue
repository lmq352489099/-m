<template>
  <div>
    <TopSwiper :tops="tops"></TopSwiper>
    <Card :key="book.id" v-for="book in books" :book="book"></Card>
    <p class="text-footer" v-if="!more">---小傻瓜,我可是有底线的哦---</p>
  </div>
</template>

<script>
// 35调数据
// 每次加载10条
// 0页 0-10
// 1  10 -20
// 2  2 - 30
// 3    30-40

// 没有更多数据
// 1.page=0 不能显示这条提醒
// 2.page>0 数据长度<10 停止触底加载
import { get } from '@/util.js'
import Card from '@/components/Card.vue'
import TopSwiper from '@/components/TopSwiper.vue'
export default {
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      // wx.startPullDownRefresh()
      const books = await get('/weapp/booklist', { page: this.page })
      // this.books = books.list;

      if (books.list.length < 5 && this.page > 0) {
        this.more = false
        console.log(this.more)
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        // 上啦加载,并不能直接覆盖books,而是累加
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },

  onReachBottom () {
    if (!this.more) {
      // 没有更多了
      return false
    }
    this.page = this.page + 1
    this.getList(false)
  },
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
    console.log('下拉')
  },
  // onShow() {
  //   this.getList();
  // },
  mounted () {
    this.getList(true)
    this.getTop()
  }
}
</script>

<style lang="scss">
.text-footer {
  text-align: center;
  font-size: 16px;
  margin-bottom: 5px;
}
</style>