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
      <div class="submit">
              <button class="btn" @click="sendMail">메일 보내기</button>
      </div>
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
    font-size: 20px;
  }

  .text-box input {
    width: 80%;
    float: left;
  }
</style>