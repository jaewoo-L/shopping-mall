<template>
   <div class="container" id="products">
        <h5> Accs Products ({{productnumber}}) </h5>
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
      productnumber:null,
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
      for(var i= (Number(this.current) > 5 ? Number(this.current) - 4 : 1); i <= (Number(this.current) + 4) && i <= this.pages; i++) this.list.push(i);
      console.log(this.list);
      return this.list;
        
    }
  },
  methods: {
    createProduct: function() {
      this.$router.push('/products/new');
    },

    mipageProduct: function() {
      this.$http.get('/api/products/accs?page=' + (Number(this.current) - 1))
      .then((response) => {
          this.products = response.data.products;
          this.current = response.data.current;
          this.pages = response.data.pages;
          this.page = response.data.page;
          this.productnumber = response.data.productnumber;
      })
    },
    numpageProduct: function(i) {
      this.$http.get('/api/products/accs?page=' + i)
      .then((response) => {
          this.products = response.data.products;
          this.current = response.data.current;
          this.pages = response.data.pages;
          this.page = response.data.page;
          this.productnumber = response.data.productnumber;
      })
    },
    pluspageProduct: function() {
      this.$http.get('/api/products/accs?page=' + (Number(this.current) + 1))
      .then((response) => {
          this.products = response.data.products;
          this.current = response.data.current;
          this.pages = response.data.pages;
          this.page = response.data.page;
          this.productnumber = response.data.productnumber;
      })
    }
  },
  created() {
      this.isAdmin = this.$store.state.isAdmin;
      this.$http.get('/api/products/accs')
      .then((response) => {
          this.products = response.data.products;
          this.current = response.data.current;
          this.pages = response.data.pages;
          this.page = response.data.page;
          this.productnumber = response.data.productnumber;
      })
  }
}
</script>

<style>
  #products {
    position: relative;
  }

  
  #products .product {
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

  .paging {
    position: absolute; 
    bottom: 0;
    width:100%;
    text-align:center;
    padding-top:40px;
    height:40px;
  }

  ul{
    text-align:left;
    list-style:none;
  }

  .page-box {
    float: left;
  }
  .pagination>.page-box>li>.active{
      background-color: #efeaea;
  }
  .pagination>.page-box>li>a {
      position: relative;
      //float: left;
      padding: 6px 12px;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #337ab7;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #ddd;
      cursor: pointer;
      display:inline;
  }
  .pagination>.page-box>li>.disabled {
      cursor: not-allowed;
  }
</style>