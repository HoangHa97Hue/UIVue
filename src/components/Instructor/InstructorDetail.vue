<template>
    <div class="container">
       <div class="text-warning" style="width: 100%;text-align: center;"></div>
      <br />
<h1>Instructor Details</h1>
    <table class="table table-striped hover" style="border:2px ;" >
            <tr>
                <td>InstructorID</td>
                <td>Name</td>
                <td>DateOfBirth</td>
                <td></td>
            </tr>
            <tr v-bind:key="instructorDetails.id">
                <td>{{instructorDetails.id}}</td>
                <td>{{instructorDetails.name}}</td>
                <td>{{instructorDetails.dateOfBirth}}</td>
                <td></td>

            </tr>
    </table> 
    <button v-on:click="changeDisplayInstructorList">Back</button>



</div>
</template>

<script>
import axios from 'axios';
    export default {
    name: 'InstructorDetail',
    props:{instructorID: String,
    // displayDepartmentList: Boolean
    },

  data () {
    return {
      // insID: null,
      instructorDetails: {}
    }
  },
  mounted () {
    axios
      .get('https://localhost:44319/api/Instructor/GetInstructor/'+this.instructorID, this.getTokenConfig())
      .then(response => (this.instructorDetails = JSON.parse(JSON.stringify(response.data))));      
  },
  methods: {
    getTokenConfig(){
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            return config;
        },
    changeDisplayInstructorList(){
        console.log('asdv')
        this.$emit('changeDisplayInstructorList', 0);
    }
  }
  
}

</script>