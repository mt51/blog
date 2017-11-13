<template>
  <div class="nav">
    <Menu theme="dark" width="auto" :active-name="currentPath">
      <div class="layout-logo-left"></div>
      <router-link to="home">
        <MenuItem name="home">
          <Icon type="home"></Icon>
          <span class="layout-text">首页</span>
        </MenuItem>
      </router-link>
      <Submenu name="article">
        <template slot="title">
          <Icon type="document-text"></Icon>文章管理
        </template>
        <router-link to="article"><MenuItem name="article">文章列表</MenuItem></router-link>
        <router-link to="publish"><MenuItem name="publish">文章添加</MenuItem></router-link>
      </Submenu>
      <Submenu name="pages">
        <template slot="title">
          <Icon type="paper-airplane"></Icon>页面管理
        </template>
        <router-link to="pages"><MenuItem name="页面列表">页面列表</MenuItem></router-link>
        <router-link to="addpage"><MenuItem name="addpage">添加页面</MenuItem></router-link>
      </Submenu>
      <Submenu name="themes">
        <template slot="title">
          <Icon type="tshirt"></Icon>主题管理
        </template>
        <router-link to="themes"><MenuItem name="themes">主题列表</MenuItem></router-link>
        <router-link to="editheme"><MenuItem name="editheme">编辑主题</MenuItem></router-link>
      </Submenu>
      <router-link to="categorys">
        <MenuItem name="categorys">
          <Icon type="pricetag"></Icon>
          <span class="layout-text">分类管理</span>
        </MenuItem>
      </router-link>
      <router-link to="tags">
        <MenuItem name="tags">
          <Icon type="star"></Icon>
          <span class="layout-text">标签管理</span>
        </MenuItem>
      </router-link>
      <router-link to="user">
        <MenuItem name="user">
          <Icon type="settings"></Icon>
          <span class="layout-text">用户设置</span>
        </MenuItem>
      </router-link>
      <Submenu name="">
        <template slot="title">
          <Icon type="gear-b"></Icon>系统设置
        </template>
        <router-link to="base"><MenuItem name="base">基本设置</MenuItem></router-link>
        <router-link to="statistics"><MenuItem name="statistics">统计代码</MenuItem></router-link>
      </Submenu>
      <router-link to="draft">
        <MenuItem name="draft">
          <Icon type="ios-compose"></Icon>
          <span class="layout-text">草稿箱</span>
        </MenuItem>
      </router-link>
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
    }
  }
</script>

<style lang="scss">
  .nav{
    width: 100%;
    height: 100%;
    padding-top: 1px;
    background: #495060;
    .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      height: 100%;
    }
    .layout-breadcrumb{
      padding: 10px 15px 0;
    }
    .layout-content{
      min-height: 200px;
      margin: 15px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
    }
    .layout-content-main{
      padding: 10px;
    }
    .layout-copy{
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
    }
    .layout-menu-left{
      background: #464c5b;
    }
    .layout-header{
      height: 60px;
      background: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
      width: 90%;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
    }
    .empty{
      .ivu-menu-submenu-title-icon {
        display: none;
      }
      a{
        i {
          margin-right: 10px;
        }
      }
    }
    .ivu-menu-item {
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .ivu-menu-item-selected{
      a {
        color: #fff;
      }
    }
    a{
      display:inline-block;
      width: 100%;
      height: 100%;
      color: rgba(255,255,255,.7);
      &:hover{
        color: #fff;
      }
    }
    .ivu-menu-item-active{
      color: #2d8cf0;
      border-right: 2px solid #2d8cf0;
      background: #363e4f;
      &:hover{
        background: #363e4f;
      }
    }
  }
</style>