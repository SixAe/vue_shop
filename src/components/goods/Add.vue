<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 标签页      label-position="top" 指定标签头为上 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-tabs
          v-model="activeIndex"
          tab-position="left"
          :before-leave="beforeTabLeave"
        >
          <el-tab-pane label="基本信息" name="0"
            >基本信息
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="goods_price">
              <el-input v-model.number="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="goods_number">
              <el-input v-model.number="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="重量" prop="goods_weight">
              <el-input v-model.number="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="props"
                @change="handleChange"
                style="width: 100%"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="介绍" prop="goods_introduce">
              <el-input v-model="addForm.goods_introduce"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '0',
      // 添加商品的表单数据对象
      addForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
      },
      // 添加数据的验证规则

      addFormRules: {
        goods_name: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur',
          },
        ],
        goods_price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字值', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '数量不能为空', trigger: 'blur' },
          { type: 'number', message: '数量必须为数字值', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '重量不能为空', trigger: 'blur' },
          { type: 'number', message: '重量必须为数字值', trigger: 'blur' },
        ],
        goods_cat: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      /*  分类列表数据 */
      cateList: [],
      // 级联的配置对象
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover',
      },
    }
  },
  created() {
    this.getCateList()
  },
  computed: {},
  methods: {
    async getCateList() {
      const { data } = await this.$http.get('categories')
      if (data.meta.status != 200) {
        return this.$message.error('获取商品分类数据失败')
      } else {
        this.cateList = data.data
        console.log(this.cateList)
      }
    },
    // 级联选择器发生变化触发的函数
    handleChange() {
      console.log(this.addForm.goods_cat)
      // 设定只能选中三级
      if (this.addForm.goods_cat.length != 3) {
        this.addForm.goods_cat = []
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      //todo. 验证表单的数据完成性,不完整 不允许跳转
      if (this.addForm.goods_cat.length != 3) {
        this.$message.error('请选择商品分类')
        return false
      }
    },
  },
}
</script>
<style scoped>
.el-steps {
  margin: 10px 0 16px 0;
}
.el-steps {
  justify-content: center;
}
</style>
