<template>
  <div id="editComments">
    <div class="container">
      <h1>Edit Comment</h1>
      <div class="comment-box">
        <textarea v-model="comment.text"></textarea>
        <br>
        <button :disabled="!token" @click="editComment" class="btn">Edit</button>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
	data: function () {
	    return {
	      comment: {}
	    }
	},
	computed: {
	    token() {
	    	return this.$store.getters.token;
	  	}
	},
	methods: {
	    editComment: function() {
	      this.$http.put('/api/products/'+ this.$route.params.id + '/comments/' + this.$route.params.comments_id, {
	      	comment: this.comment
	      })
	      .then((response) => {
	        if(response.data.result) {
	          alert('수정 실패');
	        } else {
	          alert('수정 성공');
	          this.$router.push('/products/' + this.$route.params.id);
	        }
	      })
	      .catch(error => {
	          alert(error)
	        })
	    }
	},
  	created() {
    	this.$http.get('/api/products/'+ this.$route.params.id + '/comments/' + this.$route.params.comments_id + '/edit')
      	.then((response) => {
        	this.comment = response.data;
      	});
  	}
}
</script>

<style src="../../../public/stylesheets/comments.css">
  
</style>