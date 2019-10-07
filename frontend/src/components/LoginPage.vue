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
        <input v-model="password" type="password" name="password" placeholder="Password">
      </div>      
      <a :href="url.signUpUrl" >회원가입</a> 
      <a style="float:right;" :href="url.forgotUrl" > 비밀번호가 기억나지 않나요? </a>
      <button class="btn" v-on:click="login">login</button>
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

<style scoped>
  #login {
    //position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;  
    //background: url(https://images.unsplash.com/photo-1492660206837-de783f9fdced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) no-repeat;
    //background-size: cover;
  }

  .login-box {
    position: absolute;
    width:280px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }

  .login-box h1 {
    float: left;
    font-size: 40px;
    border-bottom: 6px solid #050c30;
    margin-bottom: 30px;
    padding: 10px 0;
  }

  .text-box {
    width: 100%;
    overflow: hidden;
    font-size: 20px;
    padding: 8px 0;
    margin: 8px 0;
    border-bottom: 1px solid #050c30; 
  }

  .text-box i {
    width: 26px;
    float: left;
    text-align: center;
  }

  .text-box input {
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    width: 80%;
    margin: 0 10px;
    float: left;
  }

  .btn {
    width: 100%;
    background: none;
    border: 2px solid #050c30;
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
    margin: 10px 0;
  }
</style>