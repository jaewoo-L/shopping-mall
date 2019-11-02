<template>
  <div>
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
        <ul class="nav navbar-nav mL show-small">
          <li class="active"><a href="/products">All Products</a></li>
          <li class="active"><a href="/products/tops">Tops</a></li>
          <li class="active"><a href="/products/bottoms">Bottoms</a></li>
          <li class="active"><a href="/products/accs">Accs</a></li>
        </ul>
        <ul class="show-small">
          <li v-if="auth" class="navbar-text navbar-right"><a :href="'/' + this.$store.getters.token + '/myPage'" class="navbar-link">{{nickname}}</a></li>
          <li v-if="auth" class="navbar-text navbar-right"><a :href="'/' + this.$store.getters.token + '/orders'" class="navbar-link">주문조회</a></li>
          <li v-if="auth" class="navbar-text navbar-right"><a :href="'/' + this.$store.getters.token + '/basket/'" class="navbar-link">장바구니</a></li>
          <li v-if="!auth" class="navbar-text navbar-right"><a href="/signup" class="navbar-link">회원가입</a></li>
          <li v-if="!auth" class="navbar-text navbar-right"><a href="/login" class="navbar-link">로그인</a></li>
          <li v-if="auth" class="navbar-text navbar-right"><a href="/logout" class="navbar-link">로그아웃</a></li>
        </ul> 

        <ul class="nav navbar-nav mL show-large">
          <router-link tag="li" :to="{name: 'products'}" active-class="active" exact><a>All Products</a></router-link>
          <router-link tag="li" :to="{name: 'tops'}" active-class="active"><a>Tops</a></router-link>
          <router-link tag="li" :to="{name: 'bottoms'}" active-class="active"><a>Bottoms</a></router-link>
          <router-link tag="li" :to="{name: 'accs'}" active-class="active"><a>Accs</a></router-link>
        </ul>
        <ul class="show-large">
          <li v-if="auth" class="navbar-text navbar-right"><router-link :to="'/' + this.$store.getters.token + '/orders'" tag="a" class="navbar-link">주문조회</router-link></li>
          <li v-if="auth" class="navbar-text navbar-right"><router-link :to="'/' + this.$store.getters.token + '/basket/'" tag="a" class="navbar-link">장바구니</router-link></li>
          <li v-if="!auth" class="navbar-text navbar-right"><router-link :to="{name: 'signUp'}" tag="a" class="navbar-link">회원가입</router-link></li>
          <li v-if="!auth" class="navbar-text navbar-right"><router-link :to="{name: 'login'}" tag="a" class="navbar-link">로그인</router-link></li>
          <li v-if="auth" class="navbar-text navbar-right"><router-link :to="{name: 'logout'}" tag="a" class="navbar-link">로그아웃</router-link></li>
          <li v-if="auth" class="navbar-text navbar-right"><router-link :to="'/' + this.$store.getters.token + '/myPage'"  tag="a" class="navbar-link">{{nickname}}</router-link></li>
        </ul>  
      </div> 

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        
      </div>
    </div><!-- /.container-fluid -->
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
    }
  }
</script>

<style scoped>
  li { list-style-type : none }
  
  .navbar-default {
    background-color: #fcfcfc;
    border-color: #fcfcfc;
  }

  .navbar-default .navbar-nav>.active>a {
    background-color: #fcfcfc;
  }

  .navbar-brand .brand-name {
    font-family: 'Big Shoulders Text', cursive;
    font-size:23px;
    color: #000;
  }


  @media (min-width: 768px){
    .navbar-right {
      float: right!important;
      margin-right: 5px;
    }

    .show-small {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .show-large {
      display: none;
    }
    .show-small {
      padding-left:0px;
    }
  }
</style>