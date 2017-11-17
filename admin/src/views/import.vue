<template>
  <div class="import">
    <div class="toolbar">
      <Upload>
        <Button type="primary" icon="ios-cloud-upload-outline">导入文章</Button>
      </Upload>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'import',
    data () {
      return {
        data: {}
      }
    },
    methods: {
      importArticle () {
      }
    }
  }
</script>