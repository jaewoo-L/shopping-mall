<template>
   <div class="container" id="products">
        <h5> 배송조회 ({{orderArray.length}})</h5>
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
        <div class="">
          <div class="table-top">
            <div class="list w190">주문일/구매번호</div>
            <div class="list w430">상품정보</div>
            <div class="list w150">상태</div>
          </div>
          <div v-for="order in orderArr" class="table-list product" >
            <div class="list w190 txt-cn">
              <p>{{order.date}}</p>
              <p>({{order.orderCode}})</p>
            </div>
            <div class="list w430 rel" >
              <a :href="'/products/' + order.product._id" v-bind:style="{ 'background-image': 'url(' + order.product.thumbnail + ')' }">
                  <img v-bind:src="order.product.thumbnail" alt="구매 품목" class="size">
              </a>
                <div class="caption">
                  <a :href="'/products/' + order.product._id" v-bind:style="{ 'background-image': 'url(' + order.product.thumbnail + ')' }">
                    <p class="brand">{{order.product.brand}}</p>
                    <p class="name">{{order.product.name}}</p>
                    <p class="price">{{order.product.price}}￦</p>
                  </a>
                </div>
            </div>
            <div class="list w150 txt-cn">
              <p>{{order.delivery}}</p>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      orderArray: [],
      yearArr:[2020,2019,2018]
    }
  },
  computed: {
    orderArr() {
      return this.orderArray;
    }
  },
  methods:{
    selectLookUp(event) {
      this.$http.post('/api/login/'+ this.$store.getters.token + '/orders/lookUp',{year:event.target.value, type:'years'})
      .then((response)=> {
        this.orderArray = response.data;
      })
    },
    lookUp(num,type) {
      this.$http.post('/api/login/'+ this.$store.getters.token + '/orders/lookUp',{num:num, type:type})
      .then((response)=> {
        this.orderArray = response.data;
      })
    }
  },
  created() {
      this.$http.get('/api/login/'+ this.$store.getters.token + '/orders')
      .then((response) => {
          this.orderArray = response.data.orders
      })
  }
}
</script>

<style src="../../../public/stylesheets/products.css">
</style>
