<template>
  <div>
    <el-button type="primary" @click='adds'>添加</el-button>
    <v-add :add='add' ref='edit'></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  components:{
    vAdd,
    vList
  },
  data(){
    return {
      add:{
        title:"管理员添加",
        show:false,
        isAdd:true
      }
    }
  },
  methods:{
    adds(){
      this.add.show=true;
      
    },
    edit(uid){
      this.add.title="管理员修改";
        this.add.show=true;
        this.add.isAdd=false;
        this.$refs.edit.getone(uid)
    }
  },
  
}
</script>

<style>

</style>