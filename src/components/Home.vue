<template>
  <div>
    <h1>Home</h1>
    <div>
      <el-button type="info" @click="logout">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped></style>
