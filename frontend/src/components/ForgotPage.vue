<template>
  <div id="forgot">
    <div class="forgot-box">
      <h1>Forgot Password</h1>
      <div class="text-box">
        <label for="username">이메일을 입력하세요.</label>
        <input
                  @input="$v.username.$touch()" 
                  v-model="username" 
                  id="username"
                  name="username" 
                  placeholder="abc@gmail.com">        
      </div>
      <button class="btn" @click="sendMail">메일 보내기</button>
    </div>
  </div>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      username: ''
    }
  },
    validations: {
      username: {
          required: required,
          email: email
      }
    },
    methods: {
      sendMail: function() {
        this.$http.post('/api/login/forgot', {username: this.username})
        .then((response) => {
          alert(response.data.result);
        })
      }
    }
}
</script>

<style scoped>
  #forgot {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;  
  }

  .forgot-box {
    position: absolute;
    width:350px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }

  .forgot-box h1 {
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