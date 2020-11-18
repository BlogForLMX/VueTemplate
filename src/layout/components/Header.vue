<template>
  <div class="header-layout">
    <div class="header-container">
      <div class="right-container">
        <div class="right-item" style="padding-top: 3px">
          <el-badge :value="newsNumber" class="item">
            <i class="el-icon-bell"></i>
          </el-badge>
        </div>
        <div class="right-item user-container">
          <el-avatar
            size="small"
            style="margin-top: 9px"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <el-dropdown
            class="user-info"
            placement="bottom"
            @command="handleCommand"
          >
            <span style="font-size: 16px">
              {{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">{{
                $t("common.userCenter")
              }}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting">{{
                $t("common.userSetting")
              }}</el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-switch-button"
                divided
                command="logout"
                >{{ $t("common.logout") }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="right-item language-container">
          <el-dropdown placement="bottom">
            <i class="language-icon"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{ $t("common.zh") }}</el-dropdown-item>
              <el-dropdown-item>{{ $t("common.en") }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resetTokenAndClearUser } from '@/utils/index'

export default {
  name: 'Header',
  props: {},
  data() {
    return {
      newsNumber: 12,
      userName: window.sessionStorage.getItem('userName')
    }
  },
  mounted() { },
  methods: {

    /**
     * @description 点击操作
     * @returns void 
     */
    handleCommand(command) {
      switch (command) {
        case 'logout':
          resetTokenAndClearUser()
          this.$router.push('/login')
        default:
          return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-layout {
  padding: 0px;
  height: 48px;
  line-height: 48px;
  width: 100%;
  z-index: 19;
  .header-container {
    position: relative;
    display: block;
    height: 100%;
    padding: 0 16px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .right-container {
      float: right;
      height: 100%;
      min-width: 180px;
      .right-item {
        height: 100%;
        margin-right: 30px;
        float: left;
        .el-icon-bell {
          color: rgba(0, 0, 0, 0.85);
          font-size: 17px;
          font-weight: bold;
          cursor: pointer;
        }
        .user-info {
          height: 100%;
          float: right;
          padding-top: 2px;
          color: rgba(0, 0, 0, 0.85);
          margin-left: 2px;
        }
        .language-icon {
          background: url("~@/assets/imgs/language.png") no-repeat center;
          height: 24px;
          width: 24px;
          background-size: 90%;
          position: relative;
          top: 7px;
          display: inline-block;
          cursor: pointer;
        }
      }
      .user-container {
        cursor: pointer;
        padding: 0 10px 0 5px;
        margin-right: 0px;
      }
      .user-container:hover {
        background: rgba(0, 0, 0, 0.025);
      }
      .language-container {
        margin-left: 10px;
        padding: 0 5px;
        margin-right: 5px;
      }
      .language-container:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>

<style >
.right-container .el-badge__content.is-fixed {
  top: 10px;
  right: 8px;
}
</style>