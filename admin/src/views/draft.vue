<template>
  <div class="article">
    <Table :loading="loading" :columns="columns" :data="data" stripe></Table>
    <Page :total="total" on-change="fetchArticleList" class-name="page"></Page>
  </div>
</template>
<script>
  import formatDate from '@/util/date'
  export default {
    name: 'article',
    data () {
      return {
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
            title: '作者',
            key: 'author'
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
        ],
        data: [],
        loading: false,
        total: 0,
        currentArticleId: '',
        tags: [],
        category: [],
        page: 1
      }
    },
    created () {
      this.fetchArticleList(this.page)
    },
    methods: {
      fetchArticleList (page) {
        this.page = page
        this.axios.get('/api/article?type=draft&page=' + page)
          .then((response) => {
            if (response.data.code === 0) {
              this.data = response.data.data
              this.total = response.data.total
              this.data.forEach(item => {
                item.date = formatDate(item.date, 'yyyy-MM-dd')
              })
            }
          })
      },
      edit (p) {
        this.$router.push({name: 'edit', params: {id: p.row['_id']}})
      },
      deleteArticle (index) {
        this.axios.delete('/api/article/' + this.currentArticleId)
        .then(response => {
          if (response.data.code === 0) {
            this.$Message.success('删除成功')
            this.fetchArticleList(this.page)
          } else {
            this.$Message.error('删除失败')
          }
        })
        .catch(e => {
          if (e.response.data.verror) {
            if (e.response.status === 401) {
              this.$router.push({path: '/signin'})
            } else {
              this.$Message.error(e.response.data.verror.msg)
              this.formLoading = false
              this.nextTick(() => {
                this.formLoading = true
              })
            }
          }
        })
      },
      deleteTips (p) {
        this.currentArticleId = p.row['_id']
        this.$Modal.confirm({
          title: '提醒',
          content: '确认删除？',
          okText: '删除',
          cancelText: '取消',
          onOk: this.deleteArticle
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .article {
    margin-left: 20px;
    margin-right: 20px;
    .page{
      margin-top: 20px;
      text-align: right;
    }
  }
</style>