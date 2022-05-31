<template>
    <GradeList></GradeList>
</template>

<script>
import GradeList from '@/components/Grade/GradeList.vue'


export default {
  name: 'TestGrade_Detail',
  components: {
    GradeList,

}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>