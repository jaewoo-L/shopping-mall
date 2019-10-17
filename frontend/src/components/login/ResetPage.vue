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
        
      <div class="submit">
          <button class="btn" @click="updatePassword" :disabled="$v.$invalid">비밀번호 변경</button>
      </div>
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

<style src="./login.css">
</style>