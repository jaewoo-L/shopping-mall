<template>
  <div id="SignUp">
    <div> Sign Up </div>
    ID : <input v-model="username" name="username" placeholder="ID"> <br />
    Password : <input v-model="password" name="password" type="password"  placeholder="password">
    <button v-on:click="signUp" >SignUp</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
        username: '',
        password: ''
    }
  },
  methods: {
    signUp: function (event) {
      this.$http.post('/api/login/signUp', { 
        username: this.username,
        password: this.password
      })
      .then((response) => {
      	console.log('response');
      	console.log(response.data);
        if (response.data.result == 0) {
          alert('Error, please, try again');
        }
        if (response.data.result == 1) {
          alert('Success');
          this.$router.push('/login');
        }
      })
      .catch(function (error) {
        alert('frontend error');
        console.log(error);
      })
    }
  }
}
</script>