<template>
  <div id="SignUp">
    <div> Sign Up </div>
    <div class="input" :class="{invalid: $v.username.$error}">
      <label for="username">ID : </label>
      <input
                @input="$v.username.$touch()" 
                v-model="username" 
                id="username"
                name="username" 
                placeholder="ID"> <button @click="doubleCheck" >중복확인</button><br />
      <p v-if="$v.username.$error">E-mail 형식을 확인하세요.</p>
    </div>

    <div class="input" :class="{invalid: $v.password.$error}">
      <label for="password">비밀번호 : </label>
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

    <div class="input">
      <label for="lastName">성 : </label>
      <input 
                v-model="lastName" 
                id="lastName"
                name="lastName" 
                placeholder="성"> <br />
    </div>

    <div class="input">
      <label for="firstName">이름 : </label>
      <input 
                v-model="firstName" 
                id="firstName"
                name="firstName" 
                placeholder="이름"> <br />
    </div>

    <div class="input">
      성별 : <input
                  type="radio"
                  id="male"
                  value="Male"
                  v-model="gender"> Male
            <input
                  type="radio"
                  id="female"
                  value="Female"
                  v-model="gender"> Female  
    </div>

    <div class="input">
      <label for="age">나이 : </label>
      <input 
                v-model="age" 
                id="age"
                name="age" 
                placeholder="나이"> <br />
    </div>

    <div class="input">
      <label for="address">주소 : </label>
      <input 
                @input="$v.address.$touch()"
                v-model="address" 
                id="address"
                name="address" 
                placeholder="주소"> <br />
    </div>

    <div class="input">
      핸드폰 : <input
                    @input="$v.phone_first.$touch()" 
                    v-model.number="phone_first" 
                    name="phone_first" 
                    placeholder="010"> - <input
                                              @input="$v.phone_middle.$touch()" 
                                              v-model.number="phone_middle" 
                                              name="phone_middle" 
                                              placeholder="3333"> - <input
                                                                          @input="$v.phone_last.$touch()" 
                                                                          v-model.number="phone_last" 
                                                                          name="phone_last" 
                                                                          placeholder="8888">
    </div>

    <div class="submit">
          <button v-on:click="signUp" :disabled="$v.$invalid">회원가입</button>
    </div>
  </div>

  <div>{{$v}}</div>
</template>

<script>
import {required, email, numeric, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
  data: function () {
    return {
        username: '',
        password: '',
        confirmPassword: '',
        lastName: '',
        firstName: '',
        gender: '',
        age: '',
        address: '',
        phone_first: '',
        phone_middle: '',
        phone_last: '',
        currentUser:[]
    }
  },
  methods: {
    signUp: function (event) {
      this.$http.post('/api/login/signUp', { 
        username: this.username,
        password: this.password,
        lastName: this.lastName,
        firstName: this.firstName,
        gender: this.gender,
        age: this.age,
        address: this.address,
        phone_first: this.phone_first,
        phone_middle: this.phone_middle,
        phone_last: this.phone_last
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
    },

    doubleCheck: function() {
        for(var i in this.currentUser) {
          if(this.currentUser[i].username == this.username) {
              alert('이미 존재하는 아이디 입니다.');
              return;
          }
        }
        alert('사용가능한 아이디 입니다.');
    }
  },
  validations: {
      username: {
        required: required,
        email: email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      },
      address: {
        required
      },
      phone_first: {
        required,
        numeric
      },
      phone_middle: {
        required,
        numeric
      },
      phone_last: {
        required,
        numeric
      }
  },

  created() {
    this.$http.get('/api/login/signUp')
    .then((response) => {
      this.currentUser = response.data
    })
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