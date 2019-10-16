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
    	this.$http.get('/api/products/'+ this.$route.params.id + '/comments/' + this.$route.params.comments_id + '/edit')
      	.then((response) => {
        	this.comment = response.data;
        	console.log(response.data);
        	console.log(this.comment);
      	});
  	}
}
</script>

<style scoped>
  #editComments .container {
    width:40%;
    margin: 25px auto;
  }
  #editComments .container h1 {
    font-size: 40px;
    border-bottom: 6px solid #050c30;
    margin-bottom: 30px;
    padding: 10px 0;
    text-align:center; 
    margin-top:20px;
  }

  .comment-box textarea {
    width: 100%;
    height: 100px;
  }

  .comment-box .btn {
    width: 100%;
    background: none;
    border: 2px solid #050c30;
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
    margin: 10px 0;
  }

  .comment-box .btn:disabled {
    cursor: not-allowed;
    border: 2px solid #b3b5b4;
  }
</style>