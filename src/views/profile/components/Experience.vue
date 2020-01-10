<template>
  <div class="experience-wrapper">
    <div class="edit-experience-row">
      <el-button class="none-border" @click="linkToExperienceEdit">编辑</el-button>
    </div>
    <div class="experience-main">
      <el-timeline>
        <el-timeline-item timestamp="2018-4-12 ~ 2019-01-08" placement="top" v-for="exp of experienceList">
          <el-card>
            <h4>{{exp.name}}</h4>
            <p v-if="exp.workPosition">{{exp.workPosition}}</p>
            <p>{{exp.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>


<script>
import _axios from '@/utils/request'
export default {
  name: "experience",
  data() {
    return {
      experienceList: [],
    };
  },
  methods: {
    linkToExperienceEdit() {
      this.$router.push("/experienceEdit/work");
    },
    getExperienceList() {
      _axios.get('/resume/experienceList',{params: {pagename: 'work'}}).then(res => {
        this.experienceList = res.data.data;
      })
    }
  },
  created() {
    this.getExperienceList()
  }
};
</script>

<style lang='scss' scoped>
.none-border {
  border: none;
}
.edit-experience-row {
  text-align: right;
}
.experience-main {
  min-height: 255px;
}
</style>

<style lang="scss">
.experience-wrapper {
  .el-button:focus,
  .el-button:hover {
    color: #e6be0d;
    background-color: #fff;
  }
}
</style>