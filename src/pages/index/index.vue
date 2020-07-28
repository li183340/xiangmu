<template>
  <div>
    <el-container class="box">
      <el-aside width="200px">
        <!-- 导航开始 -->
        <el-menu
          router
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="item.id.toString()" v-for="item in user.menus" :key="item.uid" v-show='item.children'>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="i.url" v-for="i in item.children" :key="i.uid">{{i.title}}</el-menu-item>
          </el-submenu>

          <el-menu-item :index="i.url" v-for="i in user.menus" :key="i.uid" v-show='!i.children'>
            <span slot="title">{{i.title}}</span>
          </el-menu-item>
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="user">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="esc">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <v-nav></v-nav>
          <router-view class="main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
    return {
      n:1
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    ...mapActions({
      changeuser: "changeuser",
    }),
    esc() {
      this.changeuser(null);
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>

<style scoped lang='stylus'>
.box {
  width: 100vw;
  height: 100vh;
}

.el-header, .el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  overflow: hidden;
}

.el-aside {
  background-color: #20222a;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.user {
  float: right;
}

.user span {
  margin-right: 20px;
}

.main {
  padding-top: 20px;
}
</style>