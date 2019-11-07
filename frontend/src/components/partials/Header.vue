<template>
  <div id="header">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="/">
            <p class="brand-name">JaeWoo</p>
          </a>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav mL">
          <li class="active"><a href="/products" @click="productsPageSet">All Products</a></li>
          <li class="active"><a href="/products/tops" @click="topsPageSet">Tops</a></li>
          <li class="active"><a href="/products/bottoms" @click="bottomsPageSet">Bottoms</a></li>
          <li class="active"><a href="/products/accs" @click="accsPageSet">Accs</a></li>
        </ul>
        
        <ul class="myMenu">
          <li v-if="auth" class="navbar-text navbar-right"><a :href="'/' + this.$store.getters.token + '/orders'" class="navbar-link">구매품목</a></li>
          <li v-if="auth" class="navbar-text navbar-right"><a :href="'/' + this.$store.getters.token + '/basket/'" class="navbar-link">찜목록</a></li>
          <li v-if="!auth" class="navbar-text navbar-right"><a href="/signup" class="navbar-link">회원가입</a></li>
          <li v-if="!auth" class="navbar-text navbar-right"><a href="/login" class="navbar-link">로그인</a></li>
          <li v-if="auth" class="navbar-text navbar-right"><a href="/logout" class="navbar-link">로그아웃</a></li>
          <li v-if="auth" class="navbar-text navbar-right"><a :href="'/' + this.$store.getters.token + '/myPage'" class="navbar-link">{{nickname}}</a></li>
        </ul> 
      </div> 

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        
      </div>
    </div>
    </nav>    
  </div>
</template>

<script>
  export default {
    computed: {
      auth(){
        return this.$store.getters.isAuthenticated
      },
      nickname() {
        return this.$store.getters.nickname;
      }
    },
    methods: {
      productsPageSet() {
        localStorage.setItem("productsPage", 1);
        localStorage.removeItem("searchProducts");
      },
      topsPageSet() {
        localStorage.setItem("topsPage", 1);
        localStorage.removeItem("searchProducts");
      },
      bottomsPageSet() {
        localStorage.setItem("bottomsPage", 1);
        localStorage.removeItem("searchProducts");
      },
      accsPageSet() {
        localStorage.setItem("accsPage", 1);
        localStorage.removeItem("searchProducts");
      }
    }
  }
</script>

<style scoped src="../../../public/stylesheets/partials.css">

</style>