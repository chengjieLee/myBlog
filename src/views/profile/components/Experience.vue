<template>
   <div class="experience-wrapper">
     <div class="edit-experience-row">
       <el-button class="none-border">编辑</el-button>
     </div>
     <div class="experience-main">
      工作经历
     </div>
   </div>
</template>


<script>

export default {
  name: 'experience',
  data() {
    return {

    }
  }

}

</script>

<style lang='scss' scoped>
.none-border {
  border: none
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
  .el-button:focus, .el-button:hover {
    color: #e6be0d;
    background-color: #fff;
  }
}

  
</style>