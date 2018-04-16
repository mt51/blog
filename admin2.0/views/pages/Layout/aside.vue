<template>
  <div class="aside">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      @select="handleSelect"
      :router="true">
      <el-menu-item index="home">
        <i class="fa fa-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="article">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item index="publish">
          <i class="el-icon-plus"></i>
          <span>发布文章</span>
        </el-menu-item>
        <el-menu-item index="article">
          <i class="el-icon-edit"></i>
          <span>文章列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="category">
        <i class="fa fa-tags"></i>
        <span>分类管理</span>
      </el-menu-item>
      <el-menu-item index="tags">
        <i class="fa fa-star"></i>
        <span>标签管理</span>
      </el-menu-item>
      <el-menu-item index="draft">
        <i class="fa fa-info-circle"></i>
        <span>草稿箱</span>
      </el-menu-item>
      <el-menu-item index="link">
        <i class="fa fa-link"></i>
        <span>友链管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'TheAside',
  methods: {
    handleSelect (index, path) {
      console.log(index)
      console.log(path)
    }
  }
}
</script>
<style scoped>
.aside {
  height: 100%;
  background: #545c64;
  & .fa {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }
}
</style>
