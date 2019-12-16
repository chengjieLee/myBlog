<template>
   <div class="product-wrapper">
     <div class="edit-product-row">
       <el-button class="none-border">编辑</el-button>
     </div>
     <div class="product-main">
       项目经历
     </div>
   </div>
</template>


<script>

export default {
  name: 'Product',
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
.edit-product-row {
  text-align: right;
}
.product-main {
  min-height: 255px;
}

</style>

<style lang="scss">
.product-wrapper {
  .el-button:focus, .el-button:hover {
    color: #e6be0d;
    background-color: #fff;
  }
}

  
</style>