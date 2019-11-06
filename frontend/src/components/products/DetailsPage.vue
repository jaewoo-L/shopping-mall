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
        
          <div v-for="comment in product.comments">
            <strong>{{comment.author.nickname}}</strong>
            <p>{{comment.text}}</p>
                    
              <button v-if="comment.author.id == token" @click="editComment(comment)" class="btn btn-default">수정</button>
              <button v-if="comment.author.id == token || isAdmin" @click="deleteComment(comment)" class="btn btn-default">삭제</button>
          </div>
      </div>
    </div>

    <div class="sales">
      <strong class="name">{{product.name}}</strong>
      <p class="price">KRW {{product.price}}</p>
      <button v-if="SItemsNum > 0" class="size" @click="salesBar(S)">S</button>
      <button v-if="MItemsNum > 0" class="size" @click="salesBar(M)">M</button>
      <button v-if="LItemsNum > 0" class="size" @click="salesBar(L)">L</button>
      <button v-if="XLItemsNum > 0" class="size" @click="salesBar(XL)">XL</button>
      <button v-if="FreeItemsNum > 0" class="size" @click="salesBar(Free)">Free</button>
      

      <p class="sale" v-if="SSaleTrue">S구매 수량 : {{mySItemsNum}}  
      <button @click="upItemsNum(S)" class="num">Up</button>
      <button @click="downItemsNum(S)" class="num">Down</button></p>

      <p class="sale" v-if="MSaleTrue">M구매 수량 : {{myMItemsNum}}  
      <button @click="upItemsNum(M)" class="num">Up</button>
      <button @click="downItemsNum(M)" class="num">Down</button></p>

      <p class="sale" v-if="LSaleTrue">L구매 수량 : {{myLItemsNum}}  
      <button @click="upItemsNum(L)" class="num">Up</button>
      <button @click="downItemsNum(L)" class="num">Down</button></p>

      <p class="sale" v-if="XLSaleTrue">XL구매 수량 : {{myXLItemsNum}}  
      <button @click="upItemsNum(XL)" class="num">Up</button>
      <button @click="downItemsNum(XL)" class="num">Down</button></p>

      <p class="sale" v-if="FreeSaleTrue">Free구매 수량 : {{myFreeItemsNum}}  
      <button @click="upItemsNum(Free)" class="num">Up</button>
      <button @click="downItemsNum(Free)" class="num">Down</button></p>

      <p v-if="priceSum !=0" class="sum">총 {{priceSum}}원</p>

      <button @click="likeProduct" class="like" :class="{likeBtn: likeTrue}">like({{likes.length}})</button>
      <button @click="basketProduct" class="basket" :class="{likeBtn: basketTrue}">찜하기</button>
      <button @click="buy" class="buy">구매하기</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
      return {
        product: {
          price:0
        },
        likes: [],
        basket: [],
        likeTrue: null,
        basketTrue: null,
        S:'s', M:'m', L:'l', XL:'xl', Free:'free',
        mySItemsNum: 0, myMItemsNum: 0, myLItemsNum: 0, myXLItemsNum: 0, myFreeItemsNum: 0,
        SSaleTrue: false, MSaleTrue: false, LSaleTrue: false, XLSaleTrue: false, FreeSaleTrue: false,
        //DB에 저장된 갯수 담을 변수
        SItemsNum:null, MItemsNum:null, LItemsNum:null, XLItemsNum:null, FreeItemsNum:null

      }
  },
  computed: {
      isAdmin() {
          return this.$store.getters.isAdmin;
      },
      token() {
        return this.$store.getters.token;
      },
      priceSum() {
        return (Number(this.product.price) * (this.mySItemsNum + this.myMItemsNum + this.myLItemsNum + this.myXLItemsNum + this.myFreeItemsNum)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      beforeBuy() {
        let select = this.mySItemsNum != 0 || this.myMItemsNum != 0 || this.myLItemsNum != 0 || this.myXLItemsNum != 0 || this.myFreeItemsNum != 0 ? true : false; 
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
        if(!this.token) {
          alert('로그인이 필요합니다.');
        } else {
          this.$http.post('/api/products/' + this.$route.params.id + '/like', {userid: this.$store.getters.token})
          .then((response) => {
            this.likes = response.data;
            this.likeTrue = !this.likeTrue;
          })
        }
      },
      basketProduct() {
        if(!this.token) {
          alert('로그인이 필요합니다.');
        } else {
          this.$http.post('/api/login/' + this.$route.params.id + '/basket', {userid: this.$store.getters.token})
          .then((response) => {
            for(var i in response.data){
              if(response.data[i] == this.$route.params.id) {
                alert("찜목록에 추가합니다.");
                this.basketTrue = true;
                return;
               }
            }
            alert("찜목록에서 삭제합니다.");
            this.basketTrue = false; 
          })
        }
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
        if(!this.token) {
          alert('로그인이 필요합니다.');
        } else {
          if(this.isDisabled == false) {
            alert('옵션을 먼저 선택해주세요.');
          } else {
            this.SItemsNum -= this.mySItemsNum;
            this.MItemsNum -= this.myMItemsNum;
            this.LItemsNum -= this.myLItemsNum;
            this.XLItemsNum -= this.myXLItemsNum;
            this.FreeItemsNum -= this.myFreeItemsNum;

            this.$http.post('/api/login/' + this.$route.params.id + '/orders', {userid: this.$store.getters.token})
            .then((response) => {

              this.$http.put('/api/products/' + this.$route.params.id + '/buy', {
                SItemsNum: this.SItemsNum, MItemsNum: this.MItemsNum, LItemsNum: this.LItemsNum, XLItemsNum: this.XLItemsNum, FreeItemsNum: this.FreeItemsNum
              })
              .then((response) => {
                if(response.data.result == 'fail') {
                  alert('구매 실패.');
                } else {
                  alert('구매 완료.');
                  this.$router.push('/'+ this.$store.getters.token +'/orders');
                }
              })
              .catch(error => {
                  alert(error);
              })  
            });
          } 
        }       
      },
      upItemsNum(size) {
      if(size == 's') {
        if(this.SItemsNum > this.mySItemsNum) {
          this.mySItemsNum++;
        } else {
          alert('최대 수량을 초과하였습니다.');
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
      if(size == 'free') {
        if(this.FreeItemsNum > this.myFreeItemsNum) {
          this.myFreeItemsNum++;
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
      if(size == 'free') {
        if(this.myFreeItemsNum > 1) {
          this.myFreeItemsNum--;
        } else {
          alert('최소 수량입니다.')
        }
      }
      
    },
    salesBar(size) {
      if(size == 's') {
        this.SSaleTrue = !this.SSaleTrue;
        if(this.SSaleTrue == false) {
          this.mySItemsNum = 0;
        }
      }
      if(size == 'm') {
        this.MSaleTrue = !this.MSaleTrue;
        if(this.MSaleTrue == false) {
          this.myMItemsNum = 0;
        }
      }
      if(size == 'l') {
        this.LSaleTrue = !this.LSaleTrue;
        if(this.LSaleTrue == false) {
          this.myLItemsNum = 0;
        }
      }
      if(size == 'xl') {
        this.XLSaleTrue = !this.XLSaleTrue;
        if(this.XLSaleTrue == false) {
          this.myXLItemsNum = 0;
        }
      }
      if(size == 'free') {
        this.FreeSaleTrue = !this.FreeSaleTrue;
        if(this.FreeSaleTrue == false) {
          this.myFreeItemsNum = 0;
        }
      }
    }
    }, 
    mounted() {
      $(function(){
        $(window).scroll(function(){ 
               var num = $(this).scrollTop();
               if( num > 180 ){
                  $(".sales").addClass("scrolladd");
               }else{
                   $(".sales").removeClass("scrolladd");
               }
          });
        });
    },
    created() {
      this.$http.get('/api/products/'+ this.$route.params.id)
      .then((response) => {
        this.product = response.data;
        this.product.price = this.product.price.replace(',','');
        this.likes = response.data.likes;
        console.log(this.likes);
        this.SItemsNum = response.data.SItems;
        this.MItemsNum = response.data.MItems;
        this.LItemsNum = response.data.LItems;
        this.XLItemsNum = response.data.XLItems;
        this.FreeItemsNum = response.data.FreeItems;
        for(var i in response.data.likes) {
          if(response.data.likes[i]._id == this.$store.getters.token) {
            this.likeTrue = true;
          }
        }
      }),

      this.$http.get('/api/login/' + this.$store.getters.token)
      .then((response) => {
        for(var i in response.data) {
          if(response.data[i] == this.$route.params.id) {
            this.basketTrue = true;
          }
        }      
      })
    }
}
</script>

<style src="../../../public/stylesheets/products.css">
</style>