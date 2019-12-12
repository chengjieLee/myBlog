<template>
  <div class="register-container">
    <div id="particles"></div>
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <div class="title">注册</div>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          key="1"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="queren" />
        </span>
        <el-input
          key="2"
          ref="cPassword"
          v-model="registerForm.confirmPassword"
          :type="passwordType"
          placeholder="Confirm Password"
          name="confirmPassword"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="confirm" />
        </span>
        <el-input
          key="3"
          ref="captcha"
          v-model="registerForm.captcha"
          type="text"
          placeholder="Enter image code"
          name="captcha"
          tabindex="4"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <div class="captImg-box" @click="refreshCaptchaPng">
          <img :src="captUrl" alt />
        </div>
      </el-form-item>
      <div class="register-row">
        <div class="right-box">
          <span class="to-login" @click="linkToLogin">已有账号，登录</span>
        </div>
      </div>
      <el-button
        :loading="loading"
        type="success"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >注册</el-button>
      <div class="tips"></div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import particles from "particles.js";
import parJson from "./parJson.json";
import { Message } from "element-ui";
import _axios from '@/utils/request';


export default {
  name: "register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入您的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码小于六位"));
      } else {
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("确认密码和密码不符"));
      } else {
        callback();
      }
    };
    return {
      checked: false,
      passwordType: "password",
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        captcha: ""
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        confirmPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validateConfirmPassword
          }
        ]
      },
      loading: false,
      redirect: undefined,
      captUrl: ""
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    linkToLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    refreshCaptchaPng() {
      this.getCaptchaPng();
    },
    handleRegister() {
      const registerFormData = this.registerForm;
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          _axios.post('/register', {
            registerFormData
          }).then(res => {
            this.loading = false;
            if(res.data.code === 0) {
              this.$confirm('注册成功，是否进入登录页？','注册成功',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              }).then(() => {
                this.$router.push({
                  path: '/login'
                })
              }).catch(e => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
              this.$refs.registerForm.resetFields();
            }else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }).catch(e => {
            this.loading = false;
            console.log(e)
          })
        } else {
          this.$message("error submit!!");
          return false;
        }
      });
    },
    getCaptchaPng() {
      _axios.get("/register/captcha").then(res => {
        this.captUrl = res.data.data.imgUrl;
      });
    }
  },
  created() {
    this.getCaptchaPng();
  },
  mounted() {
    particlesJS("particles", parJson);
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #2d3a4b;
$dark_gray: #444;
$light_gray: #333;
$cursor: #456;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  #particles {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #444;
$light_gray: #333;

.register-container {
  min-height: 100%;
  width: 100%;
  background-image: url("../../assets/images/1.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  .register-form {
    position: relative;
    width: 460px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .register-row {
      height: 32px;
      overflow: hidden;
      .remember {
        margin-left: 8px;
      }
      .right-box {
        float: right;
        .forget {
          margin-right: 8px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          &:hover {
            color: #67c23a;
          }
        }
        .register {
          font-size: 14px;
          color: #333;
          cursor: pointer;
          &:hover {
            color: #67c23a;
          }
        }
      }
    }
  }
  .captImg-box {
    position: absolute;
    right: 5px;
    top: 10px;
    cursor: pointer;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      letter-spacing: 2em;
      text-indent: 2em
    }
  }
  .to-login {
    font-size: 14px;
    color: #555;
    cursor: pointer;
    &:hover {
      color: #5daf34;
    }
  }
}
</style>
