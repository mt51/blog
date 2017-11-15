<template>
  <div class="base">
    <Card>
      <p slot="title">
        <Icon type="pricetag"></Icon>
        登录日志
      </p>
      <router-link to="article" slot="extra" @click.prevent="more">
          查看更多
      </router-link>
      <Table :loading="loading" :columns="columns" :data="data" stripe></Table>
      <Page :total="total" on-change="fetchLogList" class-name="page"></Page>
    </Card>
  </div>
</template>
<script>
  import formatDate from '@/util/date'
  export default {
    name: 'home',
    data () {
      return {
        data: [],
        loading: false,
        columns: [
          {
            title: '账户',
            key: 'account',
            ellipsis: true
          }, {
            title: '登录IP',
            key: 'ip',
            ellipsis: true
          }, {
            title: '日期',
            key: 'date'
          }, {
            title: '地点',
            key: 'location'
          }
        ],
        total: 0
      }
    },
    created () {
      this.fetchLogList(1)
    },
    methods: {
      fetchLogList (page) {
        this.loading = true
        this.axios.get('/api/log?page=' + page)
          .then((response) => {
            this.loading = false
            if (response.data.code === 0) {
              this.data = response.data.data
              this.total = response.data.total
              this.data.forEach(item => {
                item.date = formatDate(item.date, 'yyyy-MM-dd hh:mm:ss')
              })
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .base{
    .page{
      margin-top: 20px;
      text-align: right;
    }
  }
</style>