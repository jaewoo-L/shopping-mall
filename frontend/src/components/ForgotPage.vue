<template>
  <div>
  	<h1>Forgot Password</h1>
  	<div>
  		<label for="username">Your Email</label>
  		<input
                @input="$v.username.$touch()" 
                v-model="username" 
                id="username"
                name="username" 
                placeholder="abc@gmail.com">
        <button @click="sendMail">메일 보내기</button>        
  	</div>
  </div>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
export default {
	data() {
		return {
			username: ''
		}
	},
   	validations: {
	   	username: {
	        required: required,
	        email: email
	    }
    },
    methods: {
    	sendMail: function() {
    		this.$http.post('/api/login/forgot', {username: this.username})
    		.then((response) => {
    			alert(response.data.result);
    		})
    	}
    }
}
</script>