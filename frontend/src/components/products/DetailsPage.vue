<template>
  <div class="container" id="detail">
    <div class="header">
      <h1>Details page</h1>
      <button v-if="isAdmin" @click="editProduct" class="btn btn-default">수정</button>
      <button v-if="isAdmin" @click="deleteProduct" class="btn btn-default" style="margin-left:5px">삭제</button>
      <hr>
    </div>
    <div class="contents">
      <img v-bind:src="product.detailed_image">
      <hr>

      <button :disabled="!token" @click="createComment" class="btn btn-default">후기 작성</button>
      <div class="comments">
        <div class="container">
          <div v-for="comment in product.comments.slice().reverse()">
            <strong>{{comment.author.nickname}}</strong>
            <p>{{comment.text}}</p>
                    
              <button v-if="comment.author.id == token" @click="editComment(comment)" class="btn btn-default">수정</button>
              <button v-if="comment.author.id == token" @click="deleteComment(comment)" class="btn btn-default">삭제</button>
          </div>
        </div>
      </div>
    </div>

    <div class="sales">
      <strong class="name">{{product.name}}</strong>
      <p class="price">KRW {{product.price}}</p>
      <button class="size">S</button><button class="size">M</button><button class="size">L</button><button class="size">XL</button>
      <p class="sale">구매 수량 : {{myitemsNum}}  <button @click="upItemsNum" class="num">Up</button>
      <button @click="downItemsNum" class="num">Down</button></p>
      <button :disabled="!token" @click="likeProduct" class="like" :class="{likeBtn: istrue}">like({{likes.length}})</button>
      <button :disabled="!token" @click="basketProduct" class="basket">장바구니 담기</button>
      <button :disabled="!token" class="buy">구매하기</button>
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
        myitemsNum: 1,
        itemsNum:null
        //items 는 number인거 잊지말자
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
      },
      upItemsNum() {
      if(this.itemsNum > this.myitemsNum) {
        this.myitemsNum++;
        console.log(this.myitemsNum)
      } else {
        alert('최대 수량을 초과하였습니다.')
      }
    },
    downItemsNum() {
      if(this.myitemsNum > 1) {
        this.myitemsNum--;
      } else {
        alert('최소 수량입니다.')
      }
    }
  	},
    mounted() {
      $(function(){
        $(window).scroll(function(){  //스크롤하면 아래 코드 실행
               var num = $(this).scrollTop();  // 스크롤값
               if( num > 250 ){  // 스크롤을 36이상 했을 때
                  $(".sales").css("position","fixed");
                  $(".sales").css("top","10px");
               }else{
                   $(".sales").css("position","");
               }
          });
        });
    },
  	created() {
  		this.$http.get('/api/products/'+ this.$route.params.id)
  		.then((response) => {
  			this.product = response.data;
  			this.likes = response.data.likes;
        this.itemsNum = response.data.items;
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
  .header {
    width:100%;
  }

  .contents {
    height:100%; 
    width:70%;
    float:left;
  }
  .sales {
    position:;
    right: 30px;
    height:100%; 
    width:30%;
    float:left;
    padding-left:35px;
    line-height: 20px;
  }
  .sales .sale {
    border: 1px solid #c4bebe;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
  .sales .name {
    font-size:20px;
  }
  .sales .price {
    font-size: 15px;
    margin-top: 10px;
  }
  .sales .size {
    background:none;
    border:none;
    padding-bottom:10px;
    font-size:15px;
  }
  .sales .num {
    background:none;
    border:none;
  }
  .like, .basket, .buy {
    width: 100%;
    background: none;
    border: 1px solid #050c30;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    margin: 10px 0;
    transition: all 0.3s ease;
  }

   .basket:hover, .buy:hover {
    background: #050c30;
    color: white;
  }

  .likeBtn {
    background: #050c30;
    color: white;
  }

  .comments {
    border: 1px solid #c4bebe;
    margin-top:10px;
    margin-bottom:20px;
    padding-top:10px;
    padding-bottom:10px;
  }
</style>