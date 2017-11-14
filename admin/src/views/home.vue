<template>
  <div class="home">
    <div class="new-article">
      <Card>
        <p slot="title">
          <Icon type="pricetag"></Icon>
          最新文章
        </p>
        <router-link to="article" slot="extra" @click.prevent="more">
            查看更多
        </router-link>
        <Table height="350" :loading="loading" :columns="columns" :data="data" stripe></Table>
      </Card>
    </div>
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
            title: '标题',
            key: 'title',
            ellipsis: true
          }, {
            title: '摘要',
            key: 'description',
            ellipsis: true
          }, {
            title: '分类',
            key: 'category',
            ellipsis: true
          }, {
            title: '标签',
            key: 'tag',
            ellipsis: true
          }, {
            title: '日期',
            key: 'date'
          }, {
            title: '操作',
            key: 'action',
            render: (h, p) => {
              return h('div', {
                class: {
                  btnGroup: true
                }
              }, [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(p)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteTips(p)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      }
    },
    created () {
      this.fetchArticleList()
    },
    methods: {
      fetchArticleList () {
        this.loading = true
        this.axios.get('/api/article?&page=1')
          .then((response) => {
            this.loading = false
            if (response.data.code === 0) {
              this.data = response.data.data
              this.total = response.data.total
              this.data.forEach(item => {
                item.date = formatDate(item.date, 'yyyy-MM-dd')
              })
            }
          })
      }
    }
  }
</script>