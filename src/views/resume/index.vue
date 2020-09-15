<template>
  <div class="edit-resume-wrapper">
    <el-container class="resume-container">
      <el-header>
        <h1 class="page-title">个人中心</h1>
        <el-divider></el-divider>
      </el-header>
      <el-main class="edit-main">
        <div class="avatar-upload-box">
          <label class="avatar-title">头像</label>
          <div class="avatar-upload">
            <Avatar class="avatar-component" :initUrl="initAvatar" />
          </div>
          <span class="avatar-tip">请上传大小小于5MB且为jpg格式图片</span>
          <span class="avatar-tip tip2">点击图片更换头像</span>
          <el-divider></el-divider>
        </div>
        <div class="name-box">
          <label class="name-title">姓名</label>
          <el-input class="right-input" ref="name" v-model="form.name" type="text"></el-input>
          <el-button class="right-button" @click.native.prevent="nameFocus">修改</el-button>
          <el-divider></el-divider>
        </div>
        <div class="education-box">
          <label class="education-title">学历</label>
          <el-input class="right-input" ref="education" v-model="form.education" type="text"></el-input>
          <el-button class="right-button" @click.native.prevent="educationFocus">修改</el-button>
          <el-divider></el-divider>
        </div>
        <div class="profession-box">
          <label class="profession-title">职业</label>
          <el-input class="right-input" ref="profession" v-model="form.profession" type="text"></el-input>
          <el-button class="right-button" @click.native.prevent="professionFocus">修改</el-button>
          <el-divider></el-divider>
        </div>
        <div class="profession-box">
          <label class="github-title">github</label>
          <el-input class="right-input" ref="github" v-model="form.github" type="text"></el-input>
          <el-button class="right-button" @click.native.prevent="githubFocus">修改</el-button>
          <el-divider></el-divider>
        </div>
        <div class="skill-box">
          <label class="skill-title">技能</label>
          <span style="width:300px;display:inline-block;"></span>
          <el-button class="right-button" @click.native.prevent="showAddSkillList">新增</el-button>
          <div class="skill-option" v-if="addSkillList">
            <div class="skill-label">
              <div class="skill-name">技能名称</div>
              <div class="skill-level">技能掌握程度</div>
            </div>
            <div class="skill-option-add">
              <el-input class="temp-skill" v-model="tempSkill"></el-input>
              <el-slider class="temp-slider" :format-tooltip="formatTooltip" v-model="tempSlider"></el-slider>
            </div>
            <div class="handle-button-box">
              <el-button
                class="handle-skill-button"
                style="color: #888"
                @click.native.prevent="cancelAddSkillList"
              >取消</el-button>
              <el-button class="handle-skill-button" @click.native.prevent="addSkill">添加</el-button>
            </div>
          </div>

          <div class="skill-list">
            <div class="progress-item-box" v-for="skill of skillList" :key="skill.skillName">
              <div class="skill-modify" v-if="skill.isModify">
                <el-input class="modify-skill" v-model="skill.skillName"></el-input>
                <el-slider class="modify-slider" v-model="skill.skillProgress"></el-slider>
                <el-button class="right-button" @click.native.prevent="triggerModify(skill.skillName)">确定</el-button>
              </div>
              <div class="progress-item">
                <div class="progress-main">
                  <span>{{skill.skillName}}</span>
                  <el-progress :percentage="skill.skillProgress" />
                </div>
                <div class="edit-progress">
                  <el-button class="right-button" @click.native.prevent="triggerModify(skill.skillName)">编辑</el-button>
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </el-main>
      <el-footer>
        <el-button type="warning">
          <router-link to="/profile">返回个人中心</router-link>
        </el-button>
        <el-button class="save-button" type="primary" @click.native.prevent="saveResume">保存</el-button>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import Avatar from "@/components/Avatar";
