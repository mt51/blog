<template>
  <div class="links">
    <div class="add">
      <Button type="primary" @click.native="addNewLink">新增友链</Button>
    </div>
    <Table :loading="loading" :columns="columns" :data="data" stripe></Table>
    <Modal v-model="modelVisible" title="新增友链" :styles="{top: '20px'}" @on-ok="confirm" :loading="fomrLoading">
        <Form ref="link" :rules="ruleValidate" :model="link" :label-width="80">
          <FormItem label="标题" prop="title">
            <Input v-model="link.title"></Input>
          </FormItem>
          <FormItem label="描述" prop="descp">
            <Input v-model="link.descp"></Input>
          </FormItem>
          <FormItem label="地址" prop="link">
            <Input v-model="link.link"></Input>
          </FormItem>
          <FormItem label="头像" prop="avatar">
            <Input v-model="link.avatar"></Input>
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'links',
    data () {
      return {
        columns: [
          {
            title: '名称',
            key: 'title'
          }, {
            title: '描述',
            key: 'descp',
            ellipsis: true
          }, {
            title: '地址',
            key: 'link'
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
        currentLinkId: '',
        data: [],
        modelVisible: false,
        link: {
          title: '',
          descp: '',
          link: '',
          avatar: ''
        },
        view: '',
        loading: false,
        fomrLoading: true,
        ruleValidate: {
          title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
          link: [{ required: true, message: '地址不能为空', trigger: 'blur' }]
        }
      }
    },
    methods: {
      fetchLinklists () {
        this.loading = true
        this.axios.get('/api/link')
          .then(response => {
            this.loading = false
            this.data = response.data.data
          }).catch(error => {
            this.loading = false
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
      },
      addNewLink () {
        this.modelVisible = true
        this.view = 'add'
      },
      confirm () {
        debugger
        let url = this.view === 'add' ? '/api/link' : '/api/link/' + this.currentLinkId
        let method = this.view === 'add' ? 'post' : 'put'
        this.$refs.link.validate(valid => {
          if (valid) {
            this.axios.request({
              url: url,
              method: method,
              data: this.link
            })
            .then(response => {
              if (response.data.code === 0) {
                this.modelVisible = false
                this.$Message.success('保存成功')
                this.fetchLinklists()
                this.$refs.link.resetFields()
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
          }
        })
      },
      edit (p) {
        this.view = 'edit'
        this.link = p.row
        this.modelVisible = true
        this.currentLinkId = p.row['_id']
      },
      deleteLink () {
        this.axios.delete('/api/link/' + this.currentLinkId)
        .then(response => {
          if (response.data.code === 0) {
            this.$Message.success('删除成功')
            this.fetchLinklists()
          } else {
            this.$Message.error('删除失败')
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
      },
      deleteTips (p) {
        this.currentLinkId = p.row['_id']
        this.$Modal.confirm({
          title: '提醒',
          content: '确认删除？',
          okText: '删除',
          cancelText: '取消',
          onOk: this.deleteLink
        })
      }
    },
    created () {
      this.fetchLinklists()
    }
  }
</script>
<style lang="scss">
  .links{
    margin-left: 20px;
    margin-right: 20px;
    .add{
      margin-bottom: 20px;
      text-align: right;
    }
  }
</style>