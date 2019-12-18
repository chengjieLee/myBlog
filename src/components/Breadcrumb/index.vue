<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
    <div class="count-down">
      <span>距离12-25号下午1点30抢票还剩</span>
      <span>{{countDown}}</span>
    </div>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null,
      countDown: '',
      timer: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    computeCountDown() {
      let targetTime = new Date('2019-12-25 13:30:00').valueOf();
      let nowTime = new Date().valueOf();
      let centerTime = targetTime - nowTime;
      let day = Math.floor(centerTime / 86400000);
      let hours = Math.floor((centerTime % 86400000) / 3600000);
      let minute = Math.floor((centerTime % 3600000)/60000)
      this.countDown = String(day) + '天' + String(hours) + '小时' + minute + '分';
    },
  },
  mounted() {
    const that = this;
    that.computeCountDown();
    this.timer = setInterval(that.computeCountDown, 60000)
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.count-down {
  white-space: nowrap;
  color: #f44660;
}
</style>
