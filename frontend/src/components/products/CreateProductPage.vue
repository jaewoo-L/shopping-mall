<template>
   <div id="newProduct">
    <div class="newProduct-box">
        <h1> 제품등록 </h1>
        <form @submit.prevent="createProduct" enctype="multipart/form-data">
          <div class="text-box" :class="{invalid: $v.name.$error}">
            <label for="productName">Name : </label>
            <input
                      @blur="$v.name.$touch()" 
                      v-model="name" 
                      id="productName" 
                      name="name"
                      placeholder="이름">
            <p v-if="$v.name.$error">작성해 주세요.</p>
          </div>

          <div class="text-box" :class="{invalid: $v.price.$error}">
            <label for="price">Price : </label>
            <input 
                            id="price"
                            name="price" 
                            @blur="$v.price.$touch()" 
                            v-model="price" 
                            maxlength="8"
                            placeholder="가격"> 
            <p v-if="$v.price.$error">작성해 주세요.</p>                    
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

          <div class="text-box" :class="{invalid: $v.kinds.$error}">
            <label for="kinds">kinds : </label>
            <input 
                  @blur="$v.kinds.$touch()"
                      v-model="kinds" 
                      id="kinds"
                      name="kinds" 
                      placeholder="ex)tops, bottoms, accs">
            <p v-if="$v.kinds.$error">종류를 작성 해주세요.</p>
          </div>

          <div class="text-box" :class="{invalid: $v.brand.$error}">
            <label for="brand">brand : </label>
            <input 
                  @blur="$v.brand.$touch()"
                      v-model="brand" 
                      id="brand"
                      name="brand" 
                      placeholder="브랜드">
            <p v-if="$v.brand.$error"> 브랜드 등록을 해주세요.</p>
          </div>

          <div class="text-box" :class="{invalid: $v.items.$error}">
            <label for="items">items : </label>
            <input
                  @blur="$v.items.$touch()" 
                      v-model.number="items" 
                      id="items"
                      name="items" 
                      placeholder="상품갯수">
            <p v-if="$v.items.$error">상품갯수 등록을 해주세요.</p>
          </div>

          <div class="text-box" :class="{invalid: $v.avatar.$error}">
            <label for="avatar">avatar : </label>
            <input 
                  @blur="$v.avatar.$touch()"
                      v-model="avatar" 
                      id="avatar"
                      name="avatar" 
                      placeholder="성별">
            <p v-if="$v.avatar.$error">성별 등록을 해주세요.</p>
          </div>

          <div class="submit">
            <button class="btn" v-if="isAdmin" type="submit" :disabled="$v.$invalid">등록</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
import {required, numeric} from 'vuelidate/lib/validators'

export default {
  data: function () {
    return {
      name: '',
      price: '',
      kinds: '',
      brand: '',
      items: '',
      avatar: '',
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
    async createProduct() {
      let formData = new FormData();
      formData.append('name',this.name);
      formData.append('price',this.price);
      formData.append('thumbnail', this.thumbnail);
      formData.append('detail', this.detail);
      formData.append('kinds',this.kinds);
      formData.append('brand',this.brand);
      formData.append('items',this.items);
      formData.append('avatar',this.avatar);
      console.log('formData 형성');
      for(let key of formData.entries()) {
        console.log(key[0]);
        console.log(key[1]);
      };
        await this.$http.post('/api/products', formData)
            .then((response) => {
              if(response.data) {
                alert('제품 등록 완료');
              } else {
                alert('제품 등록 오류');
              }
              this.$router.push('/products');
            })
            .catch(function (error) {
                  console.log(error);
             })
      }
    },

  validations: {
    name: {
      required
    },
    price: {
      required
    },
    kinds: {
      required
    },
    brand: {
      required
    },
    items: {
      required,
      numeric
    },
    avatar: {
      required
    }
  }
}
</script>

<style scoped>
  #newProduct {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;  
  }

  .newProduct-box {
    position: absolute;
    width:360px;
    top: 50%;
    left:50%;
    transform: translate(-50%, -45%);
    padding-bottom: 70px;
  }

  .newProduct-box h1 {
    float: left;
    font-size: 40px;
    border-bottom: 6px solid #050c30;
    margin-bottom: 30px;
    padding: 10px 0;
  }

  .text-box input {  
    font-size: 17px;
  }
</style>
