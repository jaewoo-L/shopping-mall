<template>
  <div id="editUser">
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
          <label for="address">주소 : </label>
          <input 
              v-model="myInfo.address" 
              id="address"
              name="address"
              required>
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
      this.$http.put('/api/login/' + this.$route.params.id + '/myPage/edit', {myInfo: this.myInfo})
      .then((response) => {
        console.log('response');
        console.log(response.data);
        if (response.data.result == 'fail') {
          alert('Error, please, try again');
        }
        else {
          let nickname = response.data.nickname;
          localStorage.setItem("nickname", nickname);
          this.$store.state.nickname = nickname;
          alert('Success');
          this.$router.push('/' + this.$route.params.id + '/myPage' );
        }
      })
      .catch(function (error) {
        alert('frontend error');
        console.log(error);
      })
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

<style scoped>
</style>