<script setup>
  import Header from './components/Header.vue';
  import Contenu from './components/Contenu.vue';
</script>

<template>
  <div id="page">
    <Header></Header>
    <Contenu></Contenu>
  </div>
</template>

<style scoped>
#page{
  background-image: url('frigo.webp');
  background-size: cover;
}
</style>