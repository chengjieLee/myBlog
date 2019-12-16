<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
           <el-tabs v-model="activeTab">
               <el-tab-pane label="项目" name="project">
                <product />
              </el-tab-pane>
              <el-tab-pane label="工作" name="experience">
                <experience />
              </el-tab-pane>
              <el-tab-pane label="我的文章" name="account">
                <account />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Product from "./components/Product";
import Experience from "./components/Experience";
import Account from "./components/Account";

export default {
  name: "Profile",
  components: { UserCard, Product, Experience, Account },
  data() {
    return {
      activeTab: "account"
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
