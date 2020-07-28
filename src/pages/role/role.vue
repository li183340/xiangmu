<template>
  <div>
    <el-button type="primary" @click='add2'>添加</el-button>
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
        show:false,
        title:'角色添加',
        isAdd:true
      }
    }
  },
  methods:{
    edit(id){
      console.log(id)
      this.add.show=true;
      this.add.title='角色编辑';
      this.add.isAdd=false;
      this.$refs.edit.getinfo(id)
    },
    add2(){
      this.add={
        show:true,
        title:'角色添加',
        isAdd:true
      }
    }
  }
}
</script>

<style>
</style>