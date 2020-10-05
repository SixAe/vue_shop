<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 警告区域 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 商品分类 -->
      <el-row class="cat_opt">
        <el-col>
          <span>请选择商品分类：</span>
          <!-- 级联选择框 -->
          <el-cascader
            v-model="selectCateKeys"
            :options="cateList"
            :props="props"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 静态参数面板 -->
        <el-tab-pane label="静态属性" name="many">
          <el-button
            size="mini"
            type="primary"
            :disabled="isBtnDisabled"
            @click="addParams"
            >添加属性</el-button
          >
          <!-- 表格主体 -->
          <el-table ref="manyRef" :data="manyList" border style="width: 100%">
            <el-table-column type="expand">
              <!-- tag 标签 -->
              <template slot-scope="scope">
                <el-tag
                  :key="id"
                  v-for="(tag, id) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(id, scope.row)"
                >
                  {{ tag }}
                </el-tag>
                <!-- 添加标签 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <!-- 添加的按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
            <el-table-column property="attr_name" label="参数名字">
            </el-table-column>
            <el-table-column label="操作">
              <el-button size="mini" type="primary" icon="el-icon-edit"
                >编辑</el-button
              >
              <el-button size="mini" type="danger" icon="el-icon-delete"
                >删除</el-button
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 参数面板 -->
        <el-tab-pane label="动态参数" name="only">
          <el-button
            size="mini"
            type="primary"
            :disabled="isBtnDisabled"
            @click="addParams"
            >添加参数</el-button
          >
          <!-- 表格主体 -->
          <el-table ref="onlyRef" :data="onlyList" border style="width: 100%">
            <el-table-column type="expand">
              <!-- tag 标签 -->
              <template slot-scope="scope">
                <el-tag
                  :key="id"
                  v-for="(tag, id) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(id, scope.row)"
                >
                  {{ tag }}
                </el-tag>
                <!-- 添加标签 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <!-- 添加的按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
            <el-table-column property="attr_name" label="参数名字">
            </el-table-column>
            <el-table-column label="操作">
              <el-button size="mini" type="primary" icon="el-icon-edit"
                >编辑</el-button
              >
              <el-button size="mini" type="danger" icon="el-icon-delete"
                >删除</el-button
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 主体内容 -->
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="ruleFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cateList: [],
      //选中的数组
      selectCateKeys: [],
      // 级联选择框的配置对象
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
      },
      activeName: 'many',
      // 静态属性
      onlyList: [],
      // 动态参数
      manyList: [],
      // 控制对话框的显隐
      dialogVisible: false,
      // 添加参数的表单对象
      addForm: {
        attr_name: '',
      },
      // 表单的验证规则对象
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
        ],
      },
      // 控制按钮于文本框的显示
      inputVisible: false,
      inputValue: '',
    }
  },
  created() {
    this.getCatList()
  },
  computed: {
    isBtnDisabled() {
      if (this.selectCateKeys.length != 3) {
        return true
      }
      return false
    },
    titleText() {
      if (this.activeName == 'many') {
        return '静态属性'
      } else {
        return '动态参数'
      }
    },
  },
  methods: {
    async getCatList() {
      const { data } = await this.$http.get('categories')
      if (data.meta.status != 200) {
        return this.$message.error('获取数据失败')
      } else {
        this.cateList = data.data
      }
    },
    // 获取参数列表
    getCatattributes() {
      // 证明选中的不是三级分类
      if (this.selectCateKeys.length != 3) {
        this.selectCateKeys = []
        // 重置面板页面的数据
        this.onlyList = []
        this.manyList = []
        return
      } else {
        console.log(this.selectCateKeys)
      }
      // 当前选中的三级分类id
      var id = this.selectCateKeys[2]
      this.$http
        .get(`categories/${id}/attributes`, {
          params: {
            sel: this.activeName,
          },
        })
        .then((data) => {
          if (data.data.meta.status != 200) {
            return this.$message.error('获取数据失败')
          } else {
            this.$message.success('获取数据成功')

            // 将标签的字符串转换成数组
            data.data.data.forEach((item) => {
              item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
              // 控制文本框的显示和隐藏
              item.inputVisible = false
              // 文本框中输入的值
              item.inputValue = ''
            })
            if (this.activeName === 'only') {
              this.onlyList = data.data.data
              // console.log(data.data);
              console.log(this.onlyList)
            } else {
              this.manyList = data.data.data
              console.log(this.manyList)
            }
          }
        })
    },
    // 级联选择框选中变化的触发函数
    handleChange() {
      this.getCatattributes()
    },
    // tab 页签切换事件
    handleTabClick() {
      this.getCatattributes()
      // console.log(this.activeName)
    },
    // 添加属性事件
    addParams() {
      this.dialogVisible = true
    },
    // 关闭对话框，重置表单
    addDialogClosed() {
      this.$refs.ruleFormRef.resetFields()
    },
    // 保存添加的属性
    saveParams() {
      //
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        console.log(this.selectCateKeys[2])
        console.log(this.addForm)
        const { data } = await this.$http.post(
          `categories/${this.selectCateKeys[2]}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName,
          }
        )
        console.log(data)
        if (data.meta.status != 201) {
          return this.$message.error('添加失败')
        }
        this.$message.success('添加参数成功')
        this.getCatattributes()
        this.dialogVisible = false
      })
    },
    // 文本框失去焦点，或者按下enter 都会触发
    // 参数项
    async handleInputConfirm(row) {
      console.log('ok')
      if (row.inputValue.trim().length == 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 暂时存储，需要发起网络请求，保存到数据库中
      row.attr_vals.push(row.inputValue.trim())
      //网络请求
      this.saveAttrVals(row)
      // this.getCatattributes()
      // 重置初始状态
      row.inputValue = ''
      row.inputVisible = false
    },
    async saveAttrVals(row) {
      const { data } = await this.$http.put(
        `categories/${this.selectCateKeys[2]}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' '),
        }
      )
      if (data.meta.status != 200) {
        return this.$message.error('修改参数项数据失败')
      }
      this.$message.success('修改数据项成功')
    },
    // 点击按钮显示文本输入框
    showInput(row) {
      row.inputVisible = true
      // nextTick 作用：当页面上的元素被重新渲染之后，才会执行回调函数之中的代码
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 关闭标签的处理
    handleClose(id, row) {
      row.attr_vals.splice(id, 1)
      this.saveAttrVals(row)
    },
  },
}
</script>
<style scoped>
.cat_opt {
  margin: 15px 0;
}
.el-tag {
  margin: 0 5px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
