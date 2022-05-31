<template>
    <div>
<h1>Department List</h1>
    <table class="table table-striped hover" style="border:2px ;" >
            <!-- <h1>Grade Details</h1> -->
            <tr>
                <td>ID</td>
                <td>Grade Name</td>
                <td>DepartmentID</td>
                <td></td>
            </tr>
            <tr v-bind:key="gradeDetails.id">
                <td>{{gradeDetails.id}}</td>
                <td>{{gradeDetails.name}}</td>
                <td>{{gradeDetails.departmentID}}</td>
                <td></td>

            </tr>
    </table> 

  <h1>List Student Of This Grade</h1>
   <table class="table table-striped hover" style="border:2px ;" >
    
            <tr>
                <td>StudentID</td>
                <td>Name</td>
                <td>Gender</td>
                <td>Phone</td>
                <td>Address</td>
                <td></td>
            </tr>
            <tr v-for="item in gradeDetails.students" v-bind:key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.gender}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.address}}</td>
                <td></td>
            </tr> 
           
    </table>  
    <button v-on:click="changeDisplayGradeList">Back</button>



</div>
</template>

<script>
import axios from 'axios';
    export default {
    name: 'GradeDetail',
    props:{gradeID: String,
    // displayDepartmentList: Boolean
    },

  data () {
    return {
      listDepartment: [],
      gradeDetails: {},
      departmentID: null,
    }
  },
  mounted () {
    axios
      .get('https://localhost:44319/api/Grade/GetGrade/'+this.gradeID, this.getTokenConfig())
      .then(response => (this.gradeDetails = JSON.parse(JSON.stringify(response.data))));      
  },
  methods: {
    getTokenConfig(){
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            return config;
        },
    changeDisplayGradeList(){
        console.log('asdv')
        this.$emit('changeDisplayGradeList', 0);
    }
  }
  
}

</script>