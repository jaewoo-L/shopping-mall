<template>
   <div id="editProduct">
    <div class="editProduct-box">
        <h1> 제품수정 </h1>
      <form @submit.prevent="editProduct" enctype="multipart/form-data">
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
                      type="file"
                      ref="thumbnail"
                      @change="onSelectThumbnail"
                      id="thumbnail"
                      name="thumbnail"    
                      placeholder="썸네일"
                      required>
          </div>

          <div class="text-box">
            <label for="detailed_image">detailed_image : </label>
            <input 
                      type="file"
                      ref="detail"
                      @change="onSelectDetail"
                      id="detailed_image"
                      name="detailed_image" 
                      placeholder="상세 이미지"
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
            <label for="SItems">SItems : </label>
            <input
                 
                      v-model.number="product.SItems" 
                      id="SItems"
                      name="SItems"
                      required>
            
          </div>

          <div class="text-box">
            <label for="MItems">MItems : </label>
            <input
                 
                      v-model.number="product.MItems" 
                      id="MItems"
                      name="MItems"
                      required>
            
          </div>

          <div class="text-box">
            <label for="LItems">LItems : </label>
            <input
                 
                      v-model.number="product.LItems" 
                      id="LItems"
                      name="LItems"
                      required>
            
          </div>

          <div class="text-box">
            <label for="XLItems">XLItems : </label>
            <input
                 
                      v-model.number="product.XLItems" 
                      id="XLItems"
                      name="XLItems"
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
          <div class="submit">
            <button class="btn" v-if="isAdmin" type="submit">수정</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      product: {},
      detail: '',
      thumbnail:''
    }
  },

  computed: {
    isAdmin(){
      console.log(this.$store.getters.isAdmin)
      return this.$store.getters.isAdmin;
    }
  },

  methods: {
    onSelectThumbnail() {
      this.thumbnail = this.$refs.thumbnail.files[0];
      console.log(this.thumbnail);
    },
    onSelectDetail() {
      this.detail = this.$refs.detail.files[0];
      console.log(this.detail);
      
    },

    async editProduct() {
      let formData = new FormData();
      formData.append('name',this.product.name);
      formData.append('price',this.product.price);
      formData.append('thumbnail', this.thumbnail);
      formData.append('detail', this.detail);
      formData.append('kinds',this.product.kinds);
      formData.append('brand',this.product.brand);
      formData.append('SItems',this.product.SItems);
      formData.append('MItems',this.product.MItems);
      formData.append('LItems',this.product.LItems);
      formData.append('XLItems',this.product.XLItems);
      formData.append('avatar',this.product.avatar);

      await this.$http.put('/api/products/' + this.$route.params.id, formData)
      .then((response) => {
        if(response.data.result == 'fail') {
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

<style src="../../../public/stylesheets/products.css">
</style>