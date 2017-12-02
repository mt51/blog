<template>
  <div class="nav">
    <Menu theme="dark" width="auto" :active-name="currentPath" @on-select="routerLink">
      <div class="layout-logo-left">
        <!-- <Icon type="social-javascript"></Icon><span>胖先生的‘窝’</span> -->
      </div>
      <MenuItem name="home">
        <Icon type="home"></Icon>
        <span class="layout-text">首页</span>
      </MenuItem>
      <Submenu name="article">
        <template slot="title">
          <Icon type="document-text"></Icon>文章管理
        </template>
        <MenuItem name="article">文章列表</MenuItem>
        <MenuItem name="publish">文章添加</MenuItem>
        <MenuItem name="import">文章导入</MenuItem>
      </Submenu>
      <!-- <Submenu name="pages">
        <template slot="title">
          <Icon type="paper-airplane"></Icon>页面管理
        </template>
        <MenuItem name="页面列表">页面列表</MenuItem>
        <MenuItem name="addpage">添加页面</MenuItem>
      </Submenu>
      <Submenu name="themes">
        <template slot="title">
          <Icon type="tshirt"></Icon>主题管理
        </template>
        <MenuItem name="themes">主题列表</MenuItem>
        <MenuItem name="editheme">编辑主题</MenuItem>
      </Submenu> -->
        <MenuItem name="categorys">
          <Icon type="pricetag"></Icon>
          <span class="layout-text">分类管理</span>
        </MenuItem>
        <MenuItem name="tags">
          <Icon type="star"></Icon>
          <span class="layout-text">标签管理</span>
        </MenuItem>
      <!-- <MenuItem name="user">
        <Icon type="settings"></Icon>
        <span class="layout-text">用户设置</span>
      </MenuItem> -->
      <Submenu name="">
        <template slot="title">
          <Icon type="gear-b"></Icon>系统设置
        </template>
        <MenuItem name="base">基本设置</MenuItem>
        <!-- <MenuItem name="statistics">统计代码</MenuItem> -->
      </Submenu>
      <MenuItem name="draft">
        <Icon type="ios-compose"></Icon>
        <span class="layout-text">草稿箱</span>
      </MenuItem>
    </Menu>
  </div>
</template>
<script>
  export default {
    name: 'leftNav',
    data () {
      return {
        currentPath: ''
      }
    },
    mounted () {
      this.currentPath = this.$route.name
    },
    methods: {
      routerLink (name) {
        this.$router.push({name: name})
      }
    }
  }
</script>

<style lang="scss">
  .nav{
    width: 100%;
    height: 100%;
    padding-top: 1px;
    background: #495060;
    ul {
      width: 100%;
      box-sizing: border-box;
    }
    .layout-logo-left{
      width: 75%;
      height: 30px;
      margin: 20px auto 10px;
      border-radius: 5px;
      line-height: 30px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      background: #646975;
    }
  }
</style>