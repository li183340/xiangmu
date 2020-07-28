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
      <el-table-column prop="id" label="用户编号" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change='pages'></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { httpuserdelete, httpusercount } from "../../../util/request";
import { success, warning } from "../../../util/alert";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      total:'manage/total',
      page:'manage/page',
      size:'manage/size'
    }),
  },
  methods: {
    ...mapActions({
      requestuser: "manage/requestuser",
      requesttotal:"manage/requesttotal",
      changepage:'manage/changepage'
    }),

    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpuserdelete(uid).then((res) => {
            if (res.data.code == 200) {
              this.requestuser();
              this.requesttotal()
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

    edit(uid) {
      this.$emit("edit", uid);
    },
    
    pages(a){
        this.changepage(a)
        this.requestuser()
    }
  },
  mounted() {
    this.requestuser();
    this.requesttotal();
    
  },
};
</script>

<style>
</style>