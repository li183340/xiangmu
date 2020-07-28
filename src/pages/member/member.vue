<template>
  <div>
    <v-list @edit='edit'></v-list>
    <v-edit :add='add' ref='edit'></v-edit>
  </div>
</template>

<script>
import vEdit from './components/edit'
import vList from './components/list'
export default {
  components:{
    vEdit,
    vList
  },
  data(){
    return {
      add:{
          show:false,
          title:"会员修改",
      }
    }
  },
  methods:{
    edit(uid){
      this.add.show=true;
      this.$refs.edit.getone(uid)
    }
  }
}
</script>

<style>

</style>