<template>
   <div id="purchaseState" class="container">
      <h5>주문현황</h5>
      <hr>
      <div class="lookUp">
        <button type="button" name="button" @click="lookUp(1,'months')">1개월</button>
        <button type="button" name="button" @click="lookUp(3,'months')">3개월</button>
        <button type="button" name="button" @click="lookUp(6,'months')">6개월</button>
        <select name="year" @change="selectLookUp($event)">
    	    <option value="">년도선택</option>
          <option v-for="year in yearArr" :value="year">{{year}}</option>
    	  </select>
      </div>
      <div class="purchaseProducts">
        <div class="table-top">
          <div class="list w190">주문일/구매번호</div>
          <div class="list w430">주문정보</div>
          <div class="list w150">상태</div>
        </div>
        <div v-for="(purchase,idx) in nowpurchaseState" :key="idx" class="table-list product">
          <div class="list w190 txt-cn">
            <p>{{purchase.purchaseDate}}</p>
            <p>({{purchase.purchaseCode}})</p>
          </div>
          <div class="list w430 rel">
            <img v-bind:src="purchase.thumbnail" class="size" alt="소비자 구매 품목">
            <div class="caption">
              <p class="brand">{{purchase.username}}</p>
              <p class="brand">{{purchase.productName}}, <span v-if="purchase.SItems > 0">S: {{purchase.SItems}}</span>
                <span v-if="purchase.MItems > 0">M: {{purchase.MItems}}</span>
                <span v-if="purchase.LItems > 0">L: {{purchase.LItems}}</span>
                <span v-if="purchase.XLItems > 0">XL: {{purchase.XLItems}}</span>
                <span v-if="purchase.FreeItems > 0">Free: {{purchase.FreeItems}}</span></p>
              <p class="name">{{purchase.roadAddress}}({{purchase.postcode}})</p>
              <p class="name">{{purchase.detailAddress}}</p>
              <p class="price">{{purchase.purchasePrice}}￦</p>
            </div>
          </div>
          <div class="list w150 txt-cn">
              <button type="button" name="button" class="btn btn-default w-50" @click="delivery(purchase.purchaseCode,purchase.delivery)" :disabled="purchase.delivery == '배송 완료'">{{purchase.delivery}}</button><br><br>
              <button @click="deleteProduct(purchase._id,idx)" :disabled="purchase.delivery != '배송 완료'" class="btn btn-danger w-50">삭제</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      purchaseState:[],
      yearArr:[2020,2019,2018]
    }
  },
  computed: {
    nowpurchaseState() {
      return this.purchaseState;
    }
  },
  methods: {
    delivery(code,state){
      let idx = this.purchaseState.findIndex(i=>i.purchaseCode==code);
      let text;
      if(this.purchaseState[idx].delivery=="배송 준비중") {
        text="배송을 시작 하시겠습니까?"
      }
      if(this.purchaseState[idx].delivery=="배송중") {
        text="배송을 완료 하시겠습니까?"
      }
      if(confirm(text) == true) {
        this.$http.post('/api/login/'+ this.$store.getters.token + '/purchaseState/delivery', {purchaseCode:code, state:state})
        .then((response)=> {
          this.purchaseState[idx].delivery = response.data;
        })
      }
    },
    selectLookUp(event) {
      this.$http.post('/api/login/'+ this.$store.getters.token + '/purchaseState/lookUp',{year:event.target.value, type:'years'})
      .then((response)=> {
        this.purchaseState = response.data;
      })
    },
    lookUp(num,type) {
      this.$http.post('/api/login/'+ this.$store.getters.token + '/purchaseState/lookUp',{num:num, type:type})
      .then((response)=> {
        this.purchaseState = response.data;
      })
    },
    deleteProduct(purchaseStateId,idx) {
      if(confirm('정말 삭제하시겠습니까?(배송을 완료하였습니까?)') == true) {
        this.$http.delete('/api/login/' + this.$route.params.id +'/purchaseState/' + purchaseStateId)
        .then((response) => {
          if(response.data.result == 'fail') {
            alert('다시 시도해주십시오.');
          } else if(response.data.result == 'success') {
            alert('삭제 성공했습니다.');
            this.purchaseState.splice(idx,1);
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