import _axios from "@/utils/request";
//resumeBase 保存按钮传输对象
export default {
  components: {
    Avatar
  },
  data() {
    return {
      tempSkill: "",
      tempSlider: 0,
      addSkillList: false,
      form: {
        profession: "",
        name: "",
        education: "",
        github: '',
      },
      initAvatar: "http://47.103.116.19:7654/upload/Default.jpg",
      skillList: [],
    };
  },
  methods: {
    triggerModify (skillName) {
      let targetItem = this.skillList.find(it => {
          return it.skillName == skillName
      })
      targetItem.isModify = !targetItem.isModify;
    },
    professionFocus() {
      this.$refs.profession.focus();
    },
    nameFocus() {
      this.$refs.name.focus();
    },
    educationFocus() {
      this.$refs.education.focus();
    },
    githubFocus() {
      this.$refs.github.focus();

    },
    showAddSkillList() {
      this.addSkillList = !this.addSkillList;
    },
    cancelAddSkillList() {
      this.addSkillList = false;
      this.tempSkill = "";
      this.tempSlider = "";
    },
    formatTooltip(val) {
      let desc = "";
      if (val < 30) {
        desc = "了解";
      } else if (val < 60) {
        desc = "熟练";
      } else if (val < 80) {
        desc = "掌握";
      } else if (val <= 100) {
        desc = "精通";
      }
      return val + " " + desc;
    },
    getResumeData() {
      _axios.get("/resume").then(res => {
        const resumeData = res.data.data;
        this.initAvatar = resumeData.avatar;
        this.form.profession = resumeData.profession;
        this.form.name = resumeData.name;
        this.form.education = resumeData.education;
        this.skillList = resumeData.skillList.map(skill => {
          skill.isModify = false;
          return skill;
        });
      });
    },
    addSkill() {
      let tempSkill = this.tempSkill;
      let tempProgress = this.tempSlider;
      if (!tempSkill || !tempProgress) {
        return;
      }

      this.skillList.push({
        skillName: tempSkill,
        skillProgress: tempProgress
      });
      this.cancelAddSkillList();
    },
    saveResume() {
      let resumeBase = {
        profession: this.form.profession,
        name: this.form.name,
        education: this.form.education,
        github: this.form.github,
        skillList: this.skillList
      };
      _axios.post("/resume/edit", { resumeBase }).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
        }
      });
    }
  },
  created() {
    this.getResumeData();
  }
};
</script>

<style lang='scss' scoped>
.edit-resume-wrapper {
  background: #f4f5f5;
  width: 100%;
  min-height: calc(100vh - 50px);
  position: relative;
  top: 0;
  padding-top: 56px;
}
.page-title {
  font-size: 22px;
}
.resume-container {
  width: 70%;
  margin-left: 88px;
  background-color: #fff;
}
.avatar-upload-box {
  position: relative;
}
.avatar-tip {
  font-size: 14px;
  margin-top: 8px;
  margin-left: 8px;
  display: inline-block;
  vertical-align: top;
  &.tip2 {
    position: absolute;
    bottom: 38px;
    left: 206px;
  }
}
.edit-main {
  label {
    font-size: 14px;
    font-weight: 500;
    margin-right: 36px;
    display: inline-block;
    width: 80px;
    vertical-align: middle;
  }
  .right-input {
    display: inline-block;
    width: 300px;
  }
  .right-button {
    border: none;
    color: #1989fa;
  }
}
.avatar-upload {
  width: 80px;
  height: 80px;
  vertical-align: middle;
  display: inline-block;
}
.skill-box {
  .skill-option {
    color: #333;
    font-size: 14px;
    margin-top: 12px;
    position: relative;
    .handle-button-box {
      position: absolute;
      right: 0px;
      bottom: 5px;
      .handle-skill-button {
        border: none;
        color: #1989fa;
      }
    }
    .skill-label {
      width: 75%;
      display: flex;
      justify-content: space-around;
      .skill-name {
        width: 45%;
      }
      .skill-level {
        width: 45%;
      }
    }
    .skill-option-add {
      margin-top: 12px;
      width: 75%;
      display: flex;
      justify-content: space-around;
      .temp-skill {
        width: 45%;
      }
      .temp-slider {
        width: 45%;
      }
    }
  }
  .skill-list {
    margin-top: 12px;
    width: 420px;
    padding-left: 8px;
    .progress-item {
      display: flex;
      padding: 8px 0;
      justify-content: space-between;
      .progress-main {
        width: 70%;
      }
      .edit-progress {
        .right-button {
          margin-top: 8px;
          color: #f30;
        }
      }
    }
  }
  .skill-modify {
    display: flex;
    .modify-skill {
      width: 42%;
      margin-right:16px;
    }
    .modify-slider {
      width: 40%;
      margin-right:12px;
    }
  }
}
.skill-modify {
  width: 120%;
}
.save-button {
  margin-left: 405px;
}
</style>

<style lang="scss">
.edit-resume-wrapper {
  .profession-box,
  .education-box,
  .name-box {
    .el-input__inner {
      border: none;
    }
  }
}
</style>