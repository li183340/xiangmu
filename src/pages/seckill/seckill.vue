<template>
  <div>
    <el-button type="primary" @click='add1'>添加</el-button>
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
        title:'限时秒杀添加',
        isAdd:true
      }
    }
  },
  methods:{
    add1(){
      this.add.show=true
      this.add.title='限时秒杀添加'
      this.add.isAdd = true
    },
    edit(id){
      this.add.show =true;
      this.add.title='限时秒杀编辑';
      this.add.isAdd = false
      this.$refs.edit.getone(id)
    }
  }
}
</script>

<style>

</style>