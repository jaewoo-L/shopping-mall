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

          <div class="text-box" :class="{invalid: $v.kinds.$error}">
            <label for="kinds">kinds : </label>
            <select id="kinds" v-model="kinds" @blur="$v.kinds.$touch()">
              <option value="tops">tops</option>
              <option value="bottoms">bottoms</option>
              <option value="accs">accs</option>
            </select>
            <p v-if="$v.kinds.$error">종류를 선택 해주세요.</p>
          </div>

          <div v-if="kinds == 'tops' || kinds == 'bottoms'" class="text-box" :class="{invalid: $v.SItems.$error}">
            <label for="SItems">SItems : </label>
            <input
                  @blur="$v.SItems.$touch()" 
                      v-model.number="SItems" 
                      id="SItems"
                      name="SItems" 
                      placeholder="'S' 상품갯수">
            <p v-if="$v.SItems.$error">숫자를 입력해주세요.</p>
          </div>

          <div v-if="kinds == 'tops' || kinds == 'bottoms'" class="text-box" :class="{invalid: $v.MItems.$error}">
            <label for="MItems">MItems : </label>
            <input
                  @blur="$v.MItems.$touch()" 
                      v-model.number="MItems" 
                      id="MItems"
                      name="MItems" 
                      placeholder="'M' 상품갯수">
            <p v-if="$v.MItems.$error">숫자를 입력해주세요.</p>
          </div>

          <div v-if="kinds == 'tops' || kinds == 'bottoms'" class="text-box" :class="{invalid: $v.LItems.$error}">
            <label for="LItems">LItems : </label>
            <input
                  @blur="$v.LItems.$touch()" 
                      v-model.number="LItems" 
                      id="LItems"
                      name="LItems" 
                      placeholder="'L' 상품갯수">
            <p v-if="$v.LItems.$error">숫자를 입력해주세요.</p>
          </div>

          <div v-if="kinds == 'tops' || kinds == 'bottoms'" class="text-box" :class="{invalid: $v.XLItems.$error}">
            <label for="XLItems">XLItems : </label>
            <input
                  @blur="$v.XLItems.$touch()" 
                      v-model.number="XLItems" 
                      id="XLItems"
                      name="XLItems" 
                      placeholder="'XLI' 상품갯수">
            <p v-if="$v.XLItems.$error">숫자를 입력해주세요.</p>
          </div>

          <div v-if="kinds == 'accs'" class="text-box" :class="{invalid: $v.FreeItems.$error}">
            <label for="FreeItems">FreeItems : </label>
            <input
                  @blur="$v.FreeItems.$touch()" 
                      v-model.number="FreeItems" 
                      id="FreeItems"
                      name="FreeItems" 
                      placeholder="'Free' 상품갯수">
            <p v-if="$v.FreeItems.$error">숫자를 입력해주세요.</p>
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
      SItems: '',
      MItems: '',
      LItems: '',
      XLItems: '',
      FreeItems:'',
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
      formData.append('SItems',this.SItems);
      formData.append('MItems',this.MItems);
      formData.append('LItems',this.LItems);
      formData.append('XLItems',this.XLItems);
      formData.append('FreeItems',this.FreeItems);
      formData.append('avatar',this.avatar);
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
    SItems: {
      numeric
    },
    MItems: {
      numeric
    },
    LItems: {
      numeric
    },
    XLItems: {
      numeric
    },
    FreeItems: {
      numeric
    },
    avatar: {
      required
    }
  }
}
</script>

<style src="../../../public/stylesheets/products.css">
</style>
