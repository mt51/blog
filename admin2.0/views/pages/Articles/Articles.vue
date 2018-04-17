<template>
  <div class="articles-list">
    <TheTable
      :columns="columns"
      :total="total"
      :size="size"
      :page="currentPage"></TheTable>
  </div>
</template>
<script>
import TheTable from '@/components/TheTable/TheTable'
export default {
  name: 'Articles',
  asyncData ({ store }) {
    store.dispatch('fetchArticleList')
  },
  data () {
    return {
      columns: [
        {
          label: '标题',
          prop: 'title',
          width: 180
        },
        {
          label: '摘要',
          prop: 'descp',
          width: 180
        },
        {
          label: '分类',
          prop: 'category'
        },
        {
          label: '标签',
          prop: 'tag'
        },
        {
          label: '发布日期',
          prop: 'date',
          width: 120
        }
      ],
      total: 0,
      currentPage: 1,
      size: 10
    }
  },
  components: {
    TheTable
  }
}
</script>
