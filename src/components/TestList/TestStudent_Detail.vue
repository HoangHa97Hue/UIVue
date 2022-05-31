<template>
  
    <StudentList></StudentList>
 
</template>

<script>
import StudentList from '@/components/Student/StudentList.vue'


export default {
  name: 'TestStudent_Detail',
  components: {
    StudentList,

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