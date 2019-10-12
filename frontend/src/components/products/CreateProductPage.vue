<template>
   <div id="newProduct">
    <div class="newProduct-box">
        <h1> 제품등록 </h1>
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

        <div class="text-box" :class="{invalid: $v.thumbnail.$error}">
          <label for="thumbnail">thumbnail : </label>
          <input 
                              id="thumbnail"
                              name="thumbnail"   
                              @blur="$v.thumbnail.$touch()" 
                              v-model="thumbnail" 
                              placeholder="썸네일">
          <p v-if="$v.thumbnail.$error">썸네일 등록을 해주세요.</p>
        </div>

        <div class="text-box" :class="{invalid: $v.detailed_image.$error}">
          <label for="detailed_image">detailed_image : </label>
          <input 
                @blur="$v.detailed_image.$touch()"
                    v-model="detailed_image" 
                    id="detailed_image"
                    name="detailed_image" 
                    placeholder="상세 이미지">
          <p v-if="$v.detailed_image.$error">이미지 등록을 해주세요.</p>
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
          <button class="btn" @click="createProduct" :disabled="$v.$invalid">등록</button>
        </div>
    </div>
  </div>
</template>

<script>
import {required, numeric} from 'vuelidate/lib/validators'

export default {
  data: function () {
    return {
      isAdmin: false,
      name: '',
      price: '',
      thumbnail: '',
      detailed_image: '',
      kinds: '',
      brand: '',
      items: '',
      avatar: ''
    }
  },

  methods: {
    createProduct: function() {
      this.$http.post('/api/products', {
        name: this.name,
        price: this.price,
        thumbnail: this.thumbnail,
        detailed_image: this.detailed_image,
        kinds: this.kinds,
        brand: this.brand,
        items: this.items,
        avatar: this.avatar
      })
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
    thumbnail: {
      required
    },
    detailed_image: {
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
