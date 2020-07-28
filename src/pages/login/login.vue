<template>
  <div id="wrap" @keydown.enter="d">
    <div class="box">
      <h2>登陆</h2>
      <div class="from">
        <div class="user">
          <el-input placeholder="请输入用户名" v-model="user.username" clearable class="w"></el-input>
        </div>
        <div class="pass">
          <el-input placeholder="请输入密码" v-model="user.password" clearable show-password class="w"></el-input>
        </div>
        <div class="btn">
          <el-button type="primary" class="w" @click="login" >登陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { httpuserlogin } from "../../util/request";
import { warning, success } from "../../util/alert";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      changeuser: "changeuser",
    }),
    login() {
      httpuserlogin(this.user).then((res) => {
        if (res.data.code == 200) {
          this.changeuser(res.data.list);
          console.log(this.users);
          success(res.data.msg);
          this.$router.push("/home");
        } else {
          warning(res.data.msg);
        }
      });
    },
    d() {
      httpuserlogin(this.user).then((res) => {
        if (res.data.code == 200) {
          this.changeuser(res.data.list);
          console.log(this.users);
          success(res.data.msg);
          this.$router.push("/home");
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      users: "user",
    }),
  },
};
</script>

<style scoped>
#wrap {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #563443, #303d60);
}
.box {
  width: 500px;
  height: 300px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
h2 {
  text-align: center;
}
.w {
  width: 320px;
  margin-bottom: 20px;
}
.from {
  margin-left: 90px;
}
</style>