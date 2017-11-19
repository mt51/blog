<template>
  <div class="import">
    <div class="toolbar">
      <Upload action="//localhost:3000/api/import" multiple name="file" type="drag">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
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