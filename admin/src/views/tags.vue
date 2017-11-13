<template>
  <div class="tags">
    <div class="add">
      <Button type="primary" @click.native="addNewTag">新增标签</Button>
    </div>
    <Table :loading="loading" :columns="columns" :data="data" stripe></Table>
    <Page :total="total" on-change="fetchTagList" class-name="page"></Page>
    <Modal v-model="modelVisible" title="Title" :styles="{top: '20px'}" on-ok="confirmAdd">
        <Form v-model="tag" :label-width="80">
          <FormItem label="标签名">
            <Input v-model="tag.name"></Input>
          </FormItem>
          <FormItem label="描述">
            <Input v-model="tag.description"></Input>
          </FormItem>
        </Form>
    </Modal>
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
            title: '标签名',
            key: 'name'
          }, {
            title: '描述',
            key: 'description'
          }, {
            title: '创建日期',
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
        currentTagId: '',
        tag: {
          name: '',
          description: '',
          type: 'tag'
        },
        tags: [],
        modelVisible: false
      }
    },
    created () {
      this.fetchTagList(1)
    },
    methods: {
      fetchTagList () {
        this.axios.get('/api/category?type=tag')
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
      addNewTag () {
        this.modelVisible = true
      },
      confirmAdd () {
        this.axios.post('/api/category', this.tag)
          .then(response => {
            if (response.data.code === 0) {
              this.$Message.success('保存成功')
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      edit (p) {
        console.log(p)
      },
      deleteArticle () {
        this.axios.delete('/api/category/' + this.currentTagId)
        .then(response => {
          if (response.data.code === 0) {
            this.$Message.success('删除成功')
          } else {
            this.$Message.error('删除失败')
          }
        })
      },
      deleteTips (p) {
        this.currentTagId = p.row['_id']
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
<style lang="scss">
  .tags {
    margin-left: 20px;
    margin-right: 20px;
    .add{
      margin-bottom: 20px;
      text-align: right;
    }
    .page{
      margin-top: 20px;
      text-align: right;
    }
  }
</style>