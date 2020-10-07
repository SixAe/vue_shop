<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 600px; height: 400px"></div>
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import _ from 'lodash'
export default {
  data() {
    return {
      options: {
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
      },
      ReportsData: {},
      option: {},
    }
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 获取数据
    this.getReportsData().then(() => {
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    })
    // 指定图表的配置项和数据
  },
  computed: {},
  methods: {
    getReportsData() {
      return this.$http.get(`reports/type/1`).then((data) => {
        if (data.data.meta.status != 200) {
          return this.$message.error(data.data.meta.msg)
        }
        this.ReportsData = data.data.data
        this.option = _.merge(this.ReportsData, this.options)
        this.$message.success(data.data.meta.msg)
        console.log(data)
      })
    },
  },
}
</script>
<style scoped></style>
