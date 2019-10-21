<template>
  <div id="myPage">
    <div class="myPage-box">
      <button @click="editUser">개인정보 변경</button>
      <p>닉네임: {{myInfo.nickname}}</p>
      <p>이름: {{myInfo.lastName}}{{myInfo.firstName}}</p>
      <p>성별: {{myInfo.avatar}}</p>
      <p>나이: {{myInfo.age}}</p>
      <p>주소: {{myInfo.address}}</p>
      <p>핸드폰: {{myInfo.phone_first}}-{{myInfo.phone_middle}}-{{myInfo.phone_last}}</p>
      <button @click="deleteUser">회원탈퇴</button>
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

<style src="../products/products.css">
</style>
