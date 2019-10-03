<template>
  <div>
    <h1>Reset Password</h1>
    <div>
      <div class="input" :class="{invalid: $v.password.$error}">
      <label for="password">변경할 비밀번호 : </label>
      <input 
                      id="password"
                      name="password" 
                      type="password"
                      @blur="$v.password.$touch()" 
                      v-model="password" 
                      placeholder="password"> <br />
    </div>                

    <div class="input" :class="{invalid: $v.confirmPassword.$error}">
      <label for="confirm-password">비밀번호확인 : </label>
      <input 
                          id="confirm-password"
                          name="confirmPassword" 
                          type="password"  
                          @blur="$v.confirmPassword.$touch()" 
                          v-model="confirmPassword" 
                          placeholder="password"> <br />
      <p v-if="$v.confirmPassword.$error">패스워드가 일치하지 않습니다.</p>
    </div>
        <button @click="updatePassword" :disabled="$v.$invalid">비밀번호 변경</button>        
    </div>
  </div>
</template>

<script>
import {required, minLength, sameAs} from 'vuelidate/lib/validators'

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
        minLength: minLength(6)
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

<style>
  .input.invalid label {
      color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }
</style>