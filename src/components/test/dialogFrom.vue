<template>
  <div>

    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
      @close='closeM'
    >
      <el-form
        :model="form"
        ref="formRef"
      >
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop='name'
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="活动区域"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.region"
            placeholder="请选择活动区域"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form -->
    <el-button
      type="text"
      @click="dialogFormVisible = true"
    >打开嵌套表单的 Dialog</el-button>
    你好
  </div>
</template>
<script>
export default {
  data() {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    closeM: function () {
      // alert('你好 ')
      // this.$refs.formRef.resetFields()
    }
  }

}
</script>
<style scoped>
</style>