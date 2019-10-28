<template>
  <div id="myPage" class="container">
    <div class="myPage-box">
      <h1>나의 정보</h1>
      <div class="information">
        <p><strong>닉네임: </strong>{{myInfo.nickname}}</p>
        <p><strong>이름: </strong>{{myInfo.lastName}}{{myInfo.firstName}}</p>
        <p><strong>나이: </strong>{{myInfo.age}}</p>
        <p><strong>주소: </strong>{{myInfo.roadAddress}}</p>
        <p>{{myInfo.detailAddress}}</p>
        <p><strong>핸드폰:</strong> {{myInfo.phone_first}}-{{myInfo.phone_middle}}-{{myInfo.phone_last}}</p>
      </div>

      <button @click="editUser" class="btn btn-default">개인정보 변경</button>
      <button @click="deleteUser" class="btn btn-default">회원탈퇴</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myInfo: {}
    }
  },
  methods: {
    editUser() {
      this.$router.push('/' + this.$route.params.id + '/myPage/edit')
    },
    deleteUser() {
      if(confirm('정말 삭제하시겠습니까?') == true) {
        this.$http.delete('/api/login/' + this.$route.params.id + '/myPage')
        .then((response) => {
          if(response.data.result == 'success') {
            alert('삭제 성공했습니다.');
            this.$store.dispatch('logout');
            this.$router.push('/login');
          } else if(response.data.result == 'fail') {
            alert('삭제 실패했습니다.')
          }
        })
        .catch(error => {
          alert(error)
        })
      }
        
    }
  },
  created() {
    this.$http.get('/api/login/' + this.$route.params.id + '/myPage')
    .then((response) => {
      this.myInfo = response.data;
    })
    this.$store.dispatch('tryAutoLogin')
      .then((response) => {
        console.log('tryAutoLogin');
        console.log(typeof this.$store.getters.isAdmin);
      });
  }
}
</script>

<style src="../../../public/stylesheets/user.css">
</style>
