<template>
    <div>
      <h1>Department Details</h1>
    <table class="table table-striped hover" style="border:2px ;" >
            
            <tr>
                <td>ID</td>
                <td>DeName</td>
                <td>Description</td>
                <td></td>
            </tr>
            <tr v-bind:key="departmentDetails.id">
                <td>{{departmentDetails.id}}</td>
                <td>{{departmentDetails.name}}</td>
                <td>{{departmentDetails.description}}</td>
                <td></td>
            </tr>
    </table> 

  <h1>List Grades Of This Department</h1>
   <table class="table table-striped hover" style="border:2px ;" >
    
            <tr>
                <td>GradeID</td>
                <td>Name</td>
                <td></td>
            </tr>
            <tr v-for="item in departmentDetails.grades" v-bind:key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td></td>
            </tr> 
           
    </table>  
    <button v-on:click="changeDisplayDeList">Back</button>


</div>
</template>

<script>
import axios from 'axios';
    export default {
    name: 'DepartmentDetail',
    props:{departID: String,
    // displayDepartmentList: Boolean
    },

  data () {
    return {
      listDepartment: [],
      departmentDetails: {},
      departmentID: null,
      displayDepartmentList: undefined
    }
  },
  created() {// neu nhu ko de async thi sao
    this.getDepartmentDetail(); // neu nhu ko de await thi sao
    console.log(this.departID);
    console.log(this.departmentDetails)
  },
  // mounted () {
  //   axios
  //     .get('https://localhost:44319/api/Department/GetDepartment/'+this.departID)
  //     .then(response => (this.departmentDetails = JSON.parse(JSON.stringify(response.data))));      
  // },
  methods: {
    changeDisplayDeList(){
       console.log('asdv')
        this.$emit('changeDisplayDepartList', 0);
    },
     getTokenConfig(){
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            return config;
        },
      async getDepartmentDetail(){
          await axios
           .get('https://localhost:44319/api/Department/GetDepartment/'+this.departID,this.getTokenConfig())
          .then(response => (this.departmentDetails = JSON.parse(JSON.stringify(response.data))));
      }
  }
  
}

</script>