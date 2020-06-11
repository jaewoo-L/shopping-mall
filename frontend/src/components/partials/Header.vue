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
        <ul class="nav navbar-nav mL myMenu">
          <li class="active"><a href="/products" @click="productsPageSet">All Products</a></li>
          <li class="active"><a href="/products/tops" @click="topsPageSet">Tops</a></li>
          <li class="active"><a href="/products/bottoms" @click="bottomsPageSet">Bottoms</a></li>
          <li class="active"><a href="/products/accs" @click="accsPageSet">Accs</a></li>
        </ul>

        <ul class="myMenu right">
          <li v-if="auth && isAdmin" class="navbar-text navbar-right"><a :href="'/' + this.$store.getters.token + '/purchaseState'" class="navbar-link">주문현황</a></li>
          <li v-if="auth && !isAdmin" class="navbar-text navbar-right"><a :href="'/' + this.$store.getters.token + '/orders'" class="navbar-link">배송조회</a></li>
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
        return this.$store.getters.isAuthenticated;
      },
      isAdmin() {
        return this.$store.getters.isAdmin;
      },
      nickname() {
        return this.$store.getters.nickname;
      }
    },
    mounted() {
      $(function(){
        var $path = $(location).attr('pathname');
        var $link = $('#header .navbar-default .navbar-nav>.active>a');
        var $myMenu = $('#header .right li a');
        $link.click(function(){
          $link.each(function(){
              $(this).removeClass('active');
          })
          $(this).addClass('active');
        })
        if($path == "/products") {
          $link.eq(0).addClass('active');
        } else if($path == "/products/tops") {
          $link.eq(1).addClass('active');
        } else if($path == "/products/bottoms") {
          $link.eq(2).addClass('active');
        } else if($path == "/products/accs") {
          $link.eq(3).addClass('active');
        } else if($path == "/login") {
          $myMenu.eq(1).addClass('active');
        } else if($path == "/signup") {
          $myMenu.eq(0).addClass('active');
        }

        $(window).scroll($.throttle(5000,function(){
          if($(window).scrollTop() > 0) {
            $('#header').addClass('sticky')
          } else {
            $('#header').removeClass('sticky')
          }
        }));
      })
    },
    methods: {
      productsPageSet() {
        localStorage.setItem("productsPage", 1);
        localStorage.removeItem("searchProducts");
      },
      topsPageSet() {
        localStorage.setItem("topsPage", 1);
      },
      bottomsPageSet() {
        localStorage.setItem("bottomsPage", 1);
      },
      accsPageSet() {
        localStorage.setItem("accsPage", 1);
      }
    }
  }
</script>

<style scoped src="../../../public/stylesheets/partials.css">

</style>
