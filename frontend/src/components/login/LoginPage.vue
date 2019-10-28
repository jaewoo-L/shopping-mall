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
      <a :href="url.signUpUrl" >회원가입</a> 
      <a style="float:right;" :href="url.forgotUrl" > 비밀번호가 기억나지 않나요? </a>
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
            alert('success login' + response.data.username)
            console.log(response.data.session);
            let token = response.data.session;
            let username = response.data.username;
            let nickname = response.data.nickname;
            let isAdmin = response.data.isAdmin
            //토큰을 node서버의 세션으로 부터 받아와서 로컬스토리지에 access_token이라는 이름으로 token을 저장하겠다.
            localStorage.setItem("access_token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("isAdmin", isAdmin);
            this.$store.state.username = username;
            this.$store.state.nickname = nickname;
            this.$store.state.token = token;
            this.$store.state.isAdmin = isAdmin;
            //홈페이지로 보내기
            this.$router.push('/');
       
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

<style src="../../../public/stylesheets/login.css">
</style>