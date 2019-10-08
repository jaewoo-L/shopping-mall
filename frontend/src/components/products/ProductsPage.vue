<template>
   <div>
      <h1> all products </h1>
      <button v-if="isAdmin" @click="createProduct">등록</button>
      <hr>
      <div v-for="product in products" class="col-sm-4 col-md-3">
        <div class="row">
          <a :href="'/products/' + product._id">
            <div class="thumbnail" >
              <img v-bind:src="product.thumbnail">
              <div class="caption">
                <h4>{{product.brand}}</h4>
                <p>{{product.name}}</hp>
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
  computed: {
    isAdmin(){
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    createProduct: function() {
      this.$router.push('/products/new');
    }
  },
  created() {
      this.isAdmin = this.$store.state.isAdmin;
      this.$http.get('/api/products')
      .then((response) => {
          this.products = response.data
      })
  }
}
</script>

