<template>
  <div class="import">
    <div class="toolbar">
      <Upload action="//localhost:3000/api/import" multiple name="file" type="drag">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>选择导入文章</p>
      </Upload>
    </div>
  </div>
</template>