<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 操作栏 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showCatDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 数据列表 -->
      <el-table
        :data="catelist"
        style="width: 100%"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" width="180">
          <template slot-scope="scope">
            <i
              v-if="!scope.row.cat_deleted"
              class="el-icon-circle-check"
              style="color: lightgreen"
            ></i>
            <i v-else class="el-icon-circle-close" style="color: red"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0" size="small">一级</el-tag>
            <el-tag
              v-else-if="scope.row.cat_level === 1"
              size="small"
              type="success"
              >二级</el-tag
            >
            <el-tag v-else size="small" type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
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
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCatdialogVisible"
      width="50%"
      @close="closeAddCat"
    >
      <el-form
        :model="addCatForm"
        :rules="addCatFormRules"
        ref="addCatFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCatForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- options 指定数据源 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="props"
            style="width: 100%"
            clearable
            @change="parentCatChanged"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addCatdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 商品分类列表
      catelist: [],
      // 数据总条数
      total: 0,
      // 控制添加分类对话框的显示
      addCatdialogVisible: false,
      // 添加分类的表单数据对象
      addCatForm: {
        // 将要添加的分类名称
        cat_name: '',
        // 父级的分类id
        cat_pid: 0,
        // 分类的等级
        cat_level: 0,
      },
      // 父级分类的列表
      parentCateList: [],
      //选中的父级分类的id 数组
      selectedKeys: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true,
      },
      // 添加分类的验证规则
      addCatFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data } = await this.$http.get('categories', {
        params: this.querInfo,
      })
      if (data.meta.status !== 200) {
        return this.$message.error('获取商品分类列表数据失败')
      }
      this.catelist = data.data.result
      this.total = data.data.total
      console.log(data.data)
    },
    // 获取商品分类数据列表
    async getParentCateList() {
      const { data } = await this.$http.get(`categories`, {
        params: { type: 2 },
      })
      if (data.meta.status != 200) {
        return this.message.error('获取数据失败')
      }
      this.parentCateList = data.data
      console.log(this.parentCateList)
    },
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听pagenumber 的变化
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage
      this.getCateList()
    },
    showCatDialog() {
      // 先获取分类数据列表
      this.getParentCateList()
      this.addCatdialogVisible = true
    },
    // 关闭添加对话的回调
    closeAddCat() {
      // 重置表单数据
      this.$refs.addCatFormRef.resetFields()
      // 手动重置
      this.selectedKeys = []
      this.addCatForm.cat_level = 0
      this.addCatForm.cat_pid = 0
    },
    // 选中发生变化的函数
    parentCatChanged() {
      // console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
        // 父级分类的id
        this.addCatForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        // 为当前分类的等级
        this.addCatForm.cat_level = this.selectedKeys.length
        return
      } else {
        // 父级分类的id
        this.addCatForm.cat_pid = 0
        // 为当前分类的等级
        this.addCatForm.cat_level = 0
      }
    },
    // 添加新分类
    async addCat() {
      this.$refs.addCatFormRef.validate(async (valid) => {
        if (!valid) return
        const { data } = await this.$http.post('categories', this.addCatForm)
        if (data.meta.status != 201) {
          return this.$message.error('添加数据失败')
        }
        this.$message.success('添加数据成功')
        this.getCateList()
        this.addCatdialogVisible = false
      })
      // console.log(this.addCatForm)
    },
  },
}
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-table {
  margin-top: 15px;
}
</style>
