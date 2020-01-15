<template>
   <div class="container" id="products">
        <h5> Bottoms Products ({{productsNum}}) </h5>
        <button class="btn btn-default" v-if="isAdmin" @click="createProduct">등록</button>
        <hr>  
     
        <div v-for="product in products" class="col-sm-4 col-md-3 product" >
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
          <ul v-if="pages && pages > 0" class="pagination justify-content-center">
            <div class="page-box">
              <li v-if="current == 1" class="page-item"><a class="page-link disabled">«</a></li>
              <li v-else><a class="page-link" @click="mipageProduct" >«</a></li>
            </div>
            <div v-for="i in changelist" class="page-box">
              <li v-if="i == current"><a class="page-link active">{{i}}</a></li>
              <li v-else><a class="page-link"  @click="numpageProduct(i)"> {{i}} </a></li>
            </div>
            <div class="page-box">
              <li v-if="current == pages" class="page-item disabled"><a class="page-link disabled">»</a></li>
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
      products: [],
      list: [],
      productsNum:null,
      current:null,
      pages:null,
      page:null
    }
  },
  computed: {
    isAdmin(){
      return this.$store.getters.isAdmin;
    },
    changelist() {
      while (this.list.length) {
        this.list.pop();
      } 
      if(Number(this.current) < 6) {
        for(var i= (Number(this.current) % 6 == 0 ? Number(this.current) : Number(this.current) - Number(this.current) % 6 + 1 ), j= i;   i <= (j + 4) && i <= this.pages; i++) this.list.push(i);
        return this.list;  
      } else {
        for(var i= (Number(this.current) % 6 == 0 ? Number(this.current) : Number(this.current) - Number(this.current) % 6), j= i; i <= (j + 5) && i <= this.pages; i++) this.list.push(i);
        return this.list; 
      }
    }
  },
  methods: {
    createProduct: function() {
      this.$router.push('/products/new');
    },

    mipageProduct: function() {
      this.$http.get('/api/products/bottoms?page=' + (Number(this.current) - 1))
      .then((response) => {
          this.products = response.data.products;
          this.current = response.data.current;
          this.pages = response.data.pages;
          this.page = response.data.page;
          this.productsNum = response.data.productsNum;
          localStorage.setItem("bottomsPage", this.current);
          this.$store.state.bottomsPage = this.current;
          this.$router.push('/products/bottoms?page=' + (Number(this.current)));
      })
    },
    numpageProduct: function(i) {
      this.$http.get('/api/products/bottoms?page=' + i)
      .then((response) => {
          this.products = response.data.products;
          this.current = response.data.current;
          this.pages = response.data.pages;
          this.page = response.data.page;
          this.productsNum = response.data.productsNum;
          localStorage.setItem("bottomsPage", this.current);
          this.$store.state.bottomsPage = this.current;
          this.$router.push('/products/bottoms?page=' + (Number(this.current)));
      })
    },
    pluspageProduct: function() {
      this.$http.get('/api/products/bottoms?page=' + (Number(this.current) + 1))
      .then((response) => {
          this.products = response.data.products;
          this.current = response.data.current;
          this.pages = response.data.pages;
          this.page = response.data.page;
          this.productsNum = response.data.productsNum;
          localStorage.setItem("bottomsPage", this.current);
          this.$store.state.bottomsPage = this.current;
          this.$router.push('/products/bottoms?page=' + (Number(this.current)));
      })
    }
  },
  created() {
      this.current = this.$store.getters.bottomsPage;
      this.$http.get('/api/products/bottoms?page=' + (Number(this.current)))
      .then((response) => {
          this.products = response.data.products;
          this.current = response.data.current;
          this.pages = response.data.pages;
          this.page = response.data.page;
          this.productsNum = response.data.productsNum;
      })
  }
}
</script>

<style src="../../../public/stylesheets/products.css">
</style>