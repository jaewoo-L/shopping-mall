<template>
  <div id="login">
    <div> Login </div>
    <input v-model="username" name="username" placeholder="ID"> <br/>
    <input v-model="password" type="password" name="password" placeholder="password">
    <button v-on:click="login" >login</button>
    <hr>
    <a :href="url.signUpUrl" > Sign up </a>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
        username: '',
        password: '',
        url: {
           signUpUrl: '/signUp'
        }
    }
  },
   methods: {
    login: function (event) {
      this.$http.post('/api/login', {
        username: this.username,
        password: this.password
      })
      .then((response) => {  
            alert('success login' + response.data.username)
            console.log(response.data.session);
            let token = response.data.session;
            let username = response.data.username;
            //토큰을 node서버의 세션으로 부터 받아와서 로컬스토리지에 access_token이라는 이름으로 token을 저장하겠다.
            localStorage.setItem("access_token", token);
            localStorage.setItem("username", username);
            this.$store.state.username = username;
            this.$store.state.token = token;
       
        },
        (error) => { 
          alert('undifind error: ' +error.response.data.error)
        }
      )
      .catch(error => {
        alert('catch error: ' + error)
      })
    }
  }
}
</script>