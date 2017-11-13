<template>
  <div class="nav">
    <Menu theme="dark" width="auto" active-name="home">
      <div class="layout-logo-left"></div>
      <Submenu name="home" class="empty">
        <template slot="title">
          <router-link to="home"><Icon type="home"></Icon>首页</router-link>
        </template>
      </Submenu>
      <Submenu name="1">
        <template slot="title">
          <Icon type="document-text"></Icon>文章管理
        </template>
        <MenuItem name="article"><router-link to="article">文章列表</router-link></MenuItem>
        <MenuItem name="publish"><router-link to="publish">文章添加</router-link></MenuItem>
      </Submenu>
      <Submenu name="1">
        <template slot="title">
          <Icon type="paper-airplane"></Icon>页面管理
        </template>
        <MenuItem name="页面列表"><router-link to="pages">页面列表</router-link></MenuItem>
        <MenuItem name="addpage"><router-link to="addpage">添加页面</router-link></MenuItem>
      </Submenu>
      <Submenu name="1">
        <template slot="title">
          <Icon type="tshirt"></Icon>主题管理
        </template>
        <MenuItem name="themes"><router-link to="themes">主题列表</router-link></MenuItem>
        <MenuItem name="editheme"><router-link to="editheme">编辑主题</router-link></MenuItem>
      </Submenu>
      <!-- <Submenu name="4">
        <template slot="title">
          <Icon type="star"></Icon>分类管理
        </template>
        <MenuItem name="categorys"><router-link to="categorys">分类列表</router-link></MenuItem>
        <MenuItem name="addcategory"><router-link to="addcategory">添加分类></router-link></MenuItem>
      </Submenu> -->
      <Submenu name="category" class="empty">
        <template slot="title">
          <router-link to="categorys"><Icon type="pricetag"></Icon>分类管理</router-link>
        </template>
      </Submenu>
      <Submenu name="tags" class="empty">
        <template slot="title">
          <router-link to="tags"><Icon type="star"></Icon>标签管理</router-link>
        </template>
      </Submenu>
      <!-- <Submenu name="4">
        <template slot="title">
          <Icon type="pricetag"></Icon>标签管理
        </template>
        <MenuItem name="tags"><router-link to="tags">标签列表</router-link></MenuItem>
        <MenuItem name="addtag"><router-link to="addtag">添加标签</router-link></MenuItem>
      </Submenu> -->
      <Submenu name="user" class="empty">
        <template slot="title">
          <router-link to="user"><Icon type="settings"></Icon>用户设置</router-link>
        </template>
      </Submenu>
      <Submenu name="">
        <template slot="title">
          <Icon type="gear-b"></Icon>系统设置
        </template>
        <MenuItem name="base"><router-link to="base">基本设置</router-link></MenuItem>
        <MenuItem name="statistics"><router-link to="statistics">统计代码</router-link></MenuItem>
      </Submenu>
      <Submenu name="draft" class="empty">
        <template slot="title">
          <router-link to="draft"><Icon type="ios-compose"></Icon>草稿箱</router-link>
        </template>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
  export default {
    name: 'leftNav',
    data () {
      return {
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
  }
</style>