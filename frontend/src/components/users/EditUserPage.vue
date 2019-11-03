<template>
  <div id="editUser" class="container">
    <div class="editUser-box">
        <h1> 개인정보 변경 </h1>

        <div class="text-box">
          <label for="nickname">닉네임 : </label>
          <input 
              v-model="myInfo.nickname" 
              id="nickname"
              name="nickname"
              required>
        </div>

        <div class="text-box">
          <label for="lastName">성 : </label>
          <input 
              v-model="myInfo.lastName" 
              id="lastName"
              name="lastName"
              required>
        </div>

        <div class="text-box">
          <label for="firstName">이름 : </label>
          <input 
              v-model="myInfo.firstName" 
              id="firstName"
              name="firstName"
              required>
        </div>

        <div class="text-box">
          <label>성별 : </label>
          <input
              type="radio"
              id="male"
              value="남자"
              v-model="myInfo.avatar"> Male
          <input
              type="radio"
              id="female"
              value="여자"
              v-model="myInfo.avatar"> Female  
        </div>

        <div class="text-box">
          <label for="age">나이 : </label>
          <input 
              v-model.number="myInfo.age" 
              id="age"
              name="age" 
              maxlength="2"
              required>       
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
                  v-model="myInfo.detailAddress"
                  type="text" 
                  class="addressFinder"
                  id="detailAddress"
                  placeholder="상세주소"
                  required>
        </div>
        <div class="text-box">
          <input type="text" class="addressFinder" id="extraAddress" placeholder="참고항목">
        </div>

        <div class="text-box">
          <label>핸드폰 : </label>
          <input
                v-model="myInfo.phone_first" 
                name="phone_first"
                maxlength="3"
                class="phone" required> - <input 
                                                v-model="myInfo.phone_middle" 
                                                name="phone_middle" 
                                                maxlength="4"
                                                class="phone" required> - <input
                                                                                v-model="myInfo.phone_last" 
                                                                                name="phone_last"
                                                                                maxlength="4"
                                                                                class="phone" required>
        </div>

        <div class="submit">
              <button class="btn" @click="editUser">수정</button>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      myInfo: {}
    }
  },
  methods: {
    editUser() {
      this.$http.put('/api/login/' + this.$route.params.id + '/myPage/edit', {
        nickname: this.myInfo.nickname,
        lastName: this.myInfo.lastName,
        firstName: this.myInfo.firstName,
        avatar: this.myInfo.gender,
        age: this.myInfo.age,
        postcode: this.$store.state.postcode,
        roadAddress: this.$store.state.roadAddress,
        jibunAddress: this.$store.state.jibunAddress,
        detailAddress: this.myInfo.detailAddress,
        extraAddress: this.$store.state.extraAddress,
        phone_first: this.myInfo.phone_first,
        phone_middle: this.myInfo.phone_middle,
        phone_last: this.myInfo.phone_last
      })
      .then((response) => {
        if (response.data.result == 'fail') {
          alert('Error, 다시 시도해 주세요.');
        }
        else {
          let nickname = response.data.nickname;
          localStorage.setItem("nickname", nickname);
          this.$store.state.nickname = nickname;
          alert('성공적으로 변경되었습니다.');
          this.$router.push('/' + this.$route.params.id + '/myPage' );
        }
      })
      .catch(function (error) {
        alert(error);
      })
    },

    execPostcode: function() {
        this.$store.dispatch('postcode');
    }
  },

  created() {
    this.$http.get('/api/login/' + this.$route.params.id + '/myPage')
    .then((response) => {
      this.myInfo = response.data;
    })
  }
}
</script>

<style src="../../../public/stylesheets/login.css">
</style>