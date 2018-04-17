<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <TheAside />
      </el-aside>
      <el-container>
        <el-header class="rs-header">
          <TheHeader :title="title" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <a class="link" href="http://www.miitbeian.gov.cn/" target="_blank">皖ICP备17027709号</a>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import TheAside from '@/pages/Layout/aside'
import TheHeader from '@/pages/Layout/header'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  },
  components: {
    TheAside,
    TheHeader
  }
}
</script>
<style scoped>
@import "../styles/base/theme.css";
.home {
  & .link {
    display: block;
    text-align: center;
    &:hover {
      color: var(--link-color);
      text-decoration: underline;
    }
  }
  & .rs-header {
    padding: 0;
  }
}
</style>
