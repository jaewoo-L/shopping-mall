<template>
   <div class="container" id="products">
        <h5> All Products ({{allProducts.productsNum}}) </h5>
        <div class="searchbox">
          <input v-model="search" class="searchbar" @keyup.enter="searchProduct" placeholder="제품명검색">
          <button type="submit" class="btn btn-default" @click="searchProduct"><i class="fas fa-search"></i></button>
        </div>

        <button class="btn btn-default" v-if="isAdmin" @click="createProduct">등록</button>
        <hr>

        <p v-if="allProducts.noMatch">{{allProducts.noMatch}}</p>
        <div v-if="!allProducts.noMatch" v-for="product in allProducts.product" class="col-sm-4 col-md-3 product" >
          <div class="thumbnail" >
            <a :href="'/products/' + product._id" v-bind:style="{ 'background-image': 'url(' + product.thumbnail + ')' }">
                <img v-bind:src="product.thumbnail" alt="products">
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
          <ul v-if="allProducts.pages && allProducts.pages > 0" class="pagination justify-content-center">
            <div class="page-box">
              <li v-if="allProducts.current == 1" class="page-item"><a class="page-link disabled">«</a></li>
              <li v-else><a class="page-link" @click="mipageProduct" >«</a></li>
            </div>
            <div v-for="i in pager" class="page-box">
              <li v-if="i == allProducts.current"><a class="page-link active">{{i}}</a></li>
              <li v-else><a class="page-link"  @click="numpageProduct(i)"> {{i}} </a></li>
            </div>
            <div class="page-box">
              <li v-if="allProducts.current == allProducts.pages" class="page-item disabled"><a class="page-link disabled">»</a></li>
              <li v-else><a class="page-link" @click="pluspageProduct" style="cursor:pointer">»</a></li>
            </div>
          </ul>
        </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      search:''
    }
  },
  computed: {
    isAdmin(){
      return this.$store.getters.isAdmin;
    },
    allProducts() {
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
    searchProduct: function() {
      if(!this.search){
        this.$store.dispatch('searchDelete');
        this.$store.dispatch('searchProduct',{key:'products'})
      }
      else {
        this.$store.dispatch('searchProduct',{key:'products',search:this.search})
      }
    },

    mipageProduct: function() {
      if(!this.search) {
        this.$store.dispatch('mipageProduct',{key:'products'})
      } else {
        this.$store.dispatch('mipageProduct',{key:'products',search:this.search})
      }
    },
    numpageProduct: function(i) {
      if(!this.search){
        this.$store.dispatch('numpageProduct',{key:'products', page:i})
      } else{
        this.$store.dispatch('numpageProduct',{key:'products', page:i,search:this.search})
      }
    },
    pluspageProduct: function() {
      if(!this.search){
        this.$store.dispatch('pluspageProduct',{key:'products'})
      } else {
        this.$store.dispatch('pluspageProduct',{key:'products',search:this.search})
      }
    }
  },
  created() {
      this.search = this.$store.getters.searchProducts;
      if(!this.search) {
        this.$store.dispatch('pullList',{key:'products'})
      } else {
        this.$store.dispatch('pullList',{key:'products',search:this.search})
      }
  }
}
</script>

<style src="../../../public/stylesheets/products.css">
</style>
