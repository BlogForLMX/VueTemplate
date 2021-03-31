<template>
  <aside :class="asideClassName">
    <div class="layout-sider">
      <div class="sider-logo-container">
        <a>
          <img
            :src="require('@/assets/imgs/logo.svg')"
            alt="logo"
            class="sider-logo-image"
          />
          <h1 v-show="isShowTitle" class="sider-title">
            {{ $t("common.title") }}
          </h1></a
        >
      </div>
      <!-- 菜单栏 -->
      <div class="sider-menu-conatiner">
        <el-menu
          :default-active="activeMenu"
          class="sider-menu"
          text-color="#a6adb4"
          :collapse-transition="false"
          background-color="#001529"
          :unique-opened="true"
          :collapse="!isShowIcon"
        >
          <div v-for="(item, index) in menusArray" :key="index">
            <!-- 二级路由 -->
            <el-submenu
              v-if="item.redirect === undefined && item.children.length > 0"
              :index="item.path"
            >
              <template slot="title">
                <i :class="`v-t-${item.meta.icon}`"></i>
                <span v-if="isShowIcon" slot="title">{{ item.name }}</span>
              </template>

              <el-menu-item
                :index="`${item.path}/${son.path}`"
                v-for="(son, index) in item.children"
                :key="index"
                @click="handleChangeRouter(`${item.path}/${son.path}`, son)"
              >
                <!-- 三级路由 -->
                <el-submenu
                  v-if="son.children !== undefined && son.children.length > 0"
                  :index="`${item.path}/${son.path}`"
                >
                  <template slot="title">
                    <i :class="`v-t-${son.meta.icon}`"></i>
                    <span slot="title">{{ son.name }}</span>
                  </template>
                  <el-menu-item
                    :index="`${item.path}/${son.path}/${grandson.path}`"
                    v-for="(grandson, index) in son.children"
                    :key="index"
                    @click="
                      handleChangeRouter(
                        `${item.path}/${son.path}/${grandson.path}`,
                        grandson
                      )
                    "
                  >
                    <i :class="`v-t-${grandson.meta.icon}`"></i>
                    <span slot="title">{{ grandson.name }}</span>
                  </el-menu-item>
                </el-submenu>
                <div v-else>
                  <i :class="`v-t-${son.meta.icon}`"></i>
                  <span slot="title">{{ son.name }}</span>
                </div>
              </el-menu-item>
            </el-submenu>
            <!-- 一级路由 -->
            <div
              v-if="item.redirect !== undefined && item.children.length === 1"
            >
              <el-menu-item
                v-for="(routeItem, index) in item.children"
                :index="item.redirect"
                :key="index"
                @click="handleChangeRouter(item.redirect, routeItem)"
              >
                <i :class="`v-t-${routeItem.meta.icon}`"></i>
                <span slot="title">{{ routeItem.name }}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </div>
      <div class="sider-icon-container">
        <i
          class="el-icon-s-fold sider-icon"
          v-if="isShowIcon"
          @click="handleExpendOrShrink"
        ></i>
        <i
          class="el-icon-s-unfold sider-icon"
          v-if="!isShowIcon"
          @click="handleExpendOrShrink"
        ></i>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SiderBar',
  props: {},
  computed: {
    menusArray() {
      return this.$store.state.permisssionMenus
    }
  },
  data() {
    return {
      asideClassName: 'expend',
      isShowTitle: true,
      isShowIcon: true,
      activeMenu: undefined, // 当前激活的菜单
      activeMenuBack: undefined
    }
  },
  watch: {
    $route(to, from) {
      this.activeMenu = to.path
      window.sessionStorage.setItem('routerPath', to.path)
    }
  },
  created() {
    // 激活菜单中的第一个选项
    this.getFirstMenu()
  },
  mounted() {
    // 监听浏览器的前进/后退操作
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.clickBrowerBackAndForward, false)
    }
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.clickBrowerBackAndForward, false)
  },
  methods: {

    /**
     * @description 处理菜单栏收缩或者展开
     * @returns void
     */
    handleExpendOrShrink() {
      this.isShowIcon = !this.isShowIcon
      this.$emit('handleOpenOrClose', this.isShowIcon)
      this.asideClassName = this.isShowIcon ? 'expend' : 'shrink'
      if (this.isShowIcon) {
        setTimeout(() => {
          this.isShowTitle = this.isShowIcon
        }, 200)
      } else {
        this.isShowTitle = this.isShowIcon
      }
    },

    /**
     * @description 进行路由跳转操作
     * @param {String} path
     * @param {Object} router
     * @returns void
     */
    handleChangeRouter(path, router) {
      this.$router.push(path)
    },

    /**
     * @description 激活菜单中的第一个选项
     */
    getFirstMenu() {
      if (window.sessionStorage.getItem('routerPath')) {
        this.activeMenu = window.sessionStorage.getItem('routerPath')
        this.$router.push(this.activeMenu)
        return
      }
      if (this.menusArray.length > 0) {
        // 第一个菜单是一级路由的情况
        if (this.menusArray[0].redirect !== undefined) {
          this.activeMenu = this.menusArray[0].redirect
        }
        // 第一菜单是二级路由
        if (this.menusArray[0].redirect === undefined) {
          this.activeMenu = this.menusArray[0].path + '/' + this.menusArray[0].children[0].path
        }
        this.activeMenuBack = this.activeMenu
        // 进行路由的跳转操作
        this.$router.push(this.activeMenu)
      }
    },

    /**
     * @description 监听浏览器前进/后退操作
     * @returns void
     */
    clickBrowerBackAndForward() {
      console.log(this.$route.path)
      if (this.$route.path === '/') {
        this.$router.push(this.activeMenuBack)
      } else {
        this.activeMenu = this.$route.path
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.shrink {
  width: 60px;
}
.expend {
  width: 208px;
}
aside {
  top: 0;
  left: 0;
  background: #001529;
  height: 100%;
  transition: width 0.3s;
  overflow: hidden;
  position: fixed;
}

.layout-sider {
  display: flex;
  flex-direction: column;
  height: 100%;
  .sider-logo-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px;
    line-height: 32px;
    cursor: pointer;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 32px;
      .sider-logo-image {
        display: inline-block;
        height: 32px;
        vertical-align: middle;
      }
      .sider-title {
        display: inline-block;
        height: 32px;
        margin: 0 0 0 12px;
        color: #fff;
        font-weight: 600;
        font-size: 18px;
        line-height: 32px;
        vertical-align: middle;
      }
    }
  }

  .sider-menu-conatiner {
    flex: 1 1 0%;
    overflow: hidden auto;
    .sider-menu {
      border-right: 0;
    }
  }

  .sider-icon-container {
    width: 100%;
    padding: 6px 16px;
    .sider-icon {
      font-size: 20px;
      cursor: pointer;
      color: rgb(206, 202, 202);
    }
    .el-icon-s-fold:hover {
      color: #fff;
    }
    .el-icon-s-unfold:hover {
      color: #fff;
    }
  }
}
</style>

<style>
.el-menu-item.is-active {
  background-color: #1890ff !important;
  color: #fff !important;
}
.el-menu-item.is-active i {
  color: #ffffff;
}
.el-menu-item.is-active span {
  color: #ffffff;
}
.el-submenu__icon-arrow {
  right: 25px;
  margin-top: -5px;
}
</style>
