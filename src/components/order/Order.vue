<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索框   style="margin-top: 15px"-->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input
            placeholder="请输入内容"
            v-model="querInfo.query"
            class="input-with-select"
            clearable
            @clear="getOrderList"
            @keyup.enter.native="getOrderList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 数据区 -->
      <el-table :data="orderList" style="width: 100%" border strip>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status == 1" type="success"
              >已付款</el-tag
            >
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat('YYYY-mm-dd HH:MM') }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
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
            <!-- 进度 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="进度"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                size="mini"
                type="success"
                icon="el-icon-location-outline"
                @click="showProgress(scope.row.order_id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 对话框区 -->
    <!-- 物流进度 -->
    <el-dialog
      title="物流进度"
      :visible.sync="progressDialogVisible"
      width="50%"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in Logistics"
          :key="index"
          :timestamp="activity.ftime"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      querInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderList: [],
      progressDialogVisible: false,
      Logistics: [],
    }
  },
  created() {
    this.getOrderList()
  },
  computed: {},
  methods: {
    async getOrderList() {
      const { data } = await this.$http.get('orders', { params: this.querInfo })
      if (data.meta.status != 200) {
        return this.$message.error(data.meta.msg)
      }
      console.log(data.data)
      this.orderList = data.data.goods
      this.total = data.data.total
      this.$message.success(data.meta.msg)
    },

    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize
      this.getOrderList()
    },
    // 监听pagenumber 的变化
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage
      this.getOrderList()
    },
    async showProgress(id) {
      this.Logistics = []
      this.progressDialogVisible = true
      const { data } = await this.$http.get(`/kuaidi/${1106975712662}`)
      if (data.meta.status != 200) {
        return this.$message.error(data.meta.message)
      }
      this.Logistics = data.data
      this.$message.success(data.meta.message)
      console.log(data)
      console.log(id)
    },
  },
}
</script>
<style scoped></style>
