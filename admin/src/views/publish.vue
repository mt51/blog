<template>
  <div class="publish">
    <div class="form-group">
      <Button type="dashed" @click="publish($event, true)">存为草稿</Button>
      <Button type="primary" @click.native="publish">发布</Button>
    </div>
    <md v-model="value" ref="md"></md>
  </div>
</template>
<script>
  import md from '@/components/markdown/markdown'
  export default {
    data () {
      return {
        value: '',
        view: 'add',
        articleId: ''
      }
    },
    created () {
      const pathName = this.$route.name
      if (pathName === 'edit') {
        this.articleId = this.$route.params.id
        this.fetchArticleInfo(this.articleId)
        this.view = 'edit'
      }
    },
    methods: {
      publish ($event, draft) {
        let articleData = this.$refs.md.getData()
        if (draft) {
          articleData.draft = true
        } else {
          articleData.draft = false
        }
        console.log(articleData)
        const url = this.view === 'add' ? '/api/article' : '/api/article/' + this.articleId
        const method = this.view === 'add' ? 'post' : 'put'
        this.axios.request({
          url: url,
          method: method,
          data: articleData
        })
        .then(response => {
          this.$Message.success(response.data.data.msg)
          this.value = ''
        }).catch(error => {
          if (error.response.status === 401) {
            window.localStorage.removeItem('token')
            this.$router.push({path: '/signin'})
          } else {
            this.$Message.error(error.response.data.verror.msg)
          }
        })
      },
      fetchArticleInfo (id) {
        this.axios.get('/api/article/' + id)
          .then(response => {
            this.articleData = response.data.data
          })
          .catch(error => {
            if (error.response.data) {
              this.$Message.error(error.response.data.verror.msg)
            }
          })
      }
    },
    components: {
      md
    }
  }
</script>
<style lang="scss" scoped>
  .publish{
    padding: 0 20px;
    .form-group{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>