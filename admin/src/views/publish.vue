<template>
  <div class="publish">
    <div class="form-group">
      <Input v-model="articleData.title" placeholder="标题" style="width: 300px"></Input>
      <Input v-model="articleData.description" placeholder="简介" style="width: 300px"></Input>
      <Select v-model="articleData.tag" style="width:200px;z-index: 1501;" placeholder="标签">
        <Option v-for="(item, key) in tags" :value="item.name" :key="key">{{ item.name }}</Option>
      </Select>
      <Select v-model="articleData.category" style="width:200px;z-index: 1501;" placeholder="分类">
        <Option v-for="(item, key) in categorys" :value="item.name" :key="key">{{ item.name }}</Option>
      </Select>
      <Button type="dashed" @click="publish($event, true)">存为草稿</Button>
      <Button type="primary" @click.native="publish">发布</Button>
    </div>
    <mavonEditor v-model="articleData.mdcont" @imgAdd="handleAddImg"/>
  </div>
</template>
<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    data () {
      return {
        articleData: {
          value: '',
          title: '',
          description: '',
          tag: '',
          category: '',
          mdcont: '',
          draft: false
        },
        tags: [],
        categorys: [],
        view: 'add',
        articleId: ''
      }
    },
    created () {
      this.fetchTagsAndCategorys()
      const pathName = this.$route.name
      if (pathName === 'edit') {
        this.articleId = this.$route.params.id
        this.fetchArticleInfo(this.articleId)
        this.view = 'edit'
      }
    },
    methods: {
      publish ($event, draft) {
        debugger
        if (draft) {
          this.articleData.draft = true
        } else {
          this.articleData.draft = false
        }
        const url = this.view === 'add' ? '/api/article' : '/api/article/' + this.articleId
        const method = this.view === 'add' ? 'post' : 'put'
        this.axios.request({
          url: url,
          method: method,
          data: this.articleData
        })
        .then(response => {
          this.$Message.success(response.data.data.msg)
        }).catch(error => {
          if (error.code !== 0) {
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
      },
      handleAddImg () {
      }
    },
    components: {
      mavonEditor
    }
  }
</script>
<style lang="scss" scoped>
  .publish{
    padding: 0 20px;
    .markdown-body{
      height: calc(100vh - 200px);
    }
    .form-group{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>