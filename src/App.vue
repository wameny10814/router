<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    
    <div class="">
      <!-- <HelloWorld msg="TITLE" /> -->

      <div class="nav">
        <div>
          <RouterLink to="/">Home</RouterLink>
        </div>
        <div>
          <RouterLink to="/about">About</RouterLink>
        </div>
        <div>
          <RouterLink :to="{name:'產品列表'}">產品列表</RouterLink>
        </div>
      </div>
 
    </div>
  </div>

  <RouterView />
</template>

<style scoped>
.nav{
    display: flex;
}

.nav div{
  margin-right:1rem;

}


</style>
