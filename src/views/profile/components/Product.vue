<template>
  <div class="product-wrapper">
    <div class="edit-product-row">
      <el-button class="none-border">
        <router-link to="/experienceEdit/project">编辑</router-link>
      </el-button>
    </div>
    <div class="product-main">
      <el-timeline>
        <el-timeline-item
          timestamp="2018-4-12 ~ 2019-01-08"
          placement="top"
          v-for="exp of experienceList"
        >
          <el-card>
            <h4>{{exp.name}}</h4>
            <p>{{exp.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>


<script>
import _axios from '@/utils/request';

export default {
  name: "Product",
  data() {
    return {
      experienceList:[]
    };
  },
  methods: {
    getExperienceList() {
      _axios
        .get("/resume/experienceList", { params: { pagename: "project" } })
        .then(res => {
          this.experienceList = res.data.data;
        });
    }
  },
  created() {
    this.getExperienceList();
  }
};
</script>

<style lang='scss' scoped>
.none-border {
  border: none;
}
.edit-product-row {
  text-align: right;
}
.product-main {
  min-height: 255px;
}
</style>

<style lang="scss">
.product-wrapper {
  .el-button:focus,
  .el-button:hover {
    color: #e6be0d;
    background-color: #fff;
  }
}
</style>