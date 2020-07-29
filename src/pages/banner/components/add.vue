<template>
  <div class="box">
    <el-dialog :title="add.title" :visible.sync="add.show" @closed='closed'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="图片">
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
          <el-button type="primary" @click="edit" v-else>修改</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  httpbanneradd,
  httpbannerinfo,
  httpbanneredit,
} from "../../../util/request";
import { success, warning } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["add"],
  data() {
    return {
      imageUrl: "",
      form: {
        title: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      requestlist: "banner/requestlist",
    }),
    close() {
      this.add.show = false;
      this.clear();
    },
    clear() {
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.imageUrl = "";
    },
    add1() {
      if (this.form.title && this.form.img) {
        httpbanneradd(this.form).then((res) => {
          if (res.data.code == 200) {
            success(res.data.msg);
            this.close();
            this.requestlist();
          } else {
            warning(res.data.msg);
          }
        });
      }else{
        warning('请输入内容')
      }
    },
    pic(a) {
      let reg = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
      let extname = a.name.slice(a.name.lastIndexOf("."));
      if (reg.test(extname)) {
        this.imageUrl = URL.createObjectURL(a.raw);
        this.form.img = a.raw;
      } else {
        warning("只能上传图片哦");
      }
    },
    getone(id) {
      httpbannerinfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id
        this.imageUrl = this.$img + this.form.img;
        console.log(this.form)
      });
    },
    edit() {
      
      httpbanneredit(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.close();
          this.requestlist();
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