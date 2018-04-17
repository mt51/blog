<template>
  <div class="table-wrapper">
    <el-table :data="data">
      <el-table-column
        v-for="(c, i) in columns"
        :key="i"
        :label="c.label"
        :prop="c.props"
        :width="c.width"></el-table-column>
      <el-table-column
        label="操作"
        width="180">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :current-page="page">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'TheTable',
  props: {
    columns: Array,
    data: Array,
    size: Number,
    page: Number,
    total: Number
  }
}
</script>
