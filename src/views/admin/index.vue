<template>
  <div class="control-wrapper">
    <el-tabs v-model="activeName">
      <el-tab-pane label="文章管理" name="first">
        <el-container>
          <el-main>
            <el-table :data="articleList">
              <el-table-column prop="blogTitle" label="文章标题">
                <template slot-scope="scope">
                  <router-link :to=" `/article/detail?blogid=${scope.row.blogId}` ">
                    <span>{{scope.row.blogTitle}}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="author" label="创作时艺名"></el-table-column>
              <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
              <el-table-column prop="user" label="文章真实作者"></el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteArticle(scope.row)"
                    type="text"
                    size="small"
                  >移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="second">
        <el-container>
          <el-header>已注册用户列表</el-header>
          <el-main>
            <div class="user-item" v-for="user of userList">
              <span>用户名:</span>
              <span class="user-name">{{user.user}}</span>
              <el-button class="remove-user" type="warning" @click.native.prevent="removeUser(user.user)">移除该用户</el-button>
              <el-divider content-position="left"></el-divider>
            </div>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import _axios from "@/utils/request";

export default {
  data() {
    return {
      activeName: "first",
      articleList: [],
      userList: []
    };
  },
  methods: {
    getArticleList() {
      _axios.get("/blog/list").then(res => {
        this.articleList = res.data.data;
      });
    },
    blogDelete(blogId) {
      _axios
        .delete("/blog/delete", {
          params: {
            blogId: blogId
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.getArticleList();
            this.$message({
              type: "success",
              message: "该文章已删除"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败，我慌得一批"
            });
          }
        });
    },
    deleteArticle(row) {
      this.$confirm("确定删除该文章？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.blogDelete(row.blogId);
        })
        .catch(() => {
          this.$message({
            message: "已取消"
          });
        });
    },
    getUserList() {
      _axios.get("/user/list").then(res => {
        this.userList = res.data.data;
      });
    },
    removeUser(user) {
      this.$confirm("确定移除该用户？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.userRemove(user);
        })
        .catch(() => {
          this.$message({
            message: "已取消"
          });
        });
    },
    userRemove(user) {
      _axios.delete('/user/delete', {
        params: {
          username: user
        }
      }).then(res => {
        if(res.data.code ===0) {
          this.getUserList();
          this.$message({
            message: '该用户已移除'
          })
        }else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    }
  },
  created() {
    this.getArticleList();
    this.getUserList();
  }
};
</script>

<style lang='scss' scoped>
.control-wrapper {
  width: 100%;
  padding: 20px;
  .user-item {
    overflow: hidden;
    .user-name {
      margin-left: 22px;
      color: #F56C6C
    }
    .remove-user {
      float: right;
    }
  }
}
</style>