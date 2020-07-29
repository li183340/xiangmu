<template>
  <div>
    <el-dialog :title="add.title" :visible.sync="add.show" @closed="closed">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限">
          <el-date-picker
            v-model="times"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['', '']"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="cates">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option v-for="item in cate" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="catestow">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in catechildren"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in goodsid"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
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
          <el-button type="primary" @click="add1" v-if="add.isAdd">添加</el-button>
          <el-button type="primary" @click="edit" v-else>编辑</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { httpseckadd, httpseckedit, httpseckinfo } from "../../../util/request";
import { success, warning } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["add"],
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: 0,
        second_cateid: 0,
        goodsid: 0,
        status: 1,
      },
      catechildren: [],
      times: [],
      fid: 1,
      sid: 1,
      goodsid: [],
    };
  },
  computed: {
    ...mapGetters({
      cate: "cate/list",
      goods: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      catelist: "cate/requestlist",
      goodslist: "goods/requestlist",
      requestlist: "seckill/requestlist",
    }),
    close() {
      this.add.show = false;
      this.clear();
    },
    clear() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: 0,
        second_cateid: 0,
        goodsid: 0,
        status: 1,
      };
    },
    add1() {
      if (this.form.title && this.form.begintime && this.form.endtime) {
        this.form.begintime = this.times[0].getTime();
        this.form.endtime = this.times[1].getTime();
        httpseckadd(this.form).then((res) => {
          if (res.data.code == 200) {
            success(res.data.msg);
            this.add.show = false;
            this.clear();
            this.requestlist();
          }
        });
      } else {
        warning("请输入内容");
      }
    },
    getone(id) {
      httpseckinfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.times.push(new Date(parseInt(this.form.begintime)));
        this.times.push(new Date(parseInt(this.form.endtime)));
      });
    },
    edit() {
      this.form.begintime = this.times[0].getTime();
      this.form.endtime = this.times[1].getTime();
      httpseckedit(this.form).then(res=>{
        if(res.data.code==200){
          success(res.data.msg)
          this.close()
          this.requestlist()
        }else{
          warning(res.data.msg)
        }
      })

    },
    cates(id) {
      this.form.second_cateid = 0;
      this.form.goodsid = 0;
      this.goodsid = [];
      this.fid = id;
      this.cate.forEach((item) => {
        if (item.id == id) {
          this.catechildren = item.children;
        }
      });
    },
    catestow(id) {
      this.form.goodsid = 0;
      this.goodsid = [];
      this.sid = id;
      this.goods.forEach((item) => {
        if (item.first_cateid == this.fid && item.second_cateid == this.sid) {
          this.goodsid.push(item);
        }
      });
    },
    closed() {
      this.clear();
      this.times = [];
    },
  },
  mounted() {
    this.catelist();
    this.goodslist(true);
  },
};
</script>

<style>
</style>