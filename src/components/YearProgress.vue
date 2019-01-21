<template>
  <div class="progressbar">
    <progress :percent="percent" active="true" activeColor="green"/>
    <p>{{year}}已结过去了{{days}}天,{{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    isLeapYear() {
      const year = new Date().getFullYear();
      if (year % 400 === 0) {
        return true;
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true;
      } else {
        return false;
      }
    },
    getDayOfYead() {
      return this.isLeapYear() ? 366 : 365;
    }
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    days() {
      let start = new Date();
      start.setMonth(0);
      start.setDate(1);
      // start 就是今年第一天
      let offset = new Date().getTime() - start.getTime();
      // 时间单位换算
      return parseInt(offset / 1000 / 60 / 60 / 24 + 1);
    },
    percent() {
      return (this.days * 100 / this.getDayOfYead()).toFixed(1);
    }
  }
};
</script>

<style scoped lang="scss">
.progressbar {
  margin-top: 10px;
  margin-bottom: 40px;
  width: 100%;
  progress {
    margin-bottom: 10px;
  }
}
</style>