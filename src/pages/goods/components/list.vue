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
      <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src='$img+scope.row.img' style="width:100%">
        </template>
        
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
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

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="pages"
      style="float:right"
    ></el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { success, warning } from "../../../util/alert";
import {httpgoodsedit,httpgoodsdelete} from '../../../util/request'
export default {
  data(){
    return {
      
    }
  },
  computed:{
    ...mapGetters({
       list:'goods/list',
       page:'goods/page',
       size:'goods/size',
       total:'goods/total',
       
    })
  },
  methods:{
    ...mapActions({
      requestlist:'goods/requestlist',
      requesttotal:'goods/requesttotal',
      changepage:'goods/changepage'
    }),
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpgoodsdelete(id).then((res) => {
            if (res.data.code == 200) {
              this.pages()
              this.requestlist();
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
    },
    pages(a){
      this.changepage(a)
      this.requestlist()
      
    }
  },
  mounted(){
    this.requestlist()
    this.requesttotal()
  }
}
</script>

<style>

</style>