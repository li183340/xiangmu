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
        title:'商品添加',
        isAdd:true

      }
    }
  },
  methods:{
    add2(){
      this.add.show=true
      this.add.title='商品添加'
      this.add.isAdd=true
    },
    edit(id){
      this.add.show=true;
      this.add.title="商品修改";
      this.add.isAdd = false
      this.$refs.edit.getone(id)
    }
  }
}
</script>

<style>

</style>