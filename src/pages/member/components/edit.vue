<template>
  <div>
    <el-dialog :title="add.title" :visible.sync="add.show">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" @blur="regphone"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input placeholder="请输入密码" clearable show-password v-model="form.password"></el-input>
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
          <el-button type="primary" @click="edit">修改</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { httpmemberinfo ,httpmemberedit} from "../../../util/request";
import { success, warning } from "../../../util/alert";
import { telreg } from "../../../util/reg";

export default {
  props: ["add"],
  data() {
    return {
      form: {
        status:1,
      },
    };
  },
  methods: {
    getone(uid) {
      httpmemberinfo(uid).then((res) => {
        this.form = res.data.list;
        
      });
    },
    close(){
        this.add.show=false;
        this.form={
            status:1,
        }
    },
    edit(){
      
        httpmemberedit(this.form).then(res=>{
                if(res.data.code==200){
                    success(res.data.msg)
                    this.add.show = false
                }else{
                    warning(res.data.msg)
                }
        })
    },
    regphone(){
      if(!telreg().test(this.form.phone)){
        warning('请输入正确的手机号')
      }
    }
  },
};
</script>

<style>
</style>