<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <TheAside />
      </el-aside>
      <el-container>
        <el-header></el-header>
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
export default {
  name: 'home',
  data () {
    return {}
  },
  components: {
    TheAside
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
}
</style>
