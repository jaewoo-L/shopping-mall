<template>
   <div>
      <h1> 장바구니 내역 </h1>
      <hr>
      <div v-for="basketProduct in basketProducts" class="col-sm-4 col-md-3">
        <div class="row">
          <a :href="'/products/' + basketProduct._id">
            <div class="thumbnail" >
              <img v-bind:src="basketProduct.thumbnail">
              <div class="caption">
                <h4>{{basketProduct.brand}}</h4>
                <p>{{basketProduct.name}}</hp>
                <p>{{basketProduct.price}}￦</p>
              </div>
            </div>
          </a>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      basketProducts: []
    }
  },
  created() {
      this.$http.get('/api/login/'+ this.$store.getters.token + '/basket')
      .then((response) => {
          this.basketProducts = response.data.basket
      })
  }
}
</script>

