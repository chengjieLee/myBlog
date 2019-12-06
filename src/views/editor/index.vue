<template>
  <div class="components-container">
    <div class="edit-button">
      <el-button style="margin-top:0px;" icon="el-icon-edit" @click="showHeaderConfig">编辑Title</el-button>
      <el-button
        style="margin-top:0px;"
        type="primary"
        icon="el-icon-edit-outline"
        @click="saveEdit"
      >保存</el-button>
      <el-dialog title="标题设置" :visible.sync="showHeader">
        <el-form :model="headForm">
          <el-form-item label="文章标题" label-width="80px">
            <el-input v-model="headForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者" :label-width="'80px'">
            <el-input v-model="headForm.author" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClearInput">重 置</el-button>
          <el-button type="primary" @click="showHeader = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="editor-container">
      <el-alert :closable="false" type="success" />
      <markdown-editor
        ref="markdownEditor"
        v-model="content"
        :language="language"
        height="700px"
        @editChange="handleEditChange"
      />
    </div>

    <el-button
      style="margin-top:0px;margin-left:12px"
      type="primary"
      icon="el-icon-document"
      @click="getHtml"
    >HTML 预览</el-button>
    <div v-html="html" />
  </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import { getEdited, saveEdited } from "@/utils/editSave";
import _axios from "axios";
import { getToken } from "@/utils/auth";

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
      showHeader: false,
      headForm: {
        title: "",
        author: ""
      }
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
    showHeaderConfig() {
      this.showHeader = !this.showHeader;
    },
    handleEditChange() {
      this.isSave = false;
    },
    getHtml() {
      // _axios.get("/dev-api/blog", { params: { user: "xukai" } }).then(res => {
      //   this.html = res.data.data[1].blogContent;
      // });
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
              this.content = '';
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
    saveArticle() {
      let params = {
        user: getToken(),
        blogContent: this.$refs.markdownEditor.getHtml(),
        blogTitle: this.headForm.title,
        blogAuthor: this.headForm.author
      };
      return _axios.post("/dev-api/blog/add", params).then(res => {
        return res.data;
      });
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
  },
  beforeDestroy() {
    // if (!this.isSave) {
    //   const shouldSave = confirm("是否保存内容");
    //   shouldSave ? this.saveEdit() : null;
    // }
  }
};
</script>

<style scoped>
.edit-button {
  background-color: #f0f9eb;
  height: 55px;
  padding-left: 22px;
  padding-top: 15px;
}
.editor-container {
  margin-bottom: 30px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
