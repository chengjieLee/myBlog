<template>
  <div class="upload-container">
    <div>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:7654/upload/image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="uploadData"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <img v-else-if="initUrl" :src="initUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  name: "UploadAvatar",
  props: {
    initUrl: {
      type: String
    }
  },
  data() {
    const user = getToken();
    return {
      imageUrl: "",
      uploadData: {
        user: user,
        uid: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.imgUrl;
      this.$store.dispatch('user/getInfo');
      this.$message({
        message: '头像更换成功',
        type: 'success'
      })
    },
    fileReader(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = e => {
        file.url = reader.result;
      };
    },
    beforeAvatarUpload(file) {
      this.uploadData.uid = file.uid;
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      this.fileReader(file);
      return isJPG && isLt5M;
    }
  }
};
</script>

<style lang="scss">
.upload-container {
  width:100%;
  height: 100%;
  .avatar-uploader {
    height: 100%;
    width:100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height:78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
}
</style>
