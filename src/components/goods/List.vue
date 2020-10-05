<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索框   style="margin-top: 15px"-->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input
            placeholder="请输入内容"
            v-model="querInfor.query"
            class="input-with-select"
            clearable
            @clear="getGoodsList"
            @keyup.enter.native="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="goodsList" style="width: 100%" border strip>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="90"
        ></el-table-column>
        <el-table-column label="创建时间" width="140">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat('YYYY-mm-dd HH:MM') }}
            <!-- {{ scope.row.add_time | formatTimer('hours') }} -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="editDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="delById(scope.row.goods_id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfor.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="querInfor.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      querInfor: {
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
      // 商品列表
      goodsList: [],
      // 总数据条数
      total: 0,
    }
  },
  created() {
    this.getGoodsList()
  },
  computed: {},
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data } = await this.$http.get(`goods`, { params: this.querInfor })
      if (data.meta.status != 200) {
        return this.$message.error('获取商品列表失败')
      }
      this.$message.success('获取商品列表成功')
      console.log(data.data)
      this.goodsList = data.data.goods
      this.total = data.data.total
      console.log(this.total)
    },
    // 只要触发了,就可以拿到pagesize
    handleSizeChange(newSize) {
      this.querInfor.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.querInfor.pagenum = newPage
      this.getGoodsList()
    },
    delById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return this.$http.delete(`goods/${id}`)
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
        .then((data) => {
          var res = data.data
          if (res.meta.status != 200) {
            return this.$message.error('删除用户失败')
          }
          this.$message.success('删除成功!')
          this.getGoodsList()
        })
    },
    goAddpage() {
      this.$router.push('/goods/add')
    },
  },
}
</script>
<style scoped></style>
