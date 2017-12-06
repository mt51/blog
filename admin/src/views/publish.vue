<template>
  <div class="publish">
    <div class="editor">
      <md v-model="articleData.mdcont" ref="md"></md>
    </div>
    <div class="form-group">
      <Input v-model="articleData.title" placeholder="标题"></Input>
      <Select v-model="articleData.tags" multiple placeholder="标签">
        <Option v-for="(item, key) in tags" :key="key" :value="item.name">{{item.name}}</Option>
      </Select>
       <Select v-model="articleData.category" placeholder="分类">
        <Option v-for="(item, key) in categorys" :key="key" :value="item.name">{{item.name}}</Option>
      </Select>
      <Input v-model="articleData.description" type="textarea" :rows="4" placeholder="摘要"></Input>
      <div class="btn-group">
        <Button type="dashed" @click="publish($event, true)">存为草稿</Button>
        <Button type="primary" @click.native="publish">发布</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import md from '@/components/markdown/markdown'
  export default {
    data () {
      return {
        view: 'add',
        articleId: '',
        articleData: this.initArticleData(),
        tags: [],
        categorys: []
      }
    },
    created () {
      this.fetchTagsAndCategorys()
      this.initArticleData()
      const pathName = this.$route.name
      if (pathName === 'edit') {
        this.articleId = this.$route.params.id
        this.fetchArticleInfo(this.articleId)
        this.view = 'edit'
      }
    },
    methods: {
      publish ($event, draft) {
        if (draft) {
          this.articleData.draft = true
        } else {
          this.articleData.draft = false
        }
        this.articleData.htmlcont = this.$refs.md.getHtmlcont()
        this.articleData.tags = this.articleData.tags.length > 0 ? '' : this.articleData.tags.join(',')
        const url = this.view === 'add' ? '/api/article' : '/api/article/' + this.articleId
        const method = this.view === 'add' ? 'post' : 'put'
        this.axios.request({
          url: url,
          method: method,
          data: this.articleData
        })
        .then(response => {
          this.$Message.success('保存成功')
          this.articleData = this.initArticleData()
          setTimeout(() => {
            if (draft) {
              this.$router.push({'name': 'draft'})
            } else {
              this.$router.push({'name': 'article'})
            }
          }, 1500)
        }).catch(error => {
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
      fetchArticleInfo (id) {
        this.axios.get('/api/article/' + id)
          .then(response => {
            this.articleData = response.data.data
            if (!this.articleData.tags) {
              this.articleData.tags = []
            } else {
              this.articleData.tags = this.articleData.tags.split(',')
            }
          })
          .catch(error => {
            if (error.response.data) {
              this.$Message.error(error.response.data.verror.msg)
            }
          })
      },
      fetchTagsAndCategorys () {
        this.axios.get('/api/category')
        .then(response => {
          this.tags = response.data.data.tags
          this.categorys = response.data.data.categorys
        })
      },
      initArticleData () {
        return {
          title: '',
          value: '',
          description: '',
          tags: [],
          category: '',
          mdcont: '',
          draft: false
        }
      }
    },
    components: {
      md
    },
    beforeRouteLeave (from, to, next) {
      if (this.articleData.mdcont !== '') {
        this.$Message.warning('有内容未保存')
        next(false)
      } else {
        next()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .publish{
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    felx-wrap: nowrap;
    .editor {
      flex: 1;
    }
    .form-group{
      width: 300px;
      margin: 120px 20px 20px;
      & > div {
        margin-bottom: 20px;
      }
    }
    .btn-group {
      display: flex;
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 1110px) {
    .publish .form-group {
      display: none;
    }
  }
</style>