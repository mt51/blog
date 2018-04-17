<template>
  <div class="header">
    <div class="title">{{title}}</div>
    <div class="userinfo">
      <el-button class="login-out" type="text">退出登录</el-button>
      <img class="avatar" src="http://ofl49b399.bkt.clouddn.com/1.jpg" alt="头像">
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheHeader',
  props: {
    title: String
  }
}
</script>
<style scoped>
.header {
  box-shadow: 5px 0 2px 5px #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  & .avatar{
    width: 40px;
    height: 40px;
    margin-left: 40px;
    border-radius: 50%;
  }
  & .login-out{
    padding: 0;
  }
  & .userinfo {
    display: flex;
    align-items: center;
  }
}
</style>
