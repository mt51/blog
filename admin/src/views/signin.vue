<template>
  <div class="signin">
    <card class="login-card">
      <p slot="title">
        <Icon type="log-in"></Icon>
        登录
      </p>
      <div class="signin-box">
        <div class="form-item">
          <Input size="large" v-model="formData.account">
            <span slot="prepend"><Icon type="person"></Icon></span>
          </Input>
        </div>
        <div class="form-item">
          <Input size="large" v-model="formData.password" type="password">
            <span slot="prepend"><Icon type="locked"></Icon></span>
          </Input>
        </div>
        <div class="form-item">
          <Button type="primary" class="signin-btn">登录</Button>
        </div>
      </div>
    </card>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        account: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signin{
  width: 100%;
  height: 100%;
  background: url(/static/bg/signin_bg.jpeg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
  display: flex;
  justify-content: flex-end;
  align-items: center;;
  .login-card {
    width: 320px;
    margin-right: 10%;
  }
  .form-item{
    margin-bottom: 20px;
  }
  .signin-btn {
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
  .signin {
    justify-content: center;
    .login-card{
      margin: 0;
    }
  }
}
</style>
