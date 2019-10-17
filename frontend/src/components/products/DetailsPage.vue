<template>
  <div>
    <h1>Details page</h1>
    <button v-if="isAdmin" @click="editProduct">수정</button>
    <button v-if="isAdmin" @click="deleteProduct">삭제</button>
    <hr>
    <p>{{product.name}}</p>
    <img v-bind:src="product.detailed_image">
   
    <p>{{product.price}}￦</p>
    <button :disabled="!token" @click="likeProduct" :class="{likeBtn: istrue}">like({{likes.length}})</button>
    <button :disabled="!token" @click="basketProduct">장바구니 담기</button>
    <button :disabled="!token" >구매하기</button>


    <button :disabled="!token" @click="createComment">후기 작성</button>
    <div v-for="comment in product.comments.slice().reverse()">
      <p>{{comment.author.nickname}}</p>
      <p>{{comment.text}}</p>
              
        <button v-if="comment.author.id == token" @click="editComment(comment)">수정</button>
        <button v-if="comment.author.id == token" @click="deleteComment(comment)">삭제</button>
    </div>
  </div>
</template>

<script>
export default {
	data: function () {
	    return {
	      product: {},
	      likes: [],
        basket: [],
	      istrue: null,
	    }
	},
	computed: {
    	isAdmin() {
          console.log('isAmin 변경');
          console.log(this.$store.getters.isAdmin);
      		return this.$store.getters.isAdmin;
    	},
    	token() {
    		return this.$store.getters.token;
    	}
  },
  	methods: {
  		editProduct() {
        this.$router.push('/products/' + this.$route.params.id + '/edit');
  		},
  		deleteProduct() {
        this.$http.delete('/api/products/' + this.$route.params.id)
        .then((response) => {
          if(response.data.result == 'success') {
            alert('삭제 성공했습니다.');
            this.$router.push('/products');
          } else if(response.data.result == 'fail') {
            alert('삭제 실패했습니다.')
          }
        })
        .catch(error => {
          alert(error)
        })
  		},
  		likeProduct() {
  			this.$http.post('/api/products/' + this.$route.params.id + '/like', {userid: this.$store.getters.token})
  			.then((response) => {
  				this.likes = response.data;
  				//let token = this.token;
  				this.istrue = !this.istrue;
  				console.log(this.likes);
  				//console.log(token);
  			})
  		},
      basketProduct() {
        this.$http.post('/api/login/' + this.$route.params.id + '/basket', {userid: this.$store.getters.token})
        .then((response) => {
          for(var i in response.data){
            if(response.data[i] == this.$route.params.id) {
              alert("장바구니에 추가합니다.");
              return;
            }
          }
          alert("장바구니에서 삭제합니다.");
          
        })
      },
      createComment() {
        this.$router.push('/products/' + this.$route.params.id + '/comments/new');
      },
      editComment(comment) {
        this.$router.push('/products/' + this.$route.params.id + '/comments/' + comment._id +'/edit')
      },

      deleteComment(comment) {
        let id = this.$route.params.id;
        this.$http.delete('/api/products/'+ this.$route.params.id + '/comments/' + comment._id)
        .then((response) => {
          if(response.data.result == 'success') {
            alert('삭제 성공했습니다.');
            this.$router.push('/products');
          } else if(response.data.result == 'fail') {
            alert('삭제 실패했습니다.')
          }
        })
        .catch(error => {
          alert(error)
        })
      }
  	},
  	created() {
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
  		})
  	}
}
</script>

<style>
	.likeBtn {
		background: blue;
		color: white;
	}
</style>