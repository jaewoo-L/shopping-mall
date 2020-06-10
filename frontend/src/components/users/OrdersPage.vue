<template>
   <div class="container" id="products">
        <h5> 구매품목 ({{orderArray.length}})</h5>
        <hr>
        <button type="button" name="button" @click="lookUp(1,'months')">1개월</button>
        <button type="button" name="button" @click="lookUp(3,'months')">3개월</button>
        <button type="button" name="button" @click="lookUp(6,'months')">6개월</button>
        <select name="year" @change="selectLookUp($event)">
    	    <option value="">년도선택</option>
    	    <option v-for="year in yearArr" :value="year">{{year}}</option>
    	   </select>
        <div v-for="order in orderArr" class="col-sm-4 col-md-3 product" >
          <div class="thumbnail" >
            <a :href="'/products/' + order.product._id" v-bind:style="{ 'background-image': 'url(' + order.product.thumbnail + ')' }">
                <img v-bind:src="order.product.thumbnail" alt="구매 품목">
                <div class="overlay">
                  <div class="caption">
                    <p>{{order.product.name}}</p>
                    <p>{{order.product.brand}}</p>
                    <p>{{order.product.price}}￦</p>
                  </div>
                </div>
            </a>
          </div>
          <p>{{order.date}}</p>
          <p>배송:{{order.delivery}}</p>
          <p>주문번호:{{order.orderCode}}</p>
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
