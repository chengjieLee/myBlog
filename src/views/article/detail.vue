<template>
  <div class="detail-wrapper ">
    <header class="article-header">
      <h1 class="article-title">{{articleTitle}}</h1>
      <p class="article-author">{{author}}</p>
    </header>
    <div class="article-content tui-editor-contents" v-html="articleContent" ></div>
  </div>
</template>


<script>
import _axios from '@/utils/request';
import 'tui-editor/dist/tui-editor-contents.css';

export default {
  name: "ArticleDetail",
  data() {
    return {
      articleContent: "",
      articleTitle: "",
      author: "",
      createTime: ""
    };
  },
  created() {
    const { blogid } = this.$route.query;
    this.getRenderDetailContent(blogid);
  },
  methods: {
    getRenderDetailContent(blogId) {
      _axios
        .get("/blog/detail", { params: { blogId: blogId } })
        .then(res => {
          if(res.data.code ===0){
            this.articleContent = res.data.data.blogContent;
            this.articleTitle = res.data.data.blogTitle;
            this.author = res.data.data.author;
            this.createTime = res.data.data.createTime
          }else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            })
          }
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.detail-wrapper {
  background: #f4f5f5;
  min-height: 90vh;
  text-align: center;
  .article-header {
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
    margin-top: 22px;
    width: 80%;
    text-align: center;
    .article-title {
      margin: 16px 0 0;
      color:#222;
      letter-spacing: 4px;
    }
    .article-author {
      margin-right: 18px;
      text-align: right;
      font-size: 14px;
      color: #444;
    }
  }
  .article-content {
    box-sizing: border-box;
    padding: 10px;
    text-align: left;
    display: inline-block;
    width: 80%;
    background: #fff;
    img {
      width: 80%;
    }
  }
}
</style>

<style lang="scss">
  .article-content {
    img {
      width: 100%;
    }
  }
  
</style>