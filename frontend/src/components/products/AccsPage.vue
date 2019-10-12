<template>
   <div class="container">
        <h5> Accs Products ({{products.length}}) </h5>
        <button class="btn btn-default" v-if="isAdmin" @click="createProduct">등록</button>
        <hr>  
     
        <div v-for="product in products" class="col-sm-4 col-md-3 product" >
          <div class="thumbnail" >
            <a :href="'/products/' + product._id" v-bind:style="{ 'background-image': 'url(' + product.thumbnail + ')' }"> 
                <img v-bind:src="product.thumbnail" alt="">
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
      this.$http.get('/api/products/accs')
      .then((response) => {
          this.products = response.data
      })
  }
}
</script>