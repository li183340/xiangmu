<template>
  <div>
    <el-dialog :title="add.title" :visible.sync="add.show" @closed='closed'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-input v-model="attrs"></el-input>
          <el-button type="primary" @click="addattrs">新增规格属性</el-button>
        </el-form-item>

        <el-form-item label="规格属性" v-for="(item,index) in form.attrs" :key="index">
          <el-input v-model="form.attrs[index]"></el-input>
          <el-button type="danger" @click="del(index)">删除</el-button>
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
          <el-button type="primary" v-if="add.isAdd" @click="add2">添加</el-button>
          <el-button type="primary" v-else @click="edit">编辑</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  httpspecsadd,
  httpspecsedit,
  httpspecsinfo,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { success, warning } from "../../../util/alert";
export default {
  props: ["add"],
  data() {
    return {
      attrs: "",
      form: {
        specsname: "",
        attrs: [],
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestlist: "spec/requestlist",
      requesttotal: "spec/requesttotal",
    }),
    close() {
      this.add.show = false;
      this.clear();
    },
    clear() {
      this.form = {
        specsname: "",
        attrs: [],
        status: 1,
      };
    },
    addattrs() {
      if (this.attrs) {
        this.form.attrs.push(this.attrs);
        this.attrs = "";
      }
    },
    del(index) {
      this.form.attrs.splice(index, 1);
      console.log(this.form.attrs);
    },
    add2() {
      if (this.form.specsname && this.form.attrs) {
        this.form.attrs = JSON.stringify(this.form.attrs);
        httpspecsadd(this.form).then((res) => {
          if (res.data.code == 200) {
            success(res.data.msg);
            this.clear();
            this.add.show = false;
            this.requestlist();
            this.requesttotal();
          } else {
            this.del();
            warning(res.data.msg);
          }
        });
      }else{
        warning('请输入内容')
      }
    },
    getone(id) {
      httpspecsinfo(id).then((res) => {
        this.form = res.data.list[0];
        this.form.attrs = JSON.parse(res.data.list[0].attrs);
      });
    },
    edit() {
      this.form.attrs = JSON.stringify(this.form.attrs);
      httpspecsedit(this.form).then((res) => {
        if (res.data.code==200) {
          success(res.data.msg);
          this.add.show = false;
          this.requestlist()
          this.clear();
        } else {
          warning(res.data.msg);
        }
      });
    },
    closed(){
      this.clear()
    }
  },
};
</script>

<style>
</style>