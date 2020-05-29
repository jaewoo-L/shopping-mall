<template>
   <div class="container" id="products">
        <h5> Bottoms Products ({{bottomsProducts.productsNum}}) </h5>
        <button class="btn btn-default" v-if="isAdmin" @click="createProduct">등록</button>
        <hr>

        <div v-for="product in bottomsProducts.product" class="col-sm-4 col-md-3 product" >
          <div class="thumbnail" >
            <a :href="'/products/' + product._id" v-bind:style="{ 'background-image': 'url(' + product.thumbnail + ')' }">
                <img v-bind:src="product.thumbnail" alt="bottoms products">
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

        <div class="paging" aria-label="Page navigation">
          <ul v-if="bottomsProducts.pages && bottomsProducts.pages > 0" class="pagination justify-content-center">
            <div class="page-box">
              <li v-if="bottomsProducts.current == 1" class="page-item"><a class="page-link disabled">«</a></li>
              <li v-else><a class="page-link" @click="mipageProduct" >«</a></li>
            </div>
            <div v-for="i in pager" class="page-box">
              <li v-if="i == bottomsProducts.current"><a class="page-link active">{{i}}</a></li>
              <li v-else><a class="page-link"  @click="numpageProduct(i)"> {{i}} </a></li>
            </div>
            <div class="page-box">
              <li v-if="bottomsProducts.current == bottomsProducts.pages" class="page-item disabled"><a class="page-link disabled">»</a></li>
              <li v-else><a class="page-link" @click="pluspageProduct" style="cursor:pointer">»</a></li>
            </div>
          </ul>
        </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAdmin(){
      return this.$store.getters.isAdmin;
    },
    bottomsProducts() {
      return this.$store.getters.list;
    },
    pager() {
      return this.$store.getters.pager;
    }
  },
  methods: {
    createProduct: function() {
      this.$router.push('/products/new');
    },
    mipageProduct: function() {
      this.$store.dispatch('mipageProduct',{key:'products/bottoms'})
    },
    numpageProduct: function(i) {
      this.$store.dispatch('numpageProduct',{key:'products/bottoms', page:i})
    },
    pluspageProduct: function() {
      this.$store.dispatch('pluspageProduct',{key:'products/bottoms'})
    }
  },
  created() {
      this.$store.dispatch('pullList',{key:'products/bottoms'})
  }
}
</script>

<style src="../../../public/stylesheets/products.css">
</style>
