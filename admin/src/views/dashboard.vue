<template>
  <div class="dashboard">
    <Row type="flex" class="home-container">
      <Col span="4" class="layout-menu-left">
        <left></left>
      </Col>
      <Col span="20" class="layout-main">
        <div class="layout-header">
          <bHeader></bHeader>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view/>
          </div>
        </div>
        <div class="layout-footer">
          胖先生的‘窝’
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import left from '@/components/left/left'
  import header from '@/components/header/header'
  export default {
    name: 'home',
    data () {
      return {}
    },
    components: {
      left,
      bHeader: header
    }
  }
</script>
<style lang="scss">
  .dashboard{
    height: 100%;
    .home-container{
      height: 100%;
      .layout-content{
        height: calc(100vh - 140px);
        overflow: auto;
      }
      .layout-footer {
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
      .layout-content-main{
        height: 100%;
      }
      @media screen and (max-width: 870px) {
        .layout-menu-left {
          display: none;
        }
        .layout-main {
          width: 100%;
          
        }
      }
    }
  }
</style>