<template>
  <el-container class="container">
    <!-- <h1>Home</h1>
    <div>
      <el-button type="info" @click="logout">退出</el-button>
    </div>-->
    <el-header>
      <div class="logobox">
        <img
          src="../assets/logo.png"
          alt
        />
        <span>后台管理</span>
      </div>
      <el-tooltip
        class="item"
        effect="dark"
        content="退出"
        placement="top"
        :enterable="false"
      >
        <el-button
          type="info"
          circle
          @click="logout"
          icon='el-icon-switch-button'
          style="background:#353c3e;border:none;font-size:20px"
        ></el-button>
      </el-tooltip>

    </el-header>
    <el-container>

      <el-aside
        :width="isCollapse ? '64px' : '200px'"
        class="asside"
      >
        <el-scrollbar style="height:100%">
          <div
            class="toggle-button"
            @click="toggleCollapse"
          >
            <div :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></div>
          </div>
          <el-col>
            <el-menu
              class="el-menu-vertical-demo"
              background-color="#303641"
              text-color="#fff"
              active-text-color="#328DEE"
              :unique-opened="true"
              :collapse="isCollapse"
              :collapse-transition="false"
              router
              :default-active="activePath"
            >
              <el-submenu
                :index="item.id + ''"
                :key="item.id"
                v-for="item in menulist"
              >
                <template slot="title">
                  <i :class="iconsobj[item.id]"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <!-- <el-menu-item-group> -->
                <!-- :index 必须是字符串 -->
                <el-menu-item
                  :index="'/' + subItem.path"
                  @click="saveNavState('/' + subItem.path)"
                  :key="subItem.id"
                  v-for="subItem in item.children"
                >
                  <i class="el-icon-menu"></i>
                  {{ subItem.authName }}
                </el-menu-item>
                <!-- </el-menu-item-group> -->
              </el-submenu>
            </el-menu>
          </el-col>
        </el-scrollbar>
      </el-aside>
      <el-main :style="{left:mainLeft}">
        <!-- <view-router></view-router> -->
        <div style="height:100%;">
          <el-scrollbar style="height:100%">
            <router-view></router-view>
          </el-scrollbar>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconsobj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      isCollapse: false,
      activePath: '',
    }
  },
  created() {
    this.getMenuList()
    // 初始化，获取存储的激活状态，赋值给menu
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  computed: {
    mainLeft: function () {
      return this.isCollapse ? ' 64px' : ' 200px'
    }
  },
  methods: {
    logout: function () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      /* 验证token  */
      /* 从后台获取数据 */
      /* 调整左侧菜单  */
    },
    async getMenuList() {
      const { data } = await this.$http.get('menus')
      if (data.meta.status !== 200) return this.$message.err(res.meta.msg)
      this.menulist = data.data

      // console.log(this.menulist)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)

      this.activePath = activePath
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  /* 取消右侧的滑动条 */
  /* overflow: hidden; */
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #353c3e;
}
.el-aside {
  background: #303641;
}
.logobox {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
}
.logobox img {
  width: 40px;
}

.el-menu {
  border-right: none;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  text-align: center;
  cursor: pointer;
}
.el-icon-s-fold,
.el-icon-s-unfold {
  color: #fff;
  font-size: 18px;
}
</style>
