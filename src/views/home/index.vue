<template>
  <div class="home-main">
    <div class="content-row row-1">
      <div class="myskill-box">
        <my-skill />
      </div>
      <div class="my***-box">我的技能</div>
    </div>
  </div>
</template>


<script>
import MySkill from "./components/MySkill";
export default {
  components: {
    MySkill
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