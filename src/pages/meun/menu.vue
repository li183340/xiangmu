<template>
  <div>
    <el-button type="primary" @click="adds">添加</el-button>
    <v-add :add="add" ref="child"></v-add>
    <v-table @aa="edit"></v-table>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vTable from "./components/table";
export default {
  components: {
    vAdd,
    vTable,
  },
  data() {
    return {
      add: {
        show: false,
        title: "菜单添加",
        isAdd: true,
      },
    };
  },
  methods: {
    edit(id) {
      this.add.show = true;
      this.$refs.child.getDetail(id);
      this.add.show = true;
      this.add.title = "菜单编辑";
    },
    adds() {
      this.add = {
        show: true,
        title: "菜单添加",
        isAdd: true,
      };
    },
  },
};
</script>

<style scoped>
</style>