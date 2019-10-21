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
      <button class="size" @click="salesBar(S)">S</button>
      <button class="size" @click="salesBar(M)">M</button>
      <button class="size" @click="salesBar(L)">L</button>
      <button class="size" @click="salesBar(XL)">XL</button>

      <p class="sale" v-if="STrue">S구매 수량 : {{mySItemsNum}}  
      <button @click="upItemsNum(S)" class="num">Up</button>
      <button @click="downItemsNum(S)" class="num">Down</button></p>

      <p class="sale" v-if="MTrue">M구매 수량 : {{myMItemsNum}}  
      <button @click="upItemsNum(M)" class="num">Up</button>
      <button @click="downItemsNum(M)" class="num">Down</button></p>

      <p class="sale" v-if="LTrue">L구매 수량 : {{myLItemsNum}}  
      <button @click="upItemsNum(L)" class="num">Up</button>
      <button @click="downItemsNum(L)" class="num">Down</button></p>

      <p class="sale" v-if="XLTrue">XL구매 수량 : {{myXLItemsNum}}  
      <button @click="upItemsNum(XL)" class="num">Up</button>
      <button @click="downItemsNum(XL)" class="num">Down</button></p>

      <button :disabled="!token" @click="likeProduct" class="like" :class="{likeBtn: istrue}">like({{likes.length}})</button>
      <button :disabled="!token" @click="basketProduct" class="basket">장바구니 담기</button>
      <button :disabled="!isDisabled" @click="buy" class="buy">구매하기</button>
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
        S:'s', M:'m', L:'l', XL:'xl',
        mySItemsNum: 0, myMItemsNum: 0, myLItemsNum: 0, myXLItemsNum: 0,
        STrue: false, MTrue: false, LTrue: false, XLTrue: false,
        //itemsNum 는 type:number 
        SItemsNum:null, MItemsNum:null, LItemsNum:null, XLItemsNum:null

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
    	},
      beforeBuy() {
        let select = this.mySItemsNum != 0 || this.myMItemsNum != 0 || this.myLItemsNum != 0 || this.myXLItemsNum != 0 ? true : false; 
        return select;
      },
      isDisabled() {
        return this.token && this.beforeBuy;
      }
  },
  	methods: {
  		editProduct() {
        this.$router.push('/products/' + this.$route.params.id + '/edit');
  		},
  		deleteProduct() {
        if(confirm('정말 삭제하시겠습니까?') == true) {
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
        }
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
      buy() {
        this.SItemsNum -= this.mySItemsNum;
        this.MItemsNum -= this.myMItemsNum;
        this.LItemsNum -= this.myLItemsNum;
        this.XLItemsNum -= this.myXLItemsNum;

        this.$http.post('/api/login/' + this.$route.params.id + '/orders', {userid: this.$store.getters.token})
        .then((response) => {

          this.$http.put('/api/products/' + this.$route.params.id + '/buy', {
            SItemsNum: this.SItemsNum, MItemsNum: this.MItemsNum, LItemsNum: this.LItemsNum, XLItemsNum: this.XLItemsNum
          })
          .then((response) => {
            if(response.data.result == 'fail') {
              alert('구매 실패.');
            } else {
              console.log(response.data);
              alert('구매 완료.')
              this.$router.push('/'+ this.$store.getters.token +'/orders');
            }
          })
          .catch(error => {
              alert(error)
          })  
          
          
        });

        
      },
      upItemsNum(size) {
      if(size == 's') {
        if(this.SItemsNum > this.mySItemsNum) {
          this.mySItemsNum++;
        } else {
          alert('최대 수량을 초과하였습니다.')
        }
      }
      if(size == 'm') {
        if(this.MItemsNum > this.myMItemsNum) {
          this.myMItemsNum++;
        } else {
          alert('최대 수량을 초과하였습니다.')
        }
      }
      if(size == 'l') {
        if(this.LItemsNum > this.myLItemsNum) {
          this.myLItemsNum++;
        } else {
          alert('최대 수량을 초과하였습니다.')
        }
      }
      if(size == 'xl') {
        if(this.XLItemsNum > this.myXLItemsNum) {
          this.myXLItemsNum++;
        } else {
          alert('최대 수량을 초과하였습니다.')
        }
      }
      
    },
    downItemsNum(size) {
      if(size == 's') {
        if(this.mySItemsNum > 1) {
          this.mySItemsNum--;
        } else {
          alert('최소 수량입니다.')
        }
      }
      if(size == 'm') {
        if(this.myMItemsNum > 1) {
          this.myMItemsNum--;
        } else {
          alert('최소 수량입니다.')
        }
      }
      if(size == 'l') {
        if(this.myLItemsNum > 1) {
          this.myLItemsNum--;
        } else {
          alert('최소 수량입니다.')
        }
      }
      if(size == 'xl') {
        if(this.myXLItemsNum > 1) {
          this.myXLItemsNum--;
        } else {
          alert('최소 수량입니다.')
        }
      }
      
    },
    salesBar(size) {
      if(size == 's') {
        this.STrue = !this.STrue;
        if(this.STrue == false) {
          this.mySItemsNum = 0;
        }
      }
      if(size == 'm') {
        this.MTrue = !this.MTrue;
        if(this.MTrue == false) {
          this.myMItemsNum = 0;
        }
      }
      if(size == 'l') {
        this.LTrue = !this.LTrue;
        if(this.LTrue == false) {
          this.myLItemsNum = 0;
        }
      }
      if(size == 'xl') {
        this.XLTrue = !this.XLTrue;
        if(this.XLTrue == false) {
          this.myXLItemsNum = 0;
        }
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
        this.SItemsNum = response.data.SItems;
        this.MItemsNum = response.data.MItems;
        this.LItemsNum = response.data.LItems;
        this.XLItemsNum = response.data.XLItems;
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