<template>
  <div id="signUp">
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

        <div class="text-box" :class="{invalid: $v.nickname.$error}">
          <label for="nickname">닉네임 : </label>
          <input
                    @blur="$v.nickname.$touch()" 
                    v-model="nickname" 
                    id="nickname"
                    name="nickname" 
                    placeholder="nickName">
          <p v-if="$v.nickname.$error">닉네임을 입력하세요</p>
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
                      value="남자"
                      v-model="gender"> Male
                <input
                      type="radio"
                      id="female"
                      value="여자"
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
          <label for="postcode">주소 : </label>
          <input type="text" id="postcode" class="post-num" placeholder="우편번호">
          <button class="post-num-btn"  @click="execPostcode()">우편번호 찾기</button>
          <br>
        </div>
        <div class="text-box">
          <input type="text" class="addressFinder" id="roadAddress" placeholder="도로명주소">
        </div>
        <div class="text-box">
          <input type="text" class="addressFinder" id="jibunAddress" placeholder="지번주소">
        </div>
          <span id="guide" style="color:#999;display:none"></span>
        <div class="text-box">
          <input 
                  @input="$v.detailAddress.$touch()"
                  v-model="detailAddress"
                  type="text" 
                  class="addressFinder"
                  id="detailAddress" 
                  placeholder="상세주소">
        </div>
        <div class="text-box">
          <input type="text" class="addressFinder" id="extraAddress" placeholder="참고항목">
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
        nickname: '',
        lastName: '',
        firstName: '',
        gender: '',
        age: '',
        detailAddress: '',
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
            nickname: this.nickname,
            lastName: this.lastName,
            firstName: this.firstName,
            avatar: this.gender,
            age: this.age,
            postcode: this.$store.state.postcode,
            roadAddress: this.$store.state.roadAddress,
            jibunAddress: this.$store.state.jibunAddress,
            detailAddress: this.detailAddress,
            extraAddress: this.$store.state.extraAddress,
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
    },

    execPostcode: function() {
        this.$store.dispatch('postcode');
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
      nickname: {
        required
      },
      age: {
        numeric
      },
      detailAddress: {
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

<style src="../../../public/stylesheets/login.css">
  
</style>