<template>
  <div class="home">
    <el-button @click="searchList">点我请求列表数据</el-button>
    <div class="table-class">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
    <div class="loadingdom"></div>
  </div>
</template>

<script>
import { test } from '@/api/test'
export default {
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created () {},
  methods: {
    searchList () {
      this.getList()
    },
    async getList () {
      const res = await test({ loading: true, loadingDom: '.loadingdom' })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .loadingdom {
    width: 100%;
    height: 300px;
    background-color: #0094ff;
  }
}
</style>
