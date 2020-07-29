<template>
  <div>
    <el-dialog :title="add.title" :visible.sync="add.show" @closed='closed'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title" :value="form.title" @blur="regtitle"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder>
            <el-option label="--请选择--" disabled value></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" >目录</el-radio>
          <el-radio v-model="form.type" :label="2" >菜单</el-radio>
        </el-form-item>

        <el-form-item label="目录图标" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option v-for="item in icon" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url">
            <el-option v-for="item in url" :key="item" :label="item" :value="item"></el-option>
          </el-select>
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
          <el-button type="primary" @click="addpost" v-if="add.isAdd">添加</el-button>
          <el-button type="primary" @click="edit" v-else>编辑</el-button>
          <el-button @click="off">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { httpmeunadd, httpmeunedit, httpmeuninfo } from "../../../util/request";
import { success, warning } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
import { stringreg, numberreg } from "../../../util/reg";

export default {
  props: ["add"],
  data() {
    return {
      value: true,
      url: [
        "/menu",
        "/role",
        "/manage",
        "/cate",
        "/goods",
        "/spec",
        "/member",
        "/banner",
        "/seckill",
      ],
      icon: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestmeunList: "meun/requestmeunList",
    }),
    off() {
      this.add.show = false;
      this.empty();
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    addpost() {
      if (this.form.title && (this.form.icon || this.form.url)) {
        httpmeunadd(this.form).then((res) => {
          if (res.data.code == 200) {
            res.data.list = this.form;
            this.add.show = false;
            this.empty();
            this.requestmeunList();
            success(res.data.msg);
          } else {
            warning(res.data.msg);
          }
        });
      }else{
        warning('输入的值不能为空')
      }
    },
    getDetail(id) {
      httpmeuninfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    edit() {
      httpmeunedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.requestmeunList();
          success(res.data.msg);
          this.empty();
          this.add.show = false;
        } else {
          warning(res.data.msg);
        }
      });
    },
    regtitle() {
      if (!stringreg().test(this.form.title)) {
        warning("请输入正确的菜单名称，不能包含数字");
      }
    },
    closed(){
      this.empty()
    }
  },
  computed: {
    ...mapGetters({
      list: "meun/list",
    }),
  },
  mounted() {},
};
</script>

<style>
</style>