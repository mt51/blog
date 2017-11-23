<template>
  <div class="categorys">
    <div class="add">
      <Button type="primary" @click.native="addNewCategory">新增分类</Button>
    </div>
    <Table :loading="loading" :columns="columns" :data="data" stripe></Table>
    <Modal v-model="modelVisible" title="新增分类" :styles="{top: '20px'}" @on-ok="confirm" :loading="formLoading">
        <Form ref="category" :model="category" :label-width="80" :rules="ruleValidate">
          <FormItem label="分类名" prop="name">
            <Input v-model="category.name"></Input>
          </FormItem>
          <FormItem label="描述" prop="description">
            <Input v-model="category.description"></Input>
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
        formLoading: true,
        currentCategoryId: '',
        category: {
          name: '',
          description: '',
          type: 'category'
        },
        categorys: [],
        modelVisible: false,
        ruleValidate: {
          name: [{required: true, message: '分类名不能为空', trigger: 'blur'}]
        },
        view: 'add'
      }
    },
    created () {
      this.fetchCategoryList()
    },
    methods: {
      fetchCategoryList () {
        this.loading = true
        this.axios.get('/api/category?type=category')
          .then((response) => {
            if (response.data.code === 0) {
              this.loading = false
              this.data = response.data.data.categorys
              this.data.forEach(item => {
                item.date = formatDate(item.date, 'yyyy-MM-dd')
              })
            }
          })
      },
      addNewCategory () {
        this.modelVisible = true
        this.view = 'add'
      },
      confirm () {
        let url = this.view === 'add' ? '/api/category' : '/api/category/' + this.currentCategoryId
        let method = this.view === 'add' ? 'post' : 'put'
        this.$refs.category.validate(valid => {
          if (valid) {
            this.axios.request({
              url: url,
              data: this.category,
              method: method
            })
            .then(response => {
              if (response.data.code === 0) {
                this.modelVisible = false
                this.$Message.success('保存成功')
                this.$refs.category.resetFields()
                this.fetchCategoryList()
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
            this.formLoading = false
            this.nextTick(() => {
              this.formLoading = true
            })
          }
        })
      },
      edit (p) {
        this.view = 'edit'
        this.category.name = p.row.name
        this.category.description = p.row.description
        this.currentCategoryId = p.row['_id']
        this.modelVisible = true
      },
      deleteCategoryById () {
        this.axios.delete('/api/category/' + this.currentCategoryId)
        .then(response => {
          if (response.data.code === 0) {
            this.$Message.success('删除成功')
            this.fetchCategoryList()
          } else {
            this.$Message.error('删除失败')
          }
        })
        .catch(e => {
          if (e.response.data.verror) {
            if (e.status === 401) {
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
        this.currentCategoryId = p.row['_id']
        this.$Modal.confirm({
          title: '提醒',
          content: '确认删除？',
          okText: '删除',
          cancelText: '取消',
          onOk: this.deleteCategoryById
        })
      }
    }
  }
</script>
<style lang="scss">
  .categorys {
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