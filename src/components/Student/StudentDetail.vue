<template>
    <div>
<h1>Student Details</h1>
    <table class="table table-striped hover" style="border:2px ;" >
            <tr>
                <td>StudentID</td>
                <td>Name</td>
                <td>Gender</td>
                <td>Phone</td>
                <td>Adress</td>
                <td>GradeID</td>
                <td></td>
            </tr>
            <tr  v-bind:key="studentDetail.ID">
                <td>{{studentDetail.id}}</td>
                <td>{{studentDetail.name}}</td>
                <td>{{studentDetail.gender}}</td>
                <td>{{studentDetail.phone}}</td>
                <td>{{studentDetail.address}}</td>
                <td>{{studentDetail.gradeID}}</td>
            </tr>
    </table> 

   <h1 v-if="role === 'Admin'">List Score Of This Student</h1>
   <h1 v-else>Student's Scores</h1>
   <table class="table table-striped hover" style="border:2px ;" >
    
            <tr>
                <td>ScoreID</td>
                <td>StudentID</td>
                <td>SubjectID</td>
                <td>InstructorID</td>
                <td>ScoreReality</td>
                <td>Year</td>
                <td>Semester</td>
                <td>DateExam</td>
            </tr>
            <tr v-for="item in studentDetail.scores" v-bind:key="item.id">
                <td>{{item.scoreID}}</td>
                <td>{{item.studentID}}</td>
                <td>{{item.subjectID}}</td>
                <td>{{item.instructorID}}</td>
                <td>{{item.scoreReality}}</td>
                <td>{{item.year}}</td>
                <td>{{item.semester}}</td>
                <td>{{item.dateExam}}</td>
                <td></td>
            </tr> 
           
    </table>  
    <button v-on:click="changeDisplayStudentList">Back</button>



</div>
</template>

<script>
import axios from 'axios';
    export default {
    name: 'StudentDetail',
    props:{studentID: String,
    // displayDepartmentList: Boolean
    },

  data () {
    return {
      studentDetail: {},
      role: null,
      userID: null,
    }
  },
   created() {
    this.role = localStorage.getItem('role');
    this.userID = localStorage.getItem('userID'); 
  },
  mounted () {
    axios
      .get('https://localhost:44319/api/Student/GetStudent/'+this.studentID, this.getTokenConfig())
      .then(response => (this.studentDetail = JSON.parse(JSON.stringify(response.data))));      
  },
  methods: {
     getTokenConfig(){
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            return config;
        },
    changeDisplayStudentList(){
        console.log('asdv')
        this.$emit('changeDisplayStudentList', 0);
    }
  }
  
}

</script>