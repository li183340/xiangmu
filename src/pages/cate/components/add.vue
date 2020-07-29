<template>
  <div class="box">
    <el-dialog :title="add.title" :visible.sync="add.show" @closed='closed'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.catename" @blur="regcatename"></el-input>
        </el-form-item>

        <el-form-item label="图片" v-if="form.pid!==0">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="pic">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { httpcateadd, httpcateedit, httpcateinfo } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { success, warning } from "../../../util/alert";
import { stringreg } from "../../../util/reg";

export default {
  props: ["add"],
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },

      imageUrl: "",
    };
  },
  methods: {
    ...mapActions({
      requestlist: "cate/requestlist",
    }),
    pic(a) {
      let reg = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
      let extname = a.name.slice(a.name.lastIndexOf("."));
      if (reg.test(extname)) {
        if (a.size < 2 * 1024 * 1024) {
          this.imageUrl = URL.createObjectURL(a.raw);
          this.form.img = a.raw;
        } else {
          warning("图片不能大于2M");
        }
      } else {
        warning("只能上传图片哦");
      }
    },
    clear() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
    },

    add1() {
      if (this.form.ctaename) {
        httpcateadd(this.form).then((res) => {
          this.add.show = false;
          this.requestlist();
        });
      }else{
        warning('请输入内容')
      }
    },

    getone(id) {
      httpcateinfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$img + this.form.img;
      });
    },

    edit() {
      httpcateedit(this.from).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.clear();

          this.add.show = false;
        } else {
          warning(res.data.msg);
        }
      });
    },

    close() {
      this.add.show = false;
      this.add.isAdd = true;
      this.clear();
    },

    regcatename() {
      if (!stringreg().test(this.form.catename)) {
        warning("请输入汉字和字母");
      }
    },

    closed(){
      this.clear()
    }
  },

  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
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