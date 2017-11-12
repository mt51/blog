<template>
  <div class="admin-header">
  <div class="bread">
    首页
  </div>
    <div class="nav-items">
      <div class="item">
        <span class="a-h-droplist" @click="handleDropList">liuziyang<i class="el-icon-caret-bottom"></i></span>
        <collapse-transition>
          <ul class="drop-list" v-show="dropVisible">
            <li>个人中心</li>
            <li @click="handleSignout">退出登录</li>
          </ul>
        </collapse-transition>
      </div>
      <div class="a-h-avatar">
        <img src="http://ofl49b399.bkt.clouddn.com/1.jpg">
      </div>
    </div>
  </div>
</template>
<script>
  import collapseTransition from '@/components/collapse-transition/collapse-transition'
  export default {
    data () {
      return {
        dropVisible: false
      }
    },
    methods: {
      handleDropList () {
        this.dropVisible = !this.dropVisible
      },
      handleSignout () {
      }
    },
    components: {
      collapseTransition
    }
  }
</script>
<style lang="scss">
  .admin-header{
    position: sticky;
    top: 0;
    display: flex;
    height: 60px;
    padding: 10px 20px;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    flex:1 1 auto;
    color: #222;
    box-shadow: 5px 0 2px 5px #e5e5e5;
    margin-bottom: 20px;
    z-index: 99;
    .nav-items{
      display:flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .a-h-avatar{
      width: 40px;
      height: 40px;
      margin-left: 40px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .a-h-signout{
      color: #222;
    }
    .a-h-droplist{
      color: #00a0ea;
      cursor: pointer;
      i{
        margin-left: 10px;
        font-size: 12px;
        vertical-align: bottom;
      }
    }
    .drop-list{
      position: absolute;
      top: 40px;
      left: -10px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 0 1px 2px #e5e5e5;
      li{
        padding: 15px 20px;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        &:hover{
          background: #f5f5f5;
        }
        &:last-child{
          border-bottom-color: transparent;
        }
      }
    }
  }
</style>
