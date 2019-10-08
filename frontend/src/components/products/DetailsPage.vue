<template>
  <div>
    <p>Details page</p>
    <button v-if="isAdmin" @click="editProduct">수정</button>
    <button v-if="isAdmin" @click="deleteProduct">삭제</button>
    <hr>
    <p>{{product.name}}</p>
    <img v-bind:src="product.detailed_image">
    <p>{{product.price}}￦</p>
    <button :disabled="!token" @click="likeProduct" :class="{likeBtn: istrue}">like({{likes.length}})</button>
  </div>
</template>

<script>
export default {
	data: function () {
	    return {
	      product: {},
	      likes: [],
	      istrue: null
	    }
	},
	computed: {
    	isAdmin() {
      		return this.$store.getters.isAdmin;
    	},
    	token() {
    		return this.$store.getters.token;
    	}
  	},
  	methods: {
  		editProduct() {

  		},
  		deleteProduct() {

  		},
  		likeProduct() {
  			this.$http.post('/api/products/' + this.$route.params.id + '/like', {userid: this.$store.getters.token})
  			.then((response) => {
  				this.likes = response.data;
  				let token = this.token;
  				this.istrue = !this.istrue;
  				console.log(this.likes);
  				console.log(token);
  				
  				//for(var i in this.likes) {
		        //  if(this.likes[i] == token) {
		        //    this.istrue = true;
		        //  } else {
		        //  	this.istrue = false;
		        //  }
		       // }
  			})
  		}
  	},
  	created() {
  		this.isAdmin = this.$store.state.isAdmin;
  		this.$http.get('/api/products/'+ this.$route.params.id)
  		.then((response) => {
  			this.product = response.data;
  			this.likes = response.data.likes;
  			console.log(response.data);
  			for(var i in response.data.likes) {
  				if(response.data.likes[i]._id == this.$store.getters.token) {
  					this.istrue = true;
  				}
  				else {
  					this.istrue = false;
  				}
  				
  			}
  		});
  		
  	}
}
</script>

<style>
	.likeBtn {
		background: blue;
		color: white;
	}
</style>