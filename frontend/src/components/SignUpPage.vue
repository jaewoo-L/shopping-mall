<template>
  <div id="SignUp">
    <div class="signUp-box">
        <h1> Sign Up </h1>
        <div class="text-box" :class="{invalid: $v.username.$error}">
          <label for="username">ID : </label>
          <input
                    @blur="$v.username.$touch()" 
                    v-model="username" 
                    id="username"
                    name="username" 
                    placeholder="E-mail"> <button class="doubleCheck" @click="doubleCheck" >중복확인</button>
          <p v-if="$v.username.$error">E-mail 형식을 확인하세요.</p>
        </div>

        <div class="text-box" :class="{invalid: $v.password.$error}">
          <label for="password">비밀번호 : </label>
          <input 
                          id="password"
                          name="password" 
                          type="password"
                          @blur="$v.password.$touch()" 
                          v-model="password" 
                          maxlength="15"
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
                              maxlength="15"
                              placeholder="ConfirmPassword">
          <p v-if="$v.confirmPassword.$error">패스워드가 일치하지 않습니다.</p>
        </div>

        <div class="text-box">
          <label for="lastName">성 : </label>
          <input 
                    v-model="lastName" 
                    id="lastName"
                    name="lastName" 
                    placeholder="성(性)">
        </div>

        <div class="text-box">
          <label for="firstName">이름 : </label>
          <input 
                    v-model="firstName" 
                    id="firstName"
                    name="firstName" 
                    placeholder="이름">
        </div>

        <div class="text-box">
          <label>성별 : </label>
          <input
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

        <div class="text-box" :class="{invalid: $v.age.$error}">
          <label for="age">나이 : </label>
          <input 
                    @input="$v.age.$touch()"
                    v-model.number="age" 
                    id="age"
                    name="age" 
                    maxlength="2"
                    placeholder="20">
          <p v-if="$v.age.$error">숫자를 입력하세요.</p>             
        </div>

        <div class="text-box">
          <label for="address">주소 : </label>
          <input 
                    @input="$v.address.$touch()"
                    v-model="address" 
                    id="address"
                    name="address" 
                    placeholder="주소">
        </div>

        <div class="text-box">
          <label>핸드폰 : </label>
          <input
                        @input="$v.phone_first.$touch()" 
                        v-model="phone_first" 
                        name="phone_first"
                        maxlength="3"
                        class="phone" 
                        placeholder="010"> - <input
                                                  @input="$v.phone_middle.$touch()" 
                                                  v-model="phone_middle" 
                                                  name="phone_middle" 
                                                  maxlength="4"
                                                  class="phone"
                                                  placeholder="3333"> - <input
                                                                              @input="$v.phone_last.$touch()" 
                                                                              v-model="phone_last" 
                                                                              name="phone_last"
                                                                              maxlength="4"
                                                                              class="phone" 
                                                                              placeholder="8888">
        </div>

        <div class="submit">
              <button class="btn" @click="signUp" :disabled="$v.$invalid">회원가입</button>
        </div>
    </div>
    
  </div>
</template>

<script>
import {required, email, numeric, minLength, maxLength, sameAs} from 'vuelidate/lib/validators'

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
        currentUser:[],
        doubleCheckVariable: false
    }
  },
  methods: {
    signUp: function (event) {
      if(this.doubleCheckVariable){
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
      } else {
          alert('E-mail 중복확인이 필요합니다.');
      }
      
    },

    doubleCheck: function() {
        for(var i in this.currentUser) {
          if(this.currentUser[i].username == this.username) {
              alert('이미 존재하는 아이디 입니다.');
              return;
          }
        }
        alert('사용가능한 아이디 입니다.');
        this.doubleCheckVariable = true;
    }
  },

  validations: {
      username: {
        required: required,
        email: email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      },
      age: {
        numeric
      },
      address: {
        required
      },
      phone_first: {
        required,
        maxLength: maxLength(3)
      },
      phone_middle: {
        required,
        maxLength: maxLength(4)
      },
      phone_last: {
        required,
        maxLength: maxLength(4)
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
  #signUp {
    position: absolute;
    //width: 100%;
    //height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;  
    //background: url(https://images.unsplash.com/photo-1492660206837-de783f9fdced?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) no-repeat;
    //background-size: cover;
  }

  .signUp-box {
    position: absolute;
    width:360px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -25%);
    padding-bottom: 70px;
  }

  .signUp-box h1 {
    float: left;
    font-size: 40px;
    border-bottom: 6px solid #050c30;
    margin-bottom: 30px;
    padding: 10px 0;
  }

  .text-box {
    width: 100%;
    overflow: hidden;
    font-size: 15px;
    padding: 8px 0;
    margin: 8px 0;
    border-bottom: 1px solid #050c30; 
  }

  .text-box input {
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    //width: 80%;
    margin: 0 10px;
    //float: left;
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

  .phone {
    width: 40px;
  }

  .doubleCheck {
    cursor: pointer;
    background: none;
    border: 1px solid #050c30;
  }

  .submit .btn {
    width: 100%;
    background: none;
    border: 2px solid #050c30;
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
    margin: 10px 0;
  }

  .submit .btn:disabled {
    cursor: not-allowed;
    border: 2px solid #b3b5b4;
  }

</style>