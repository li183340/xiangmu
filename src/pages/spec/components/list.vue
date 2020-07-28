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
      <el-table-column prop="id" label="规格编号" width="80"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="scope">
          <span v-for='item in scope.row.attrs' :key='item' class="attrs">{{item}}</span>
        </template>
      </el-table-column>

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

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="pages"
    ></el-pagination>
  </div>
</template>

<script>
import { httpspecsdelete, httpspecsedit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { success, warning } from "../../../util/alert";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestlist: "spec/requestlist",
      requestpage: "spec/requestpage",
      requesttotal: "spec/requesttotal",
    }),

    pages(a) {
      this.requestpage(a);
      this.requestlist();
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpspecsdelete(id).then((res) => {
            if (res.data.code == 200) {
              this.requestlist();
              this.pages()
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
    edit(id){
      this.$emit('edit',id)
    }
  },
  computed: {
    ...mapGetters({
      list: "spec/list",
      page: "spec/page",
      total: "spec/total",
      size: "spec/size",
    }),
    
  },
  mounted() {
    this.requestlist();
    this.requesttotal();
  },
};
</script>

<style scoped>
.attrs{
  display: inline-block;
  color:#409eff;
  padding: 5px 10px;
  background: #ecf5ff;
  border:1px solid #d9ecff;
  border-radius: 5px;
}
</style>