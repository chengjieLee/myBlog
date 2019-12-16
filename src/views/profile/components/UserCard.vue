<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
      <span class="edit-resume">
        <router-link to="/resume">Edit</router-link>
      </span>
    </div>
    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          <div>我是{{name}}</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{name}}</div>
        <div class="user-role text-center text-muted">
          <span>
            职位：
          </span>
          <span>
            {{profession}}
          </span>
          </div>
      </div>
    </div>
    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" />
          <span>学历</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">{{education}}</div>
        </div>
      </div>
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill" />
          <span>技能及掌握程度</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item" v-for="skill of skillList">
            <span>{{skill.skillName}}</span>
            <el-progress :percentage="skill.skillProgress" />
          </div>
          <div class="progress-item">
            <span>Self-study</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import _axios from "@/utils/request";

export default {
  components: { PanThumb },
  data() {
    return {
      education: '',
      name: '',
      profession: '',
      skillList: [],
      avatar: ''
    }
  },
  methods: {
    getResumeInfo() {
      _axios.get("/resume").then(res => {
        const resumeData = res.data.data;
        this.avatar = resumeData.avatar;
        this.profession = resumeData.profession;
        this.name = resumeData.name;
        this.education = resumeData.education;
        this.skillList = resumeData.skillList;
      });
    }
  },
  created() {
    this.getResumeInfo();
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
.edit-resume {
  float: right;
  color: #e6be0d;
}
.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
