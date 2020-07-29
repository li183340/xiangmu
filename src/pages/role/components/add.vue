<template>
  <div>
    <el-dialog :title="add.title" :visible.sync="add.show" @closed='closed'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename" @blur="regrolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            :data="menuslist"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
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
          <el-button type="primary" @click="add1" v-if="add.isAdd">添加</el-button>
          <el-button type="primary" @click="edit" v-else>修改</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { httproleadd, httproleinfo, httproleedit } from "../../../util/request";
import { success, warning } from "../../../util/alert";
import { mapActions, mapGetters } from "vuex";
import { stringreg, numberreg } from "../../../util/reg";

export default {
  props: ["add"],

  computed: {
    ...mapGetters({
      menuslist: "meun/list",
      list: "role/list",
    }),
  },

  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultKey: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },

  methods: {
    ...mapActions({
      requestlist: "role/requestlist",
      requestmeunList: "meun/requestmeunList",
    }),

    empit() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.defaultKey = [];
    },

    add1() {
      if (this.form.rolename) {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        httproleadd(this.form).then((res) => {
          if (res.data.code == 200) {
            this.empit();
            success(res.data.msg);
            this.add.show = false;
            this.requestlist();
          } else {
            warning(res.data.msg);
          }
        });
      }else{
        warning('输入的内容不能为空')
      }
    },

    close() {
      this.add.show = false;
      this.empit();
    },
    getinfo(id) {
      httproleinfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.defaultKey = JSON.parse(res.data.list.menus);
      });
    },

    edit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      httproleedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.requestlist();
          this.add.show = false;
          success(res.data.msg);
        } else {
          warning(res.data.msg);
        }
      });
    },
    regrolename() {
      if (!stringreg().test(this.form.rolename)) {
        warning("请输入正确的角色名称，不能包含数字");
      }
    },
    closed(){
      this.empit()
    }
  },
  mounted() {
    this.requestmeunList();
  },
};
</script>

<style scoped>
</style>