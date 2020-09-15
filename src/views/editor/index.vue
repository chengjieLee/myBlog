<template>
  <div class="components-container">
    <div class="title-set-box">
      <el-form :model="headForm">
        <el-form-item label="文章标题" label-width="80px">
          <el-input v-model="headForm.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="editor-container">
      <el-alert :closable="false" type="success" />
      <markdown-editor
        ref="markdownEditor"
        v-model="content"
        :language="language"
        height="720px"
        @editChange="handleEditChange"
      />
    </div>
    <div class="edit-button">
      <el-button type="primary" icon="el-icon-edit-outline" @click="modifyEdit" v-if="isModify">修改</el-button>
      <el-button type="primary" icon="el-icon-edit-outline" @click="saveEdit" v-else>保存</el-button>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import { getEdited, saveEdited } from "@/utils/editSave";
import _axios from "@/utils/request";
import { getToken } from "@/utils/auth";
import "tui-editor/dist/tui-editor-contents.css";
import "tui-editor/dist/tui-editor.css";
import "codemirror/lib/codemirror.css";

const initContent = "";
const content = getEdited() || initContent;
export default {
  name: "Edit",
  components: { MarkdownEditor },
  data() {
    return {
      content,
      html: "",
      languageTypeList: {
        zh: "zh_CN"
      },
      isSave: true,
      headForm: {
        title: "",
        author: getToken()
      },
      isModify: false,
      blogId: null
    };
  },
  computed: {
    language() {
      return this.languageTypeList["zh"];
    }
  },
  methods: {
    handleClearInput() {
      this.headForm.title = "";
      this.headForm.author = "";
    },
    handleEditChange() {
      this.isSave = false;
    },
    setHtml(shouldSetHtml) {
      this.$refs.markdownEditor.setHtml(shouldSetHtml);
    },
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml();
    },
    saveEdit() {
      this.$confirm("是否保存此文档？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.saveArticle().then(result => {
            if (result.code === 0) {
              this.$message({
                type: "success",
                message: result.msg
              });
              this.content = "";
              this.headForm.title = "";
            } else {
              this.$message({
                type: "warning",
                message: result.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
      this.isSave = true;
      saveEdited("");
    },
    modifyEdit() {
      this.$confirm("是否修改此文档？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.modifyArticle().then(result => {
            if (result.code === 0) {
              this.$message({
                type: "success",
                message: result.msg
              });
              this.content = "";
              this.headForm.title = "";
            } else {
              this.$message({
                type: "warning",
                message: result.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
      this.isSave = true;
      saveEdited("");
    },
    saveArticle() {
      let params = {
        user: getToken(),
        blogContent: this.$refs.markdownEditor.getHtml(),
        blogTitle: this.headForm.title,
        blogAuthor: this.headForm.author
      };
      return _axios.post("/blog/add", params).then(res => {
        return res.data;
      });
    },
    modifyArticle() {
      if(!this.blogId ||!this.headForm.title) return;
      let params = {
        user: getToken(),
        blogContent: this.$refs.markdownEditor.getHtml(),
        blogTitle: this.headForm.title,
        blogAuthor: this.headForm.author,
        blogId: this.blogId
      };
      return _axios.post("/blog/modify", params).then(res => {
        return res.data;
      });
    },
    getArticleHtml(blogId) {
      _axios
        .get("/blog/detail", {
          params: {
            blogId
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let shouldSetHtml = res.data.data.blogContent;
            this.headForm.title = res.data.data.blogTitle;
            this.setHtml(shouldSetHtml);
          }
        });
    },
    async getBlogAuthor(blogId) {
      await _axios.get('/blog/permission', {
        params: {
          id: blogId
        }
      }).then(res => {
        if(res.data.code !== 0) {
          this.$router.push({
            path: '/401'
          })
        }
      })
    }
  },
  mounted() {
    const that = this;
    window.onunload = function() {
      // 保存页面
      if (!that.isSave) {
        saveEdited(that.content);
      }
    };
    const { blogId } = this.$route.query;
    if (blogId) {
      this.isModify = true;
      this.blogId = blogId;
      this.getBlogAuthor(blogId);
      this.getArticleHtml(blogId);
    } else {
      this.isModify = false;
      this.blogId = null
    }
  },
  beforeDestroy() {
    saveEdited("");
  }
};
</script>

<style scoped lang="scss">
.edit-button {
  text-align: right;
  padding-right: 92px;
  padding-top: 10px;
}
.title-set-box {
  margin-top: 12px;
  width: 600px;
  padding-left: 18px;
}
.editor-container {
  margin-bottom: 10px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
