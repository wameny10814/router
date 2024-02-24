<template>
  <div class="about">
    <h1>關於我們</h1>
    <!-- <p>{{data}}</p> -->
  </div>
</template>

<style>

</style>
<script>
export default {
  data(){
    return{
      data:[]
    }
  },
  mounted(){
     console.log(import.meta.env.VITE_PATH);
     let api  = import.meta.env.VITE_PATH;
      this.$http.get(api)
      .then((response) => {
        console.log(response.data);
        this.data= response.data.results[0]
      })
  }
}
</script>
