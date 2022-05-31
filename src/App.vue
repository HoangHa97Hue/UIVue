<template>
  <div id="app" class="mt-0 "><!--d-flex flex-column xem lai-->
    <HeaderNavbar style="height: 10% !important"></HeaderNavbar>
    
    <div  class="flex 1" style="overflow: hidden"> <!--id="app"-->
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <router-view />
    </div>
  </div>
</template>
<script>
import HeaderNavbar from "./components/LayoutComponent/HeaderNavbar.vue";
export default {
  name: 'App',
  components: {
    HeaderNavbar
  }
}

</script>


