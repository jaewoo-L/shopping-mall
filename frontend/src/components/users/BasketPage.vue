<template>
   <div class="container" id="products">
        <h5> 찜목록 ({{products.length}}) </h5>
        <hr>

        <div v-for="(product,idx) in nowProducts" :key="idx" class="col-sm-4 col-md-3 product" >
          <div class="thumbnail basketPage" >
            <a :href="'/products/' + product._id" v-bind:style="{ 'background-image': 'url(' + product.thumbnail + ')' }">
                <img v-bind:src="product.thumbnail" alt="찜 목록 상품">
                <div class="overlay">
                  <div class="caption">
                    <p>{{product.name}}</p>
                    <p>{{product.brand}}</p>
                    <p>{{product.price}}￦</p>
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
      products: []
    }
  },
  computed:{
    nowProducts() {
      return this.products;
    }
  },
  created() {
      this.$http.get('/api/login/'+ this.$store.getters.token + '/basket')
      .then((response) => {
          this.products = response.data.basket
      })
  }
}
</script>

<style src="../../../public/stylesheets/products.css">
</style>
