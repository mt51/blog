<template>
  <div class="publish">
    <div class="form-group">
      <Input v-model="articleData.title" placeholder="标题" style="width: 300px"></Input>
      <Input v-model="articleData.description" placeholder="简介" style="width: 300px"></Input>
      <Select v-model="articleData.tag" style="width:200px" placeholder="标签">
        <Option v-for="(item, key) in tags" :value="item.name" :key="key">{{ item.name }}</Option>
      </Select>
      <Select v-model="articleData.category" style="width:200px" placeholder="分类">
        <Option v-for="(item, key)in categorys" :value="item.name" :key="key">{{ item.name }}</Option>
      </Select>
      <Button type="dashed">存为草稿</Button>
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
          mdcont: ''
        },
        tags: [],
        categorys: []
      }
    },
    created () {
      this.fetchTagsAndCategorys()
    },
    methods: {
      publish () {
        this.axios.post('/api/article', this.articleData).then(response => {
          console.log(response)
        }).catch(error => {
          if (error.code !== 0) {
            console.log(error.verror.msg)
          }
        })
      },
      fetchTagsAndCategorys () {
        this.axios.get('/api/category?type')
        .then(response => {
          this.tags = response.data.data.tag
          this.categorys = response.data.category
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