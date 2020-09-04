<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input
              placeholder="请输入内容"
              class="input-with-select"
              v-model="querInfor.query"
              clearable
            >
              <el-button slot="append" icon="el-icon-search" @click="querySearch"></el-button>
            </el-input>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
            <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="closeDialog">
              <el-form :model="ruleForm" :rules="addUserRules" ref="addUserRef" label-width="100px">
                <el-form-item label="用户名称" prop="username">
                  <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                  <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
      </div>
      <el-table :data="userList" style="width: 100%" border strip>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 拿到这一行的数据 -->
            <!-- {{ scope.row. }} -->
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="stateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
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
              <!-- 修改用户弹框 -->
            </el-tooltip>
            <el-dialog
              title="修改用户"
              :visible.sync="editdialogVisible"
              width="50%"
              @close="closeEditDialog"
            >
              <el-form
                :model="editForm"
                :rules="editUserRules"
                ref="editUserRef"
                label-width="100px"
              >
                <el-form-item label="用户名称" prop="username">
                  <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
              </span>
            </el-dialog>
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
                @click="delUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top-start"
              :enterable="false"
            >
              <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfor.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="querInfor.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!reg.test(value)) {
        // callback(this.$message.error('添加失败'))
        callback(new Error('邮箱格式不正确'))
      }
      callback()
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (!reg.test(value)) {
        // callback(this.$message.error('添加失败'))
        callback(new Error('手机号码格式不正确'))
      }
      callback()
    }
    return {
      querInfor: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      editdialogVisible: false,
      ruleForm: {
        username: 'root1',
        password: '1234679',
        email: '135624585@qq.com',
        mobile: '13562457895',
      },
      editForm: {
        id: '',
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
      editUserRules: {
        email: [
          {
            validator: checkEmail,
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            validator: checkPhone,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    /* 获取用户的数据 */
    this.getUserList()
  },
  methods: {
    async getUserList() {
      /* 第一个参数是请求地址，p2:请求参数 */
      const { data } = await this.$http.get('users', { params: this.querInfor })
      // console.log(data)
      if (data.meta.status !== 200) {
        return (this.$message.error = '获取用户列表失败')
      }
      this.userList = data.data.users
      this.total = data.data.total
    },
    handleSizeChange(val) {
      this.querInfor.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.querInfor.pagenum = val
      this.getUserList()
    },
    async stateChange(val) {
      console.log(val)
      const { data } = await this.$http.put(
        `users/${val.id}/state/${val.mg_state}`
      )
      if (data.meta.status != 200) {
        val.mg_state = !val.mg_state
        return this.$message.error('更新用户信息失败')
      }
      this.$message.success('更新用户信息成功')
    },
    /* 查询用户 */
    querySearch() {
      this.getUserList()
    },
    /* 添加用户 */
    addUser() {
      // alert('add')
      // 预验证
      this.$refs.addUserRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) {
          return
        }
        const { data } = await this.$http.post('users', this.ruleForm)
        console.log(data)
        if (data.meta.status !== 201) {
          this.$message.error('添加用户失败:' + data.meta.msg)
          return
        }
        this.$message.success('添加用户成功')
        this.dialogVisible = false
        this.getUserList()
      })
    },
    /* 关闭时的方法 */
    closeDialog() {
      /* 注意使用$refs */
      this.$refs.addUserRef.resetFields()
      // ruleForm.resetField()
    },
    //修改用户信息
    editDialog(val) {
      this.editdialogVisible = true
      // console.log(val.id)
      this.editForm.id = val.id
      this.editForm.username = val.username
      this.editForm.email = val.email
      this.editForm.mobile = val.mobile
    },
    editUser() {
      this.$refs.editUserRef.validate(async (valid) => {
        if (!valid) return
        /* 验证通过后 */
        const { data } = await this.$http.put('users/' + this.editForm.id, {
          id: this.editForm.id,
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        })
        if (data.meta.status == 200) {
          this.editdialogVisible = false
          this.$message.success('修改用户成功')
          this.getUserList()
        } else {
          this.$message.error(data.meta.msg)
        }
        // console.log(data)
      })
    },
    closeEditDialog() {
      this.$refs.editUserRef.resetFields()
    },
    async delUser(val) {
      // console.log(val)
      const confResult = await this.$confirm('删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confResult != 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data } = await this.$http.delete('users/' + val, {
        params: {
          id: val,
        },
      })
      if (data.meta.status !== 200) {
        return this.$message.error('删除用户失败')
      }
      this.$message.success('删除成功!')
       this.getUserList()
      // .then(async () => {
      //   const { data } = await this.$http.delete('users/' + val, {
      //     params: {
      //       id: val,
      //     },
      //   })
      //   if (data.meta.status == 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!',
      //     })
      //     let total = this.total
      //     let pagenum = this.querInfor.pagenum
      //     // this.total this.querInfor.pagenum
      //     this.getUserList()
      //   } else {
      //     return this.$message.error('删除用户失败')
      //   }
      // })
      // .catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除',
      //   })
      // })
    },
  },
}
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
.box-card {
  background: #fff;
  /* width: 480px; */
  box-shadow: 0 0px 1px 0 rgba(0, 0, 0, 0.3) !important;
  border: 0;
}
.bg-purple {
  background: #d3dce6;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
.el-button {
  margin-left: 10px;
}
</style>
