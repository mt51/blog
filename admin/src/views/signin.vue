<template>
  <div class="signin">
    <card class="login-card">
      <p slot="title">
        <Icon type="log-in"></Icon>
        登录
      </p>
      <div class="signin-box">
        <Form ref="signin" :model="formData" :rules="ruleValidate" @keyup.enter.native="signin">
          <FormItem prop="account">
            <Input size="large" v-model="formData.account">
              <span slot="prepend"><Icon type="person"></Icon></span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input size="large" v-model="formData.password" type="password">
              <span slot="prepend"><Icon type="locked"></Icon></span>
            </Input>
          </FormItem>
        </Form>
        <div class="form-item">
          <Button type="primary" class="signin-btn" @click.native="signin" :disabled="disabled">登录</Button>
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
              }, 1500)
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
