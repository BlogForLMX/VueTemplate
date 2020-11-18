<template>
  <div class="login-container">
    <div class="login-top">
      <div class="img-container">
        <img
          :src="require('@/assets/imgs/logo.svg')"
          alt="logo"
          class="login-image"
        />
        <h1 class="login-title">{{ $t("common.systemTile") }}</h1>
      </div>
      <div class="login-description">
        {{ $t("common.systemDescription") }}
      </div>
    </div>
    <div class="login-main">
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="logo-container">
          <span class="title">{{ $t("login.title") }}</span>
        </div>

        <div class="welcome-container">
          <span class="welcome">{{ $t("login.welcome") }}</span>
          <span class="welcome-line">|</span>
          <span class="welcome-en">{{ $t("login.welcomeEn") }}</span>
        </div>

        <el-form-item>
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.account"
            :placeholder="$t('login.username')"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="loginForm.password"
            :placeholder="$t('login.password')"
            @keyup.enter.native="handleLogin"
            show-password
          />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          @click.native.prevent="handleLogin"
          >{{ $t("login.logIn") }}</el-button
        >
      </el-form>
    </div>
    <div class="version-container">
      &copy; {{ $t("common.loginCoryright") }} {{ this.versionCode }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loginForm: {
        account: 'admin', // 用户名
        password: 'admin' // 密码
      },
      loading: false,
      redirect: undefined,
      versionCode: '@1.0.0.20200820_beta',
      version: undefined,
      versions: undefined
    }
  },
  created() {
    this.getVersionLog()
  },
  mounted() {
  },
  methods: {

    /**
     * @description 获取版本信息
     * @returns void
     */
    getVersionLog() {
      const that = this
      this.versions = require('@/version/version.json')
      if (this.versions.length > 0) {
        this.version = this.versions[this.versions.length - 1]
        if (this.version != undefined) {
          this.versionCode = this.version.version
        }
        window['versions'] = JSON.parse(JSON.stringify(this.versions))
        window['version'] = JSON.parse(JSON.stringify(this.version))
      } else {
        window['versions'] = []
        window['version'] = undefined
      }
    },

    /**
     * @description 登陆操作
     * @return void
     */
    handleLogin() {
      if (this.loginForm.account === 'admin' && this.loginForm.password === 'admin') {
        // 登陆成功 设置用户信息
        window.sessionStorage.setItem('userName', 'xiaoxin')
        // 登陆成功 假设这里是后台返回的 token
        window.sessionStorage.setItem('token', 'i_am_token')
        this.$router.push({ path: this.redirect || '/' })
      }
    }
  }
}
</script>

<style lang="scss">
.login-container {
  .login-main {
    .el-input {
      display: inline-block;
      height: 36px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 0px 5px 0px 10px;
        color: #000000;
        height: 36px;
        caret-color: #000000;
        box-shadow: inset 0 0 0 1000px #ffffff !important;
      }
    }

    .el-form-item {
      border-bottom: 1px solid #cbcfd9;
      margin-bottom: 35px;
    }
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: url("~@/assets/login/login.svg") no-repeat center;
  background-size: 85%;
  min-width: 1200px;

  .login-top {
    text-align: center;
    .img-container {
      margin-top: 60px;
      .login-image {
        width: 44px;
        height: 44px;
      }
      .login-title {
        line-height: 44px;
        height: 44px;
        display: inline-block;
        margin-left: 15px;
        position: relative;
        top: -10px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        font-size: 23px;
        font-family: "Avenir, helvetica neue, Arial, Helvetica, sans-serif";
      }
    }
    .login-description {
      margin-top: 16px;
      margin-bottom: 30px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }

  .login-main {
    width: 380px;
    height: 400px;
    position: absolute;
    display: flex;
    align-items: center;
    left: 50%;
    top: 50%;
    margin-left: -190px;
    margin-top: -180px;
    .login-form {
      position: relative;
      width: 380px;
      overflow: hidden;
      margin-top: -24%;
      background-color: #ffffff;
      padding: 20px 30px;
      border-radius: 5px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 0px 5px 0px 10px;
      color: #b6bdcd;
      vertical-align: middle;
      width: 36px;
    }

    .logo-container {
      position: relative;
      width: 100%;
      height: 5.5vh;

      .title {
        height: 5vh;
        line-height: 4.5vh;
        font-size: 1.35rem;
        font-weight: bold;
        color: #3699ff;
        margin-right: 1px;
      }
    }

    .welcome-container {
      position: relative;
      width: 100%;
      height: 4vh;
      margin: 1.5vh 0 2vh 0;

      .welcome {
        height: 4vh;
        line-height: 4vh;
        font-size: 17px;
        font-weight: 900;
      }
      .welcome-line {
        margin: auto 3px;
        font-size: 16px;
        color: #a9afc0;
      }
      .welcome-en {
        font-size: 16px;
        color: #a9afc0;
      }
    }

    .login-btn {
      width: 100%;
      margin-bottom: 5px;
      margin-top: 5px;
      background-color: #3699ff;
      border-color: #3699ff;
    }
  }
  .version-container {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    position: fixed;
    bottom: 0.15rem;
    display: inline-block;
    text-align: center;
    width: 100%;
  }
}
</style>
