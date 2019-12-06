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
      // 'http://localhost:7654/upload/1575620345582_xukai_Koala.jpg'
      this.imageUrl = res.data.imgUrl;
      // this.imageUrl = URL.createObjectURL(file.raw);
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
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.fileReader(file);
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss">
.upload-container {
  width:180px;
  height: 180px; 
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
