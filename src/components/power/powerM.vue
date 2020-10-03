<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/statistic' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">导航1</el-breadcrumb-item>
      <el-breadcrumb-item>导航2</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div>
        <el-row :gutter='10'>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
          <el-col
            :span="10"
            :offset='2'
          >
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
        </el-row>
        <el-row
          :gutter='10'
          type='flex'
          justify="space-between"
        >
          <el-col :span="8">
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
        </el-row>
        <el-row>
          <i class="el-icon-edit"></i>
          <i class="el-icon-share"></i>
          <i class="el-icon-delete"></i>
          <i class="el-icon-phone"></i>
          <el-button
            type="primary"
            icon="el-icon-search"
          >搜索</el-button>
        </el-row>
        <el-row>
          <el-button type="primary">主要按钮</el-button>
          <el-button
            plain
            type='success'
          >成功</el-button>
          <el-button
            round
            type='info'
          >信息</el-button>
          <el-button
            circle
            type='warning'
          >警告</el-button>
          <el-button type="danger">危险</el-button>
          <el-button
            circle
            type='primary'
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type='warning'
            disabled
          >禁用</el-button>
          <el-button type='text'>文字按钮</el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
          >搜索</el-button>
          <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>

          <el-button
            type="primary"
            :loading="true"
          >加载中</el-button>
          <el-button size="medium">中等按钮</el-button>
          <el-button size="small">小型按钮</el-button>
          <el-button size="mini">超小按钮</el-button>
        </el-row>
        <el-row>
          链接：
          <el-link type='primary'>正常</el-link>
          <el-link type='danger'>危险</el-link>
          <el-link
            type='warning'
            disabled
          >禁用</el-link>
          <el-link :underline="false">无下划线</el-link>
          <el-link>有下划线</el-link>
          <el-link icon="el-icon-edit">编辑</el-link>
          <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
        </el-row>
        <el-row>form表单
          <el-row>
            radio
            <template>
              <el-radio
                v-model="radio"
                label='1'
              >选项1</el-radio>
              <el-radio
                v-model="radio"
                label='2'
              >选项2</el-radio>
            </template>
            <template>
              <el-radio
                disabled
                v-model="radio"
                label="禁用"
              >备选项</el-radio>
              <el-radio
                disabled
                v-model="radioBack"
                label="2"
              >备选项</el-radio>
            </template>
            <template>
              <el-radio-group v-model="radioG">
                <el-radio :label="2">备选项</el-radio>
                <el-radio
                  :label="6"
                  border
                >备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
              </el-radio-group>
            </template>
            <template>
              <el-radio-group
                v-model='radio1'
                size='small'
              >
                <el-radio-button label='上海'></el-radio-button>
                <el-radio-button label='西安'></el-radio-button>
                <el-radio-button label='杭州'></el-radio-button>
              </el-radio-group>
            </template>
          </el-row>
          <el-row>
            checkbox:
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox
                label="禁用"
                disabled
              ></el-checkbox>
              <el-checkbox
                label="选中且禁用"
                disabled
              ></el-checkbox>
            </el-checkbox-group>
            <template>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="city in cities"
                  :label="city"
                  :key="city"
                >{{city}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-row>
          <el-row>
            input
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable
            >
            </el-input>
            <el-input
              placeholder="请输入密码"
              v-model="input"
              show-password
            ></el-input>
            <el-input
              placeholder="请选择日期"
              suffix-icon="el-icon-date"
              v-model="input1"
            >
            </el-input>
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input2"
            >
            </el-input>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
              resize="none"
            >
            </el-input>
            <el-input
              type="textarea"
              autosize
              placeholder="自适应内容请输入内容"
              v-model="textarea1"
            >
            </el-input>
            <div>
              <el-input
                placeholder="请输入内容"
                v-model="input1"
              >
                <template slot="prepend">Http://</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input
                placeholder="请输入内容"
                v-model="input2"
              >
                <template slot="append">.com</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input
                placeholder="请输入内容"
                v-model="input3"
                class="input-with-select"
              >
                <el-select
                  v-model="select"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option
                    label="餐厅名"
                    value="1"
                  ></el-option>
                  <el-option
                    label="订单号"
                    value="2"
                  ></el-option>
                  <el-option
                    label="用户电话"
                    value="3"
                  ></el-option>
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </div>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="text"
              maxlength="11"
              show-word-limit
            >
            </el-input>
            <!--     maxlength="30" 限制最大长度   show-word-limit：显示长度限制 -->
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </el-row>

          <el-row>
            inputNumber:
            <el-input-number
              v-model="num"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
            <!-- ：step 设置增长步长 -->
            <el-input-number
              v-model="num1"
              :step="2"
            ></el-input-number>
            <!--  :precision="2" 控制精度 -->
            <template>
              <el-input-number
                v-model="num"
                :precision="2"
                :step="0.1"
                :max="10"
              ></el-input-number>
            </template>
            <!--   controls-position="right" 控制按钮为的位置 -->
            <el-input-number
              v-model="num"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-row>
          <el-row>
            Select 选择器
            <template>
              <!-- 为el-select设置clearable属性，则可将选择器清空。需要注意的是，clearable属性仅适用于单选。 -->
              <el-select
                v-model="value"
                placeholder="请选择"
                clearable
              >
                <!-- 动态绑定一个disabled 禁用 -->
                <el-option
                  :key="item"
                  v-for="item in options"
                  :label='item.label'
                  :value='item.value'
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
              <el-select
                v-model="value1"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
            分组：
            <template>
              <el-select
                v-model="value2"
                placeholder="请选择"
              >
                <el-option-group
                  v-for="group in options1"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-option-group>
              </el-select>
            </template>
            可搜索:
            <!--  multiple 开启多选 allow-create 自定义标签 创建条目 default-first-option 默认在第一条-->
            <template>
              <el-select
                v-model="value"
                multiple
                allow-create
                default-first-option
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-row>
          <el-row>
            Cascader 级联选择器
            <div class="block">
              <span class="demonstration">默认 click 触发子菜单</span>
              <!--  只需为 Cascader 的options属性指定选项数组即可渲染出一个级联选择器。通过props.expandTrigger可以定义展开子级菜单的触发方式。 -->
              <!--  clearable 可清空 -->
              <!--  :show-all-levels="false" 属性show-all-levels定义了是否显示完整的路径，将其赋值为false则仅显示最后一级 -->
              <!--   collapse-tags 在开启多选模式后，默认情况下会展示所有已选中的选项的Tag，你可以使用collapse-tags来折叠Tag -->
              <!-- filterable 开启搜索功能 -->
              <el-cascader
                v-model="CSvalue"
                :options="CSoptions"
                @change="handleChange"
                clearable
                :props="props"
                collapse-tags
                filterable
              ></el-cascader>

              <span class="demonstration">hover 触发子菜单</span>
              <el-cascader
                v-model="CSvalue"
                :options="CSoptions"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader>
              自定义节点内容
              <el-cascader :options="CSoptions">
                <template slot-scope="{ node, data }">
                  <span>{{ data.label }}</span>
                  <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                </template>
              </el-cascader>
            </div>
          </el-row>
          <el-row>
            Switch 开关
            <el-switch
              v-model="svalue"
              active-color="green"
              inactive-color="red"
            >
            </el-switch>
            <!-- 使用active-text属性与inactive-text属性来设置开关的文字描述。 -->
            <el-switch
              v-model="svalue"
              active-text="按月付费"
              inactive-text="按年付费"
            >
            </el-switch>
            <el-switch
              v-model="svalue"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="按月付费"
              inactive-text="按年付费"
            >
            </el-switch>
            <!-- disabled 禁用 -->
            <el-switch
              v-model="value1"
              disabled
            >
            </el-switch>
          </el-row>

        </el-row>
        <el-row></el-row>
        <template></template>

      </div>
    </el-card>
  </div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data() {
    return {
      radio: '2',
      radioBack: '2',
      radioG: 6,
      radio1: '上海',
      checkList: ['复选框 A'],
      /* 全选 */
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      /* input */
      input: '',
      input1: '',
      input2: '',
      textarea: '',
      textarea1: '',
      /* inputNumber */
      num: '',
      num1: 5,
      /* select  */
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎',
        disabled: true
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }, {
        value: '选项6',
        label: '北黄双烤鸭'
      }],
      options1: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }],
      value: '',
      value1: '',
      value2: '',
      value3: '',
      /* Cascader */
      /* multiple: true 多选 */
      /* checkStrictly: true 选择任意一级选项 */
      props: { multiple: true, checkStrictly: true },
      CSvalue: [],
      CSoptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      /* Switch */
      svalue: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
