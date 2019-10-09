<template>
   <div id="newProduct">
    <div class="newProduct-box">
        <h1> 제품수정 </h1>
    	<form @submit.prevent="editProduct">
	        <div class="text-box">
	          <label for="productName">Name : </label>
	          <input
	                    v-model="product.name" 
	                    id="productName" 
	                    name="name"
	                    required/>
	        </div>

	        <div class="text-box">
	          <label for="price">Price : </label>
	          <input 
	                          id="price"
	                          name="price" 
	                          v-model="product.price" 
	                          maxlength="8"
	                          required>                    
	        </div>                

	        <div class="text-box">
	          <label for="thumbnail">thumbnail : </label>
	          <input 
	                              id="thumbnail"
	                              name="thumbnail"   
	                              v-model="product.thumbnail"
	                              required>
	          
	        </div>

	        <div class="text-box">
	          <label for="detailed_image">detailed_image : </label>
	          <input 
	                
	                    v-model="product.detailed_image" 
	                    id="detailed_image"
	                    name="detailed_image"
	                    required>
	        
	        </div>

	        <div class="text-box">
	          <label for="kinds">kinds : </label>
	          <input 
	               
	                    v-model="product.kinds" 
	                    id="kinds"
	                    name="kinds"
	                    required>
	         
	        </div>

	        <div class="text-box">
	          <label for="brand">brand : </label>
	          <input 
	                
	                    v-model="product.brand" 
	                    id="brand"
	                    name="brand"
	                    required>
	          
	        </div>

	        <div class="text-box">
	          <label for="items">items : </label>
	          <input
	               
	                    v-model.number="product.items" 
	                    id="items"
	                    name="items"
	                    required>
	          
	        </div>

	        <div class="text-box">
	          <label for="avatar">avatar : </label>
	          <input      
	                    v-model="product.avatar" 
	                    id="avatar"
	                    name="avatar"
	                    required>  
	        </div>
	        <button type="submit">수정</button>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      product: {}
    }
  },

  methods: {
    editProduct: function() {
    	this.$http.put('/api/products/' + this.$route.params.id, {product: this.product})
    	.then((response) => {
    		if(response.data.result) {
    			alert('수정 실패');
    		} else {
    			console.log(response.data);
    			this.$router.push('/products/' + this.$route.params.id);
    		}
    	})
    	.catch(error => {
          alert(error)
        })
    }
  },

  created() {
  	this.$http.get('/api/products/'+ this.$route.params.id + '/edit')
  		.then((response) => {
  			this.product = response.data;
  			console.log(response.data);
  			console.log(this.product);
  		});
  }
}
</script>

<style>
  .text-box.invalid label {
      color: red;
    }

  .text-box.invalid input {
    background-color: #ffc9aa;
    }

    .text-box.invalid p {
      color:red;
      margin: 0;
      margin-top:5px;
      font-size: 8px;
    }
</style>