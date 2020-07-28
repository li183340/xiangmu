<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="title" label="活动名称" width="80"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {httpseckdelete} from '../../../util/request'
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return {
            
        }
    },
    computed:{
        ...mapGetters({
            list:'seckill/list'
        })
    },
    methods:{
        ...mapActions({
            requestlist:'seckill/requestlist'
        }),
        edit(id){
          this.$emit('edit',id)
        },
         del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpseckdelete(id).then((res) => {
            if (res.data.code == 200) {
              if (this.list.length > 0) {
                this.requestlist();
              }
            } else {
              warning(res.data.msg);
            }
          });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    },
    mounted(){
        this.requestlist()
    }
};
</script>

<style>
</style>