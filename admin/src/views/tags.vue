<template>
  <div class="tags">
    <div class="add">
      <Button type="primary" @click.native="addNewTag">新增标签</Button>
    </div>
    <Table :loading="loading" :columns="columns" :data="data" stripe></Table>
    <Modal v-model="modelVisible" title="添加标签" :styles="{top: '20px'}" @on-ok="confirm" :loading="fomrLoading">
        <Form ref="tag" :rules="ruleValidate" :model="tag" :label-width="80">
          <FormItem label="标签名" prop="name">
            <Input v-model="tag.name"></Input>
          </FormItem>
          <FormItem label="描述" prop="description">
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
        fomrLoading: true,
        currentTagId: '',
        tag: {
          name: '',
          description: '',
          type: 'tag'
        },
        tags: [],
        modelVisible: false,
        ruleValidate: {
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
        },
        view: 'add'
      }
    },
    created () {
      this.fetchTagList()
    },
    methods: {
      fetchTagList () {
        this.loading = true
        this.axios.get('/api/category?type=tag')
          .then((response) => {
            if (response.data.code === 0) {
              this.loading = false
              this.data = response.data.data.tags
              this.data.forEach(item => {
                item.date = formatDate(item.date, 'yyyy-MM-dd')
              })
            }
          })
      },
      addNewTag () {
        this.modelVisible = true
        this.view = 'add'
      },
      confirm () {
        let url = this.view === 'add' ? '/api/category' : '/api/category/' + this.currentTagId
        let method = this.view === 'add' ? 'post' : 'put'
        this.$refs.tag.validate(valid => {
          if (valid) {
            this.axios.request({
              url: url,
              method: method,
              data: this.tag
            })
            .then(response => {
              if (response.data.code === 0) {
                this.modelVisible = false
                this.$Message.success('保存成功')
                this.fetchTagList()
                this.$refs.tag.resetFields()
              }
            })
            .catch(error => {
              if (error.response.status === 401) {
                this.$Message.error('请先登录')
                window.localStorage.removeItem('token')
                setTimeout(() => {
                  this.$router.push({path: '/signin'})
                }, 1500)
              } else {
                this.$Message.error(error.response.data.verror.msg)
              }
            })
          } else {
            this.fomrLoading = false
            this.$nextTick(() => {
              this.fomrLoading = true
            })
          }
        })
      },
      edit (p) {
        this.tag.name = p.row.name
        this.tag.description = p.row.description
        this.modelVisible = true
        this.view = 'edit'
        this.currentTagId = p.row['_id']
      },
      deleteTagById () {
        this.axios.delete('/api/category/' + this.currentTagId)
        .then(response => {
          if (response.data.code === 0) {
            this.$Message.success('删除成功')
            this.fetchTagList()
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
          onOk: this.deleteTagById
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