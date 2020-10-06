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
          @tab-click="tabClicked"
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
          <el-tab-pane label="商品参数" name="1"
            >商品参数
            <!-- 渲染table item项 -->
            <el-form-item
              :label="item.attr_name"
              :key="item.attr_id"
              v-for="item in manyTableDate"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="i"
                  :key="k"
                  v-for="(i, k) in item.attr_vals"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2"
            >商品属性
            <el-form-item
              :label="item.attr_name"
              :key="item.attr_id"
              v-for="item in onlyTableDate"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3"
            >商品图片
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headersObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <template>
              <!-- Two-way Data-Binding -->
              <quill-editor
                ref="myQuillEditor"
                v-model="addForm.goods_introduce"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </template>
            <el-button type="primary" @click="add" style="margin-top: 10px"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form></el-card
    >
  </div>
</template>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 弹框区 -->
    <!-- 图片预览 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewdialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <img :src="previewPath" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>
<script>
// 导入lodash 拷贝对象
import _ from 'lodash'
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
        pics: [],
        attrs: [],
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
      // 动态参数列表数据
      manyTableDate: [],
      // 静态属性列表数据
      onlyTableDate: [],
      // 图片上传的地址
      uploadUrl: `http://127.0.0.1:8888/api/private/v1/upload`,
      // 由于upload 发起的请求是内部风封装的需要自己定义请求头
      headersObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      // 文件预览的地址
      previewPath: '',
      previewdialogVisible: false,
    }
  },
  created() {
    this.getCateList()
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    },
  },
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
    async tabClicked() {
      console.log(this.activeIndex)
      switch (this.activeIndex) {
        case '1':
          const { data } = await this.$http.get(
            `categories/${this.cateId}/attributes`,
            {
              params: { sel: 'many' },
            }
          )
          if (data.meta.status != 200) {
            return
            this.$message.error('获取动态列表参数失败')
          } else {
            // 处理标签
            data.data.forEach((item) => {
              item.attr_vals =
                item.attr_vals.length == 0 ? [] : item.attr_vals.split(' ')
            })

            this.manyTableDate = data.data
            console.log(data.data)
          }
          break
        case '2':
          const { data: data2 } = await this.$http.get(
            `categories/${this.cateId}/attributes`,
            {
              params: { sel: 'only' },
            }
          )
          if (data2.meta.status != 200) {
            return
            this.$message.error('获取静态属性失败')
          } else {
            // 处理标签
            // data2.data2.forEach((item) => {
            //   item.attr_vals =
            //     item.attr_vals.length == 0 ? [] : item.attr_vals.split(' ')
            // })
            this.onlyTableDate = data2.data
            console.log(this.onlyTableDate)
          }
          break
        case '3':
          break
        case '4':
          break

        default:
          break
      }

      // if (this.activeIndex == '1') {
      //   const { data } = await this.$http.get(
      //     `categories/${this.cateId}/attributes`,
      //     {
      //       params: { sel: 'many' },
      //     }
      //   )
      //   if (data.meta.status != 200) {
      //     return
      //     this.$message.error('获取动态列表参数失败')
      //   } else {
      //     // 处理标签
      //     data.data.forEach((item) => {
      //       item.attr_vals =
      //         item.attr_vals.length == 0 ? [] : item.attr_vals.split(' ')
      //     })

      //     this.manyTableDate = data.data
      //     console.log(data.data)
      //   }
      // }
    },
    // 预览图片
    handlePreview(file) {
      console.log(file)
      this.previewPath = file.response.data.url
      this.previewdialogVisible = true
    },
    // 移除图片
    handleRemove(file) {
      // 获取要删除图片的临时路径
      const filePath = file.response.data.tmp_path
      // 从pics 数组中移除
      const i = this.addForm.pics.findIndex((item) => {
        item.pic === filePath
      })
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm)
    },
    // 上传成功的回调
    handleSuccess(response) {
      // 拼接得到图片的信息对象
      const picInfo = { pic: response.data.tmp_path }
      // 将图片信息对象push 到pics数组中
      this.addForm.pics.push(picInfo)
      console.log(this.addForm)
    },
    add() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请填写必要的表单')
        }
        // 执行业务逻辑
        // v-model中要求： goods_cat 要求是一个数组，请求参数中要求：是字符串
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')
        console.log(form)
        // 处理动态参数和静态属性
        this.manyTableDate.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' '),
          }
          this.addForm.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyTableDate.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          }
          this.addForm.attrs.push(newInfo)
        })
        form.attrs = this.addForm.attrs
        console.log(form)
        // 商品的名称必须是唯一的
        const { data } = await this.$http.post('goods', form)
        if (data.meta.status != 201) {
          return this.$message.error(data.meta.status + ':' + data.meta.msg)
        }
        this.$message.success(data.meta.msg)
        this.$router.push('/goods')
      })
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
.el-checkbox {
  margin: 0 5px 0 0 !important;
}
</style>
