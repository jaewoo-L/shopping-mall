<template>
   <div id="purchaseState" class="container">
      <h5>PurchaseState</h5>
      <hr>
      <div class="purchaseProducts">
        <div v-for="purchase in purchaseState">
          <div class="purchasebox">
            <img v-bind:src="purchase.thumbnail" alt="">
            <div class="text">
              <p>제품명: {{purchase.productName}}</p>
              <p>주문자: {{purchase.username}}</p>
              <p>주소: {{purchase.roadAddress}}({{purchase.postcode}})</p>
              <p>- {{purchase.detailAddress}}</p>
              <p><span v-if="purchase.SItems > 0">S: {{purchase.SItems}}</span>
                <span v-if="purchase.MItems > 0">M: {{purchase.MItems}}</span>
                <span v-if="purchase.LItems > 0">L: {{purchase.LItems}}</span>
                <span v-if="purchase.XLItems > 0">XL: {{purchase.XLItems}}</span>
                <span v-if="purchase.FreeItems > 0">Free: {{purchase.FreeItems}}</span></p>
              <p>금액: {{purchase.purchasePrice}}</p>
              <button @click="deleteProduct(purchase._id)" class="btn btn-default">삭제</button>
            </div>
            <hr>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      purchaseState:[]
    }
  },
  methods: {
    deleteProduct(purchaseStateId) {
      var RandVal = Math.floor(Math.random()*(1000-1+1)) + 1;
      if(confirm('정말 삭제하시겠습니까?(배송을 완료하였습니까?)') == true) {
        this.$http.delete('/api/login/' + this.$route.params.id +'/purchaseState/' + purchaseStateId)
        .then((response) => {
          if(response.data.result == 'fail') {
            alert('다시 시도해주십시오.');
          } else if(response.data.result == 'success') {
            alert('삭제 성공했습니다.');
            this.$router.push({name:'purchaseState',query:{num:RandVal}});
          }
        })
      }
    }
  },
  created() {
      this.$http.get('/api/login/' + this.$route.params.id +'/purchaseState/')
      .then((response) => {
        if(response.data.result == 'fail') {
          alert('관리자가 아닙니다.')
          this.$router.push('/');
        } else {
          this.purchaseState = response.data;
        }
      })
  }
}
</script>

<style src="../../../public/stylesheets/user.css">

</style>
