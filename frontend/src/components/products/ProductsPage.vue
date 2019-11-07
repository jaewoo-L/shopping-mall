<template>
   <div class="container" id="products">
        <h5> All Products ({{productsNum}}) </h5>
        <div class="searchbox">
          <input v-model="search" class="searchbar " placeholder="제품명검색">
          <button type="submit" class="btn btn-default" @click="searchProduct"><i class="fas fa-search"></i></button>
        </div>

        <button class="btn btn-default" v-if="isAdmin" @click="createProduct">등록</button>
        <hr>  
      
        <p v-if="noMatch">{{noMatch}}</p>
        <div v-if="!noMatch" v-for="product in products" class="col-sm-4 col-md-3 product" >
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
      search:'',
      noMatch:null,
      list: [],
      productsNum:null,
      current: null,
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
    searchProduct: function() {
      if(!this.search){
        this.$http.get('/api/products?page=' + 1)
        .then((response) => {
              this.products = response.data.products;
              this.current = response.data.current;
              this.pages = response.data.pages;
              this.page = response.data.page;
              this.productsNum = response.data.productsNum;
              this.$store.dispatch('searchDelete')
              localStorage.setItem("productsPage", 1);
              this.$router.push('/products?page=' + 1);  
        })
      } 
      else {
          this.$http.get('/api/products?page=' + 1 + '&search=' + this.search)
          .then((response) => {
              if(response.data.noMatch) {
                this.noMatch = response.data.noMatch;
              } 
              else {
                this.products = response.data.products;
                this.current = response.data.current;
                this.pages = response.data.pages;
                this.page = response.data.page;
                this.productsNum = response.data.productsNum;
                localStorage.setItem("productsPage", 1);
                localStorage.setItem("searchProducts", this.search);
                this.$router.push('/products?page=' + 1 +'&search=' + this.search);
              }
          })
      } 
    },

    mipageProduct: function() {
      if(!this.search) {
        this.$http.get('/api/products?page=' + (Number(this.current) - 1))
        .then((response) => {
            this.products = response.data.products;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            this.productsNum = response.data.productsNum;
            localStorage.setItem("productsPage", this.current);
            this.$router.push('/products?page=' + (Number(this.current)));
        })
      } else {
        this.$http.get('/api/products?page=' + (Number(this.current) - 1) + '&search=' + this.search)
        .then((response) => {
            this.products = response.data.products;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            this.productsNum = response.data.productsNum;
            localStorage.setItem("productsPage", this.current);
            this.$router.push('/products?page=' + (Number(this.current)) + '&search=' + this.search);
        })
      }
    },
    numpageProduct: function(i) {
      if(!this.search){
        this.$http.get('/api/products?page=' + i)
        .then((response) => {
            this.products = response.data.products;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            this.productsNum = response.data.productsNum;
            localStorage.setItem("productsPage", this.current);
            this.$router.push('/products?page=' + (Number(this.current)));
        })
      } else{
        this.$http.get('/api/products?page=' + i + '&search=' + this.search)
        .then((response) => {
            this.products = response.data.products;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            this.productsNum = response.data.productsNum;
            localStorage.setItem("productsPage", this.current);
            this.$router.push('/products?page=' + (Number(this.current)) + '&search=' + this.search);
        })
      }
    },
    pluspageProduct: function() {
      if(!this.search){
        this.$http.get('/api/products?page=' + (Number(this.current) + 1))
        .then((response) => {
            this.products = response.data.products;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            this.productsNum = response.data.productsNum;
            localStorage.setItem("productsPage", this.current);
            this.$router.push('/products?page=' + (Number(this.current)));
        })
      } else {
        this.$http.get('/api/products?page=' + (Number(this.current) + 1) + '&search=' + this.search)
        .then((response) => {
            this.products = response.data.products;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            this.productsNum = response.data.productsNum;
            localStorage.setItem("productsPage", this.current);
            this.$router.push('/products?page=' + (Number(this.current)) + '&search=' + this.search);
        })
      }
      
    }
  },
  created() {
      this.search = this.$store.getters.searchProducts;
      this.current = this.$store.getters.productsPage;
      if(!this.search) {
        this.$http.get('/api/products?page=' + (Number(this.current)))
        .then((response) => {
            this.products = response.data.products;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            this.productsNum = response.data.productsNum;
        })
      } else {
        this.$http.get('/api/products?page=' + (Number(this.current)) + '&search=' + this.search)
        .then((response) => {
            this.products = response.data.products;
            this.current = response.data.current;
            this.pages = response.data.pages;
            this.page = response.data.page;
            this.productsNum = response.data.productsNum;
        })
      }
  }
}
</script>

<style src="../../../public/stylesheets/products.css">
</style>




