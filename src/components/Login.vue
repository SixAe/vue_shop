<template>
  <div class="login_container">
    <div class="login_box">
      <div class="img_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- ref 实例对象 -->
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        class="el-form"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="form.name"
            prefix-icon="iconfont icon-user"
            class="el_input"
          ></el-input>
        </el-form-item>
        <el-form-item label="密　码" prop="pass">
          <el-input
            v-model="form.pass"
            prefix-icon="iconfont icon-3702mima"
            class="el_input"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row class="btn">
          <el-button type="primary" class="primart" @click="login('form')"
            >登录</el-button
          >
          <el-button type="info" class="info" @click="reset('form')"
            >重置</el-button
          >
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        //   // if (this.ruleForm.checkPass !== '') {
        //   //   this.$refs.ruleForm.validateField('checkPass')
        //   // }
        callback()
      }
      // console.log(value)
      // callback(new Error('请输入密码'))
    }
    return {
      form: {
        name: 'admin',
        pass: '123456'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pass: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },

  methods: {
    login: function(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const param = {
            username: this.form.name,
            password: this.form.pass
          }
          const { data, status } = await this.$http.post('login', param)
          // console.log(data)
          if (data.meta.status == 200) {
            // console.log('成功')
            // alert('submit!')
            // console.log(this.$message)
            this.$message.success('登录成功')
            // console.log(data.data.token);
            window.sessionStorage.setItem('token', data.data.token)
            // console.log(this);
            this.$router.push('/home')
          }
          // {
          //   this.$message.error('登录失败')
          // }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset: function(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.login_container {
  background: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #ffffff;
  /* margin: auto; */
  border-radius: 2px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.img_box {
  position: relative;
  left: 50%;
  top: 0%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: #fafafa;
  border-radius: 75px;
  overflow: hidden;
}
.img_box img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
}
.btn {
  margin-left: 61%;
}
.el-input {
  width: 93%;
}
.el-form {
  /* position: absolute; */
  margin-top: -20px;
}
</style>
