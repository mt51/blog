<template>
  <div class="signin">
    <el-card class="login-card">
      <p slot="header">登录</p>
      <div class="signin-box">
        <el-form ref="signin" :model="formData" :rules="ruleValidate" @keyup.enter.native="signin">
          <el-form-item prop="account">
            <el-input v-model="formData.account">
              <template slot="prepend">
                <i class="fa fa-user login_icon"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formData.password" type="password">
              <template slot="prepend">
                <i class="fa fa-key login_icon"></i>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="form-item">
          <el-button type="primary" class="signin-btn" @click="signin" :disabled="disabled">登录</el-button>
        </div>
      </div>
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
      },
      disabled: false,
      ruleValidate: {
        account: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    signin () {
      this.$refs.signin.validate(valid => {
        if (valid) {
          this.disabled = true
          this.axios.post('/api/signin', this.formData)
            .then(response => {
              this.disabled = false
              if (response.data.code === 0 && response.data.data.token) {
                this.$Message.success('登录成功')
                window.localStorage.setItem('token', response.data.data.token)
                setTimeout(() => {
                  this.$router.push({name: 'home'})
                }, 1000)
              }
            })
            .catch(e => {
              this.disabled = false
              if (e.response.data) {
                this.$Message.error(e.response.data.verror.msg)
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.signin {
  width: 100%;
  height: 100%;
  background: url(./images/signin_bg.jpeg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
  display: flex;
  justify-content: flex-end;
  align-items: center;;
  & .login-card {
    width: 320px;
    margin-right: 10%;
  }
  & .signin-btn {
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
  .signin {
    justify-content: center;
    & .login-card{
      margin: 0;
    }
  }
}
</style>
