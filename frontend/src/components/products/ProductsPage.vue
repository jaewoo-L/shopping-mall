
<template>
  <div>
    <h1>Show Page</h1>
    <p>{{test.title}}</p>
    <p>{{test.description}}</p>
    
  </div>
</template>

<script>
export default {
  created: function () {
    //var id = this.$route.params.id
   // this.$http.get(`/api/movies/${id}`)
   // .then((response) => {
  //    this.movie = response.data
   // })
      this.$http.get(`/exercise`)
      .then((response) => {
        this.test = response.data
      })

  },
  data: function () {
    return {
      movie: {},
      test: {}
    }
  }
}
</script>