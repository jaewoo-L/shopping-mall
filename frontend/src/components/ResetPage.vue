<template>
  <div id="reset">
    <div class="reset-box">
      <h1>Reset Password</h1>
        <div class="text-box" :class="{invalid: $v.password.$error}">
          <label for="password">변경할 비밀번호 : </label>
          <input 
                          id="password"
                          name="password" 
                          type="password"
                          @blur="$v.password.$touch()" 
                          v-model="password" 
                          placeholder="Password"> 
          <p v-if="$v.password.$error">최소 6자 이상 최대 15자 이하로 작성하세요.</p>
        </div> 
                      
        <div class="text-box" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">비밀번호확인 : </label>
          <input 
                              id="confirm-password"
                              name="confirmPassword" 
                              type="password"  
                              @blur="$v.confirmPassword.$touch()" 
                              v-model="confirmPassword" 
                              placeholder="ConfirmPassword">
          <p v-if="$v.confirmPassword.$error">패스워드가 일치하지 않습니다.</p>
        </div>      
      <button class="btn" @click="updatePassword" :disabled="$v.$invalid">비밀번호 변경</button>  
    </div>
  </div>
</template>

<script>
import {required, minLength, maxLength ,sameAs} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      password:'',
      confirmPassword:''
    }
  },
  validations: {
    password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      }
  },
  methods: {
    updatePassword: function() {
      this.$http.post('/api/login/reset/' + this.$route.params.token, {password: this.password})
      .then((response) => {
        alert(response.data.result);
        this.$router.push('/');
      })
    }
  }
}
</script>

<style scoped>
  #reset {
    //position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;  
    //background: url(https://images.unsplash.com/photo-1492660206837-de783f9fdced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) no-repeat;
    //background-size: cover;
  }

  .reset-box {
    position: absolute;
    width:350px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }

  .reset-box h1 {
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
    width: 100%;
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

  .text-box.invalid label {
      color: red;
  }

  .text-box.invalid input {
    background-color: #ffc9aa;
  }

  .text-box.invalid p {
    color:red;
    margin: 0;
    margin-top:5px;
    font-size: 8px;
  }
</style>