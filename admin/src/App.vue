<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate () {
    this.auth()
  },
  methods: {
    auth () {
      this.axios.get('/api/auth')
        .then(respnose => {
        })
        .catch(error => {
          if (error.response.status === 401) {
            window.localStorage.removeItem('token')
            this.$router.push({path: '/signin'})
          } else {
            console.error(error.response.data.verror.msg)
          }
        })
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  min-width: 375px;
}
</style>
