<template>
  <div id="login">
    <div class="login-box">
      <h1> Login </h1>
      <div class="text-box">
        <i class="fas fa-user-alt"></i> 
        <input v-model="username" name="username" placeholder="E-mail"> 
      </div>
      
      <div class="text-box">
        <i class="fas fa-lock"></i>
        <input v-model="password" @keyup.enter="login" type="password" name="password" placeholder="Password">
      </div>  
      <router-link :to="{name: 'signUp'}">회원가입</router-link>
      <router-link :to="{name:'forgot'}" style="float:right;"> 비밀번호가 기억나지 않나요? </router-link>    
      <div class="submit">
              <button class="btn" @click="login">login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
        username: '',
        password: '',
        url: {
           signUpUrl: '/signUp',
           forgotUrl: '/forgot'
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
            alert(response.data.nickname + '님 환영합니다.');
            let token = response.data.session;
            let username = response.data.username;
            let nickname = response.data.nickname;
            let isAdmin = response.data.isAdmin
            localStorage.setItem("access_token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("isAdmin", isAdmin);
            this.$store.state.username = username;
            this.$store.state.nickname = nickname;
            this.$store.state.token = token;
            this.$store.state.isAdmin = isAdmin;
            this.$router.push('/');
       
        },
        (error) => { 
          if(error.response.data.error == undefined) {
            alert('아이디 혹은 비밀번호를 확인하세오.');
          } else {
            alert('Error: ' + error.response.data.error);
          }
        }
      )
      .catch(error => {
        alert('Error: ' + error)
      })
    }
  }
}
</script>

<style src="../../../public/stylesheets/login.css">
</style>