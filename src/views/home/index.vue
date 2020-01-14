<template>
  <div class="home-main">
    <div class="content-row row-1">
      <div class="myskill-box">
        <my-skill />
      </div>
      <div class="my***-box">
        不知道该放些啥，回头再说
      </div>
    </div>
    <div class="content-row row-2">
      <div class="heat-box">
        <my-create></my-create>
      </div>
    </div>

  </div>
</template>


<script>
import MySkill from "./components/MySkill";
import MyCreate from "./components/MyCreate";

export default {
  name: 'Home',
  components: {
    MySkill,
    MyCreate
  }
};
</script>

<style lang='scss' scoped>
.home-main {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  .row-1 {
    position: relative;
    display: flex;
    .myskill-box {
      width: 48%;
      box-sizing: border-box;
      height: 380px;
      margin-right: 2%;
    }
  }
}
</style>