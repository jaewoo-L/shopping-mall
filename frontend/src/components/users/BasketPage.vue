<template>
   <div class="container">
        <h5> 장바구니 ({{products.length}}) </h5>
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
  created() {
      this.$http.get('/api/login/'+ this.$store.getters.token + '/basket')
      .then((response) => {
          this.products = response.data.basket
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
