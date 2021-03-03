<template>
  <div class="login-container">
    <div class="login-linner">
      <div class="parent">
        <div class="logLf">
          <span class="mask"></span>
          <span class="backgroundLogo">
            <img
              src="@/assets/images/login/login_logo.png"
              class="backgroundK"
            />
          </span>
        </div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <p class="welcome">欢迎登录管控系统</p>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              name="username"
              type="text"
              auto-complete="on"
              placeholder="请输入账号"
            >
              <i slot="prefix" class="el-icon-user-solid icon_Password"></i>
              <span slot="prefix" class="line_solid"></span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :type="pwdType"
              v-model="loginForm.password"
              name="password"
              auto-complete="on"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            >
              <i slot="prefix" class="iconfont icon-mima1 icon_Password"></i>
              <span slot="prefix" class="line_solid"></span>
            </el-input>
          </el-form-item>
          <div class="form-actions">
            <label class="rememberme check mt-checkbox">
              <el-checkbox v-model="loginForm.checked" style="color: #8290a3"
                >记住密码</el-checkbox
              >
            </label>
            <el-button
              type="primary"
              @click.native.prevent="handleLogin"
              style="
                width: 100%;
                background: #3bafda;
                border-color: #3bafda;
                margin-top: 20px;
              "
            >
              登录
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        checked: false,
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "账号不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
      },
      pwdType: "password",
      iconfontClass: "iconfont icon-eye",
      organizationCompanyList: [],
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        // 表单验证
        if (valid) {
          // this.loginForm.password = this.CryptoJS.MD5(this.loginForm.password + 'NJXngVrIvOkReOolu2MZRl6dJvF8i3Sl').toString()
          let authorization = "";
          this.$axios
            .post(
              this.commonJs.localUrl +
                `/auth/oauth/token?grant_type=password&username=${this.loginForm.username}&password=${this.loginForm.password}`,
              {},
              {
                headers: {
                  Authorization: `Basic ${this.commonJs.basicAuth}`,
                },
              }
            )
            .then((res) => {
              if (!res.data.access_token) {
                this.$message({
                  type: "error",
                  message: "账号或密码错误",
                });
                return;
              } else {
                if (
                  res.data.roles.filter((f) => f.roleCode == "ADMIN").length > 0
                ) {
                  // 存储token
                  this.setCookie(
                    "authorization",
                    JSON.stringify({ authorization: res.data.access_token }),
                    1
                  );
                  this.setCookie("token", "Jwt " + res.data.access_token);
                  this.setCookie("userName", res.data.nickName);
                  this.$localStorage.setItem("checked", this.loginForm.checked);
                  this.$router.push({ path: "/" });
                } else {
                  this.$message({
                    type: "error",
                    message: "禁止访问",
                  });
                  return;
                }
              }
            });
        }
      });
    },
  },
  mounted() {
    // this.getAuthorization();
    if (
      this.getCookie("userName") &&
      this.$localStorage.getItem("checked") === true
    ) {
      this.loginForm.username = this.getCookie("userName");
      this.loginForm.password = 123456;
      this.loginForm.checked = true;
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
}
/deep/input:focus {
  outline: none;
  border: 1px solid #ccc;
}

.lr {
  float: right;
}
.lf {
  float: left;
}
.login-container {
  background-image: url("../../../assets/images/login/loginBg.png");
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  .icon_Password {
    font-size: 16px;
    color: #3bafda;
    vertical-align: middle;
  }
  .line_solid {
    display: inline-block;
    width: 1px;
    height: 12px;
    background: #ccc;
    vertical-align: middle;
    margin-left: 5px;
  }
  .login-linner {
    width: 800px;
    height: 290px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -400px;
    margin-top: -145px;
  }
  .logLf {
    display: inline-block;
    width: 520px;
    height: 290px;
    vertical-align: middle;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: -4px 0px 6px 2px rgba(0, 0, 0, 0.4);
    position: relative;
    .mask {
      position: absolute;
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: #3bb0da19;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .backgroundLogo {
    width: 219px;
    height: 78px;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -120px;
    margin-top: -41px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .login-form {
    background-color: #fff;
    width: 220px;
    height: 220px;
    padding: 30px 30px 40px 30px;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    box-shadow: 4px 0px 6px 2px rgba(0, 0, 0, 0.2);
  }
  .backgroundLogin {
  }
  .parent {
  }
  .backgroundK {
  }
  /deep/.el-form-item is-required {
    margin-bottom: 15px;
  }
  /deep/.el-form-item__error {
    padding-top: 2px;
  }
  .welcome {
    padding: 0 0 20px 0;
    font-size: 14px;
    color: #5c7181;
  }
  .el-input {
    .el-input__inner {
      background-color: #dde3ec;
      padding: 0 0 0 35px !important;
    }
  }
  .form-actions {
    clear: both;
    border: 0;
    padding: 0px 30px;
    margin-left: -30px;
    margin-right: -30px;
    .button {
      width: 100%;
      margin-top: 10px;
      font-weight: 600;
      padding: 10px 20px !important;
      background: #27d2c9 !important;
    }
  }
  .rememberme {
    // margin-left: 8px;
  }
  .check {
    color: #8290a3;
  }
}
</style>