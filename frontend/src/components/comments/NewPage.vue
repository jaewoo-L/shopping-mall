<template>
  <div id="comments">
    <div class="container">
      <h1>Add a New Comment</h1>
      <div class="comment-box">

        <textarea v-model="comment" placeholder="후기작성"></textarea>
        <br>
        <button :disabled="!token" @click="createComment" class="btn">Add</button>
      
        <a :href="'/products/' + product._id">Go Back</a> 
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      product: {},
      comment: ''
    }
  },
  computed: {
    token() {
    	return this.$store.getters.token;
    }
  },
  methods: {
  	createComment() {
  		this.$http.post('/api/products/' + this.$route.params.id + '/comments', {
  			comment: this.comment, 
  			nickname: this.$store.getters.nickname,
  			id: this.$store.getters.token
  		})
  		.then((response) => {
  			alert(response.data.result);
  			this.$router.push('/products/' + this.$route.params.id);
  		})
  	}
  },
  created() {
      this.$http.get('/api/products/' + this.$route.params.id + '/comments/new')
      .then((response) => {
        this.product = response.data
      })
    }
}
</script>

<style scoped>
  .container {
    width:40%;
    margin: 25px auto;
  }
  .container h1 {
    font-size: 40px;
    border-bottom: 6px solid #050c30;
    margin-bottom: 30px;
    padding: 10px 0;
    text-align:center; 
    margin-top:20px;
  }

  textarea {
    width: 100%;
    height: 100px;
  }

  .btn {
    width: 100%;
    background: none;
    border: 2px solid #050c30;
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
    margin: 10px 0;
  }
  .btn:disabled {
    cursor: not-allowed;
    border: 2px solid #b3b5b4;
  }
</style>