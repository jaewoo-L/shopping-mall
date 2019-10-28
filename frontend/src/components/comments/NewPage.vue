<template>
  <div id="newComments">
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

<style src="../../../public/stylesheets/comments.css">
</style>