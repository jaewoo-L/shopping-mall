<template>
   <div class="container">
        <h5> All Products ({{products.length}}) </h5>
        <form @submit.prevent="searchProduct" class="navbar-form navbar-right" role="search" style="margin-top: -35px">
          <div class="form-group">
          <input v-model="search" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
        </form>
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
        
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      products: [],
      search:'',
      noMatch:null
    }
  },
  computed: {
    isAdmin(){
      console.log(this.$store.getters.isAdmin)
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    createProduct: function() {
      this.$router.push('/products/new');
    },
    searchProduct: function() {
      this.noMatch = null;
      console.log(this.search);
      this.$http.get('/api/products?search=' + this.search)
      .then((response) => {
          console.log(response.data);
          if(response.data.noMatch) {
            this.noMatch = response.data.noMatch;
          } else {
            this.products = response.data;
          }
      })
    }
  },
  created() {
      this.$http.get('/api/products')
      .then((response) => {
          this.products = response.data
      })
  }
}
</script>

<style>
  .container .product {
    position: relative;
  }

  .thumbnail {
    width: 100%;
    position: relative;
    border: none;
    margin: 5%;
  }

  .thumbnail .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        width: 100%;
        height: 0;
        background: rgba(0, 0, 0, 0.6);
        transition: .5s ease;
        border-radius: 3px 3px 0 0;
  }

  .thumbnail .overlay .caption {
        font-size: 15px;
        color: white;
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
  }

  .thumbnail:hover .overlay {
        display: block;
        height: 100%;
    }
</style>



