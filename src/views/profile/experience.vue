<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card class="right-card">
            <h1 class="edit-title">{{editTitle}}</h1>
            <div class="save-button">
              <el-button type="danger" @click="dialogVisible = true">新增</el-button>
            </div>

            <div class="experience-container">
              <el-dialog
                title
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose"
              >
                <div class="experience-new">
                  <div class="item-row">
                    <label class="experience-title">{{pageName=='work' ? '工作公司名称': '项目名称'}}</label>
                    <el-input v-model="newForm.name" class="my-el-input"></el-input>
                  </div>
                  <div class="item-row">
                    <label>时间范围：</label>
                    <el-date-picker
                      class="my-el-input datepicker"
                      v-model="newForm.timeRange"
                      type="daterange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>
                  <div class="item-row" v-if="pageName==='work'">
                    <label>公司职位</label>
                    <el-input v-model="newForm.workPosition" class="my-el-input"></el-input>
                  </div>
                  <div class="item-description">
                    <div class="description-label">{{pageName=='work' ?'岗位描述:': '项目描述:'}}</div>
                    <el-input
                      v-model="newForm.description"
                      type="textarea"
                      :rows="6"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleAddExperience">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog
                title
                :visible.sync="dialogVisible2"
                width="40%"
                :before-close="handleCloseEdit"
              >
                <div class="experience-new">
                  <div class="item-row">
                    <label class="experience-title">{{pageName=='work' ? '工作公司名称': '项目名称'}}</label>
                    <el-input v-model="editForm.name" class="my-el-input"></el-input>
                  </div>
                  <div class="item-row">
                    <label>时间范围：</label>
                    <el-date-picker
                      class="my-el-input datepicker"
                      v-model="editForm.timeRange"
                      type="daterange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>
                  <div class="item-row" v-if="pageName==='work'">
                    <label>公司职位</label>
                    <el-input v-model="editForm.workPosition" class="my-el-input"></el-input>
                  </div>
                  <div class="item-description">
                    <div class="description-label">{{pageName=='work' ?'岗位描述:': '项目描述:'}}</div>
                    <el-input
                      v-model="editForm.description"
                      type="textarea"
                      :rows="6"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="handleEditExperience">确 定</el-button>
                </span>
              </el-dialog>
              <div class="experience-list">
                <div class="experience-item" v-for="exp of experienceList">
                  <el-button class="edit-button" @click="editItem(exp.id)">编辑</el-button>
                  <h2>{{exp.name}}</h2>
                  <div class="sub-time">{{exp.timeRange}}</div>
                  <div class="work-position">{{exp.workPosition}}</div>
                  <div class="experienve-description">{{exp.description}}</div>
                  <el-divider></el-divider>
                </div>
              </div>
            </div>
            <el-button type="warning" class="back-button">
              <router-link to="/profile">返回个人中心</router-link>
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import _axios from "@/utils/request";

export default {
  name: "Profile",
  components: { UserCard },
  data() {
    return {
      activeTab: "account",
      editTitle: "",
      pageName: "",
      newForm: {
        name: "",
        timeRange: ["", ""],
        workPosition: "",
        description: ""
      },
      editForm: {
        name: "",
        timeRange: ["", ""],
        workPosition: "",
        description: ""
      },
      dialogVisible: false,
      dialogVisible2: false,
      experienceList: []
    };
  },
  created() {
    let route = this.$route.params.flag;
    if (route && route === "work") {
      this.editTitle = "工作经历编辑";
    } else if (route && route === "project") {
      this.editTitle = "项目经验编辑";
    }
    this.pageName = route || "";
    this.getExperienceData();
  },
  methods: {
    getExperienceData() {
      const pageName = this.pageName;
      _axios
        .get("/resume/experienceList", { params: { pagename: pageName } })
        .then(res => {
          this.experienceList = res.data.data;
        });
    },
    editItem(id) {
      // 发送请求  修改newForm
      _axios
        .get("/resume/experienceList", {
          params: { id: id, pagename: this.pageName }
        })
        .then(res => {
          const itemData = res.data.data;
          this.editForm.timeRange = itemData.timeRange.split(' ~ ');
          this.editForm.name = itemData.name;
          this.editForm.workPosition = itemData.workPosition || '';
          this.editForm.description = itemData.description;
          this.dialogVisible2 = true;
          // 弄个新dialog
        });
    },
    handleEditExperience() {
      // 根据 editForm更新
      this.editForm.name = '';
      this.editForm.timeRange = ["", ""];
      this.editForm.workPosition ="";
      this.editForm.description=""
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleCloseEdit() {
      this.dialogVisible2 = false;
    },
    handleAddExperience() {
      if (
        this.newForm.name &&
        this.newForm.timeRange &&
        this.newForm.description
      ) {
        // 应重新发分请求
        const experienceData = {
          name: this.newForm.name,
          timeRange:
            this.newForm.timeRange[0] + " ~ " + this.newForm.timeRange[1],
          workPosition: this.newForm.workPosition,
          description: this.newForm.description
        };
        this.newForm.name = "";
        this.newForm.timeRange = ["", ""];
        this.newForm.workPosition = "";
        this.newForm.description = "";
        _axios
          .post("/resume/addExperience", {
            experienceData,
            pageName: this.pageName
          })
          .then(res => {
            if (res.data.code === 0) {
              this.$message("添加成功");
            } else {
              this.$message(res.data.msg);
            }
          })
          .catch(e => this.$message(e));
        this.getExperienceData();
        this.dialogVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: "请填写完整信息"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-title {
  font-size: 16px;
}
.right-card {
  position: relative;
}
.back-button {
  margin-left: 50px;
}
.save-button {
  position: absolute;
  right: 60px;
  top: 22px;
}
.experience-container {
  margin-top: 22px;
  padding: 10px 80px;
  .item-row {
    display: flex;
    height: 60px;
    line-height: 60px;
    label {
      display: inline-block;
      width: 200px;
      font-size: 14px;
      font-weight: 400;
    }

    .my-el-input {
      width: 410px;
      // display: inline-block
      &.datepicker {
        position: relative;
        top: 10px;
      }
    }
  }
  .item-description {
    margin-top: 10px;
    .description-label {
      height: 28px;
      line-height: 28px;
    }
  }
  .sub-time {
    font-size: 13px;
    height: 22px;
    line-height: 22px;
  }
  .work-position {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }
  .experienve-description {
    margin-top: 12px;
    min-height: 80px;
    line-height: 22px;
    width: 460px;
    word-wrap: break-word;
    font-size: 14px;
  }
}
.experience-item {
  position: relative;
}
.edit-button {
  position: absolute;
  border: none;
  right: 12px;
  top: -6px;
}
</style>