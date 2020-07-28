<template>
  <div class="box">
    <el-dialog :title="add.title" :visible.sync="add.show" @opened="wangeditor">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="cates">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="(item) in cate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in catechildren"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname" ></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" @blur="regprice"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price" @blur="regmarket_price"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="pic">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" placeholder="请选择" @change="specs">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option v-for="item in spec" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" multiple placeholder="请选择">
            <el-option v-for="item in specattrs" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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

        <el-form-item label="商品描述">
          <div id="text"></div>
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
import {
  httpgoodsadd,
  httpgoodsinfo,
  httpgoodsedit,
  httpgoodslist,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { success, warning } from "../../../util/alert";
import { numberreg } from "../../../util/reg";

import E from "wangeditor";
export default {
  props: ["add"],
  data() {
    return {
      imageUrl: "",
      catechildren: [],
      specattrs: [],
      editor: null,
      form: {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      catelist: "cate/requestlist",
      speclist: "spec/requestlist",
      requestlist: "goods/requestlist",
      requesttotal: "goods/requesttotal",
    }),
    close() {
      this.add.show = false;
      this.clear();
    },
    clear() {
      this.form = {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },
    add1() {
      if (
        this.form.goodsname &&
        this.form.price &&
        this.form.market_price &&
        this.form.description &&
        this.form.specsattr
      ) {
        this.form.specsattr = JSON.stringify(this.form.specsattr);
        this.form.description = this.editor.txt.html();
        httpgoodsadd(this.form).then((res) => {
          console.log(this.form, "777777777");
          if (res.data.code == 200) {
            success(res.data.msg);
            this.close();
            this.requestlist();
            this.requesttotal();
          }
        });
      }else{
        warning('请输入内容')
      }
    },
    pic(a) {
      this.imageUrl = URL.createObjectURL(a.raw);
      this.form.img = a.raw;
    },
    cates(id) {
      this.cate.forEach((item) => {
        if (item.id == id) {
          this.catechildren = item.children;
        }
      });
    },
    specs(id) {
      this.form.specsattr = [];
      this.spec.forEach((item) => {
        if (item.id == id) {
          this.specattrs = item.attrs;
        }
      });
    },
    getone(id) {
      httpgoodsinfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.form.specsattr = JSON.parse(this.form.specsattr);
        this.imageUrl = this.$img + this.form.img;
        console.log(this.imageUrl);
      });
    },
    edit() {
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      httpgoodsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.requestlist();
          this.close();
        } else {
          warning(res.data.msg);
        }
      });
    },
    wangeditor() {
      this.editor = new E("#text");
      this.editor.create();
      this.editor.txt.clear();
    },

    regprice(){
      if(!numberreg().test(this.form.price)){
          warning('请输入数字')
      }
    },

    regmarket_price(){
     if(!numberreg().test(this.form.market_price)){
          warning('请输入数字')
      }
    }
  },
  computed: {
    ...mapGetters({
      cate: "cate/list",
      spec: "spec/list",
    }),
  },
  mounted() {
    this.catelist();
    this.speclist(true);
  },
};
</script>

<style scoped lang='stylus'>
.box >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.box >>> .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>