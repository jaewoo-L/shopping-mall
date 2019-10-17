<template>
 
</template>

<script>
export default {
  created() {
    this.$http.get('/api/login/logout') 
        .then((response) => {
          alert(response.data.msg);
           this.$store.dispatch('logout');
           this.$router.push('/login');
        })
  }
}
</script>