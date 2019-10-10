<template>
	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<!-- <router-link to="/" tag="a"><img alt="Brand" src="/src/assets/brand.PNG"></router-link> -->
			</div>
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<li v-if="auth" class="navbar-text navbar-right"><router-link :to="{name: 'orders'}" tag="a" class="navbar-link">주문조회</router-link></li>
					<li v-if="auth" class="navbar-text navbar-right"><router-link :to="'/' + this.$store.getters.token + '/basket/'" tag="a" class="navbar-link">장바구니</router-link></li>
					<li v-if="!auth" class="navbar-text navbar-right"><router-link :to="{name: 'signUp'}" tag="a" class="navbar-link">회원가입</router-link></li>
					<li v-if="!auth" class="navbar-text navbar-right"><router-link :to="{name: 'login'}" tag="a" class="navbar-link">로그인</router-link></li>
					<li v-if="auth" class="navbar-text navbar-right"><router-link :to="{name: 'logout'}" tag="a" class="navbar-link">로그아웃</router-link></li>
					<li v-if="auth" class="navbar-text navbar-right"><router-link to="" tag="a" class="navbar-link">{{username}}</router-link></li>
			</div> 

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav mL">
					<router-link tag="li" :to="{name: 'products'}" active-class="active" exact><a>All Products</a></router-link>
					<router-link tag="li" :to="{name: 'tops'}" active-class="active"><a>Tops</a></router-link>
					<router-link tag="li" :to="{name: 'bottoms'}" active-class="active"><a>Bottoms</a></router-link>
					<router-link tag="li" :to="{name: 'accs'}" active-class="active"><a>Accs</a></router-link>
				</ul>
				<form class="navbar-form navbar-right" role="search">
					<div class="form-group">
					<input type="text" class="form-control" placeholder="Search">
					</div>
					<button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
				</form>
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
			username() {
				return this.$store.getters.username;
			}
		}
	}
</script>

<style scoped>
	li { list-style-type : none }
</style>