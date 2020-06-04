<template>
  <div v-if="auth && isAdmin" id="management" class="container">
    <h1>회원관리</h1>
    <div class="searchbox">
      <input v-model="search" class="searchbar" @keyup.enter="searchUser" placeholder="유저검색">
      <button type="submit" class="btn btn-default" @click="searchUser"><i class="fas fa-search"></i></button>
    </div>
    <div class="section cboth">
      <div class="table-top">
        <div class="list w190" @click="sortUser('username')">E-Mail</div>
        <div class="list w430" @click="sortUser('jibunAddress')">주소</div>
        <div class="list w150" @click="sortUser('phone_middle')">Phone</div>
        <div class="list w50" @click="sortUser('age')">나이</div>
        <div class="list w50">비고</div>
      </div>
      <div v-for="(user,idx) in nowUsers" v-bind:key="idx._id" class="table-list" @click="openModal(idx)">
        <div class="list w190 pl-10">{{user.username}}</div>
				<div class="list w430 pl-10">({{user.postcode}}){{user.jibunAddress}} {{user.detailAddress}}</div>
				<div class="list w150 pl-10">{{user.phone_first}}-{{user.phone_middle}}-{{user.phone_last}}</div>
        <div class="list w50">{{user.age}}</div>
				<div class="list w50"><button class="btn btn-sm btn-danger" @click.stop="deleteUser(idx)">삭제</button> </div>
      </div>
    </div>

    <ManageModal @close="closeModal" v-if="modal">
      <!-- default 슬롯 콘텐츠 -->
      <div class="myModal">
        <p>E-mail : {{modalUser.username}}</p>
        <p>이름 : {{modalUser.lastName}}{{modalUser.firstName}}</p>
        <p>나이 : {{modalUser.age}}</p>
        <p>번호 : {{modalUser.phone_first}}-{{modalUser.phone_middle}}-{{modalUser.phone_last}}</p>
        <p>성별 : {{modalUser.avatar}}</p>
        <p>주소 : ({{modalUser.postcode}}){{modalUser.jibunAddress}}</p>
        <p>       {{modalUser.detailAddress}}{{modalUser.extraAddress}}</p>
      </div>
      <!-- footer 슬롯 콘텐츠 -->
      <template slot="footer">
        <button class="btn btn-primary" @click="closeModal">확인</button>
      </template>
    </ManageModal>
    <div class="paging" aria-label="Page navigation">
      <ul v-if="pages && pages > 0" class="pagination justify-content-center">
        <div class="page-box">
          <li v-if="current == 1" class="page-item"><a class="page-link disabled">«</a></li>
          <li v-else><a class="page-link" @click="mipageUser" >«</a></li>
        </div>
        <div v-for="i in changelist" class="page-box">
          <li v-if="i == current"><a class="page-link active">{{i}}</a></li>
          <li v-else><a class="page-link"  @click="numpageUser(i)"> {{i}} </a></li>
        </div>
        <div class="page-box">
          <li v-if="current == pages" class="page-item disabled"><a class="page-link disabled">»</a></li>
          <li v-else><a class="page-link" @click="pluspageUser" style="cursor:pointer">»</a></li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import ManageModal from './ManagementModal'
