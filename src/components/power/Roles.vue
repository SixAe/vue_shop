<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区 -->
      <el-table :data="roleslist" border stripe width="100%">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- <pre>{{ scope.row }}</pre> -->
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级列表 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级列表和三级 -->
              <el-col :span="19">
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3, i3) in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="编号" width="80"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="分配权限"
      :visible.sync="showSetRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <!-- 树形数据结构 -->
      <el-tree
        :data="rightslist"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="defkeys"
        node-key="id"
        show-checkbox
        ref="rightTree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { get } from 'http'
export default {
  data() {
    return {
      // 所有角色权限列表
      roleslist: [],
      // 控制分配权限的对话框的显示和隐藏
      showSetRightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // tree 的属性绑定对象
      defaultProps: {
        children: 'children',
        label: 'authName',
      },
      //默认选中的数据值
      defkeys: [],
      // 角色id
      roleID: '',
      // 分配的权限
      rights: '',
    }
  },
  created() {
    /* 获得权限列表 */
    this.rolesList()
  },
  methods: {
    async rolesList() {
      const { data } = await this.$http.get('roles')
      if (data.meta.status != 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.roleslist = data.data
      console.log(this.roleslist)
    },
    async removeRightById(role, rightId) {
      const confResult = await this.$confirm('是否继续删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confResult != 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      if (data.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }
      this.$message.success('删除成功!')
      //   this.getUserList()
      // this.
      role.children = data.data
    },
    async showSetRightDialog(role) {
      // console.log(role)
      this.roleID = role.id
      const { data } = await this.$http.get('rights/tree')
      if (data.meta.status != 200) {
        return this.$message.error('获取权限失败')
      }
      // 获取到数据放到data中
      this.rightslist = data.data
      console.log(this.rightslist)
      // 将当前的权限的id 获取出来放到defkeys中
      // 先清空数组

      this.getLeafKeys(role, this.defkeys)
      this.showSetRightDialogVisible = true
    },
    // 通过递归的形式,获取角色下所有的权限id ,并保存到defkeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前node 节点不包含children 属性,则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((element) => {
        this.getLeafKeys(element, arr)
      })
    },
    // 关闭时,重置数组
    setRightDialogClosed() {
      this.defkeys = []
    },
    // 分配权限
    async setRightHandle() {
      console.log('分配权限')
      console.log(this.roleID)
      // 获得选中的权限id 和半选id
      // getHalfCheckedKeys()
      const keys = [
        ...this.$refs.rightTree.getCheckedKeys(),
        ...this.$refs.rightTree.getHalfCheckedKeys(),
      ]
      const idStr = keys.join(',')
      const { data } = await this.$http.post(`roles/${this.roleID}/rights`, {
        rids: idStr,
      })
      if (data.meta.status !== 200) {
        return thsi.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.rolesList()
      this.showSetRightDialogVisible = false
    },
  },
}
</script>
<style scoped>
.el-card {
  margin-top: 10px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #ccc;
}
.bdbottom {
  border-bottom: 1px solid #ccc;
}
/* 纵向居中 */
.vcenter {
  display: flex;
  align-items: center;
}
</style>
