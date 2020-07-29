<template>
  <div>
    <el-dialog :title="add.title" :visible.sync="add.show" @closed='closed'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder>
            <el-option label="--请选择--" disabled value></el-option>
            <el-option
              v-for="item in roleid"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username" @blur="regusername"></el-input>
        </el-form-item>

        <el-form-item label="密码" v-if="hide">
          <el-input
            placeholder="请输入密码"
            clearable
            show-password
            v-model="form.password"
            @blur="regpassword"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addone" v-if="add.isAdd">添加</el-button>
          <el-button type="primary" v-else @click="edit">编辑</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { httpuseradd, httpuserinfo, httpuseredit } from "../../../util/request";
import { success, warning } from "../../../util/alert";
import { mapActions, mapGetters } from "vuex";
import { usernamereg, passreg } from "../../../util/reg";

export default {
  props: ["add"],
  computed: {
    ...mapGetters({
      roleid: "role/list",
    }),
  },
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      hide: true,
    };
  },
  methods: {
    ...mapActions({
      reqrolelist: "role/requestlist",
      requestuser: "manage/requestuser",
      requesttotal: "manage/requesttotal",
    }),
    clear() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    addone() {
      if (this.form.username && this.form.password) {
        httpuseradd(this.form).then((res) => {
          if (res.data.code) {
            this.requestuser();
            this.add.show = false;
            this.clear();
            this.requesttotal();
            success(res.data.msg);
          } else {
            warning(res.data.msg);
          }
        });
      }else{
        warning('请输入内容')
      }
    },
    getone(uid) {
      this.hide = false;
      httpuserinfo(uid).then((res) => {
        this.form = res.data.list;
      });
    },
    edit() {
      httpuseredit(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.requestuser();
          this.add.show=false
          this.clear();
        } else {
          warning(res.data.msg);
        }
      });
    },
    close() {
      (this.add.show = false), this.clear();
    },
    regusername() {
      if (!usernamereg().test(this.form.username)) {
        warning("请输入正确的用户名，只能是英文字母");
      }
    },
    regpassword() {
      if (!passreg().test(this.form.password)) {
        warning("请输入6-12位的数字和字母的密码");
      }
    },
    closed(){
      this.clear()
    }
  },
  mounted() {
    this.reqrolelist();
  },
};
</script>

<style>
</style>