export default {
  data:function() {
    return {
      users:[],
      modalUser:{},
      modal:false,
      search:'',
      noMatch:null,
      list: [],
      current: null,
      pages:null,
      page:null,
      sortProperty:{}
    }
  },
  components: { ManageModal },
  computed: {
    auth(){
      return this.$store.getters.isAuthenticated;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    nowUsers() {
      return this.users;
    },
    changelist() {
      while (this.list.length) {
        this.list.pop();
      }
      if(Number(this.current) < 6) {
        for(var i= (Number(this.current) % 6 == 0 ? Number(this.current) : Number(this.current) - Number(this.current) % 6 + 1 ), j= i;   i <= (j + 4) && i <= this.pages; i++) this.list.push(i);
        return this.list;
      } else {
        for(var i= (Number(this.current) % 6 == 0 ? Number(this.current) : Number(this.current) - Number(this.current) % 6), j= i; i <= (j + 5) && i <= this.pages; i++) this.list.push(i);
        return this.list;
      }
    }
  },
  methods: {
    sortUser(option) {
      let result;
      //add new property
      if(!this.sortProperty.hasOwnProperty(option)) {
        this.sortProperty[option]=0;
      }
      for(let property in this.sortProperty) {
        if(property == option) this.sortProperty[property]+=1;
        else this.sortProperty[property]=0;
      }
      if(this.sortProperty[option]!=0 && this.sortProperty[option]%2==0) result=1;
      else result=-1;
      this.users.sort((a,b)=> {
        let listA,listB;
        listA = a[option];
        listB = b[option];
        if (listA < listB)return result;
        if (listA > listB)return -result;
        return 0;
      });
    },
    openModal(idx) {
      this.modal = true;
      this.modalUser = this.users[idx];
    },
    closeModal() {
      this.modal = false
    },
    deleteUser(idx) {
      if(confirm('정말 추방 하시겠습니까?') == true) {
        this.$http.delete('/api/login/' + this.users[idx]._id + '/myPage')
        .then((response) => {
          if(response.data.result == 'success') {
            alert('삭제 되었습니다.');
            this.users.splice(idx,1);
          } else if(response.data.result == 'fail') {
            alert('다시 시도해 주세요.')
          }
        })
        .catch(error => {
          alert(error)
        })
      }
    },
    searchUser: function() {
      if(!this.search){
        this.$http.get('/api/login/' + this.$store.getters.token +'/management?page=' + 1)
        .then((response) => {
              this.noMatch=false;
              this.users = response.data.users;
              this.current = response.data.current;
              this.pages = response.data.pages;
              this.page = response.data.page;
              this.$store.dispatch('searchDelete')
              localStorage.setItem("management", 1);
              this.$router.push('/management?page=' + 1);
        })
      }
      else {
          this.$http.get('/api/login/' + this.$store.getters.token +'/management?page=' + 1 + '&search=' + this.search)
          .then((response) => {
              if(response.data.noMatch) {
                this.noMatch = response.data.noMatch;
              }
              else {
                this.users = response.data.users;
                this.current = response.data.current;
                this.pages = response.data.pages;
                this.page = response.data.page;
                localStorage.setItem("management", 1);
                localStorage.setItem("searchUsers", this.search);
                this.$router.push('/management?page=' + 1 +'&search=' + this.search);
              }
          })
      }
    },

    mipageUser: function() {
      if(!this.search) {
        this.$http.get('/api/login/' + this.$store.getters.token +'/management/?page=' + (Number(this.current) - 1))
        .then((response) => {
            this.users = response.data.users;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            localStorage.setItem("management", this.current);
            this.$router.push('/management?page=' + (Number(this.current)));
        })
      } else {
        this.$http.get('/api/login/' + this.$store.getters.token +'/management/?page=' + (Number(this.current) - 1) + '&search=' + this.search)
        .then((response) => {
            this.users = response.data.users;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            localStorage.setItem("management", this.current);
            this.$router.push('/management?page=' + (Number(this.current)) + '&search=' + this.search);
        })
      }
    },
    numpageUser: function(i) {
      if(!this.search){
        this.$http.get('/api/login/' + this.$store.getters.token +'/management/?page=' + i)
        .then((response) => {
            this.users = response.data.users;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            localStorage.setItem("management", this.current);
            this.$router.push('/management?page=' + (Number(this.current)));
        })
      } else{
        this.$http.get('/api/login/' + this.$store.getters.token +'/management/?page=' + i + '&search=' + this.search)
        .then((response) => {
            this.users = response.data.users;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            localStorage.setItem("management", this.current);
            this.$router.push('/management?page=' + (Number(this.current)) + '&search=' + this.search);
        })
      }
    },
    pluspageUser: function() {
      if(!this.search){
        this.$http.get('/api/login/' + this.$store.getters.token +'/management/?page='+(Number(this.current)+1))
        .then((response) => {
            this.users = response.data.users;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            localStorage.setItem("management", this.current);
            this.$router.push('/management?page=' + (Number(this.current)));
        })
      } else {
        this.$http.get('/api/login/' + this.$store.getters.token +'/management/?page='+(Number(this.current)+1) + '&search=' + this.search)
        .then((response) => {
            this.users = response.data.users;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            localStorage.setItem("management", this.current);
            this.$router.push('/management?page=' + (Number(this.current)) + '&search=' + this.search);
        })
      }

    }
  },
  created() {
      this.search = this.$store.getters.searchUsers;
      this.current = this.$store.getters.management;
      if(!this.search) {
        this.$http.get('/api/login/' + this.$store.getters.token +'/management/?page='+(Number(this.current)))
        .then((response) => {
          if(response.data.result == 'fail') {
            alert('관리자가 아닙니다.')
            this.$router.push('/');
          } else {
            this.users = response.data.users;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
          }
        })
      } else {
        this.$http.get('/api/login/' + this.$store.getters.token +'/management/?page='+(Number(this.current)) + '&search=' + this.search)
        .then((response) => {
          if(response.data.result == 'fail') {
            alert('관리자가 아닙니다.')
            this.$router.push('/');
          } else {
            this.users = response.data.users;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
          }
        })
      }

  }
}
</script>

<style src="../../../public/stylesheets/management.css">

</style>
