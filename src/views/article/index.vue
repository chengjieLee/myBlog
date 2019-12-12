<template>
  <div class="article-wrapper">
    <el-menu :default-active="activeIndex" class="nav-classify" mode="horizontal">
      <el-menu-item index="1" @click="sortFilter('popular')">全部</el-menu-item>
      <el-menu-item index="2" @click="sortFilter('newest')">最新</el-menu-item>
    </el-menu>
    <section class="article-list">
      <div class="article-item" v-for="blog of articleList" :key="blog.blogId">
        <div class="info-row meta-list">
          <span class="meta-author">{{blog.author}}</span>
          <span class="meta-time">{{blog.createTime}}</span>
        </div>
        <div class="info-row title-row">
          <router-link :to=" '/article/detail?blogid='+blog.blogId ">{{blog.blogTitle}}</router-link>
        </div>
        <div class="info-row button-row">
          <el-button class="row-button" icon="el-icon-star-off">0</el-button>
          <el-button class="row-button" icon="el-icon-chat-line-square">0</el-button>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import _axios from '@/utils/request';

export default {
  name: "ArticleList",
  data() {
    return {
      activeIndex: "1",
      articleList: [],
    };
  },
  methods: {
    getArticleList() {
      _axios.get("/blog/list").then(res => {
        this.articleList = res.data.data;
      });
    },
    sortFilter(type) {
      console.log('search')
    }
  },
  created() {
    this.getArticleList();
  }
};
</script>


<style lang="scss">
.nav-classify {
  .el-menu-item {
    border-bottom: none!important;
    &.is-active {
      color: #007fff!important;
    }
    &:not(.is-disabled):hover {
      color: #007fff;
    }
  }
  .el-button+.el-button{
    margin-left: 0px;
  }
}

</style>
<style lang='scss' scoped>
.article-wrapper {
  padding: 30px;
  .article-list {
    width:100%;
    .article-item {
      padding:20px;
      height: 120px;
      border-bottom: solid 1px #e6e6e6;
      .meta-list {
        color: #909090;
        font-size:12px;
        cursor: pointer;
        .meta-author {
          &:after {
            content: "·";
            margin: 0 0 0 .4em;
            color: #b2bac2;
          }
        }
      }
      .title-row {
        font-size: 18px;
        font-weight: 700;
        height: 46px;
        line-height: 46px;
        max-width:620px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .button-row {
        .row-button {
          padding: 6px 14px;
          border-radius: 2px
        }
      }
    }
  }
}
</style>