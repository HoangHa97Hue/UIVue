<template>
  <div>
    <div v-if="selectDisplayStudent === 0">
      <div class="text-warning" style="width: 100%;text-align: center;"></div>
      <br />
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-12">
            <h1 v-if="role === 'Admin'">Student List</h1>
            <h1 v-else>Private Information</h1>
            <div v-if="role === 'Admin'" class="text-warning" style="width: 100%;text-align: center;">Delete Student
              will delete all Scores for
              that
              Student</div>
          </div>

          <div class="col-5" v-if="role === 'Admin'">
            <form class="d-flex" @submit.prevent>
              <input class="form-control me-sm-2" type="text" @input="setSearchContent($event.target.value)"
                placeholder="Search by Student Name">
              <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click="checkSearch">Search</button>
            </form>

          </div>
        </div>
      </div>

      <div style="height: 330px; overflow-y: scroll;">
        <table v-if="role === 'Member'" class="table table-striped hover" style="border:2px ;">
          <tr>
            <td class="title_collumn">StudentID</td>
            <td class="title_collumn">Name</td>
            <td class="title_collumn">Gender</td>
            <td class="title_collumn">Phone</td>
            <td class="title_collumn">Adress</td>
            <td class="title_collumn">GradeID</td>
            <td></td>
          </tr>
          <tr>
            <td> {{ list.id }}</td>
            <td>{{ list.name }}</td>
            <td>{{ list.gender }}</td>
            <td>{{ list.phone }}</td>
            <td>{{ list.address }}</td>
            <td>{{ list.gradeID }}</td>
            <td><button class="btn text-info" v-on:click="detailStudent(list.id)">Detail</button>
              <button class="btn text-warning" v-on:click="editStudent(list.id)">Edit</button>
            </td>
          </tr>
        </table>


        <table v-if="role === 'Admin'" class="table table-striped hover" style="border:2px ;">
          <tr>
            <td class="title_collumn">StudentID</td>
            <td class="title_collumn">Name</td>
            <td class="title_collumn">Gender</td>
            <td class="title_collumn">Phone</td>
            <td class="title_collumn">Adress</td>
            <td class="title_collumn">GradeID</td>
            <td><button class="border-info text-info ">
                <router-link style="text-decoration: none;" to="/Create_Student">Create Student
                </router-link>
              </button></td>
          </tr>
          <tr v-for="item in list" v-bind:key="item.ID">
            <td style="width: 10%!important ;">{{ item.id }}</td>
            <td style="width: 10%!important ;">{{ item.name }}</td>
            <td style="width: 10%!important ;">{{ item.gender }}</td>
            <td style="width: 10%!important ;"> {{ item.phone }}</td>
            <td style="width: 15%!important ;">{{ item.address }}</td>
            <td style="width: 10%!important ;">{{ item.gradeID }}</td>
            <td style="width: 35%!important ;"><button class="btn text-info"
                v-on:click="detailStudent(item.id)">Detail</button>
              <button v-if="role === 'Admin'" class="btn text-warning" v-on:click="editStudent(item.id)">Edit</button>
              <button v-if="role === 'Admin'" class="btn text-danger"
                v-on:click="deleteStudent(item.id)">Delete</button>
            </td>
          </tr>
        </table>
      </div>
       <div class="text-end">
          <button class="btn btn-secondary back_btn m-0" style="height: 30px; margin: 0;">
            <router-link style="text-decoration: none;" to="/">Back
            </router-link>
          </button>
        </div>

    </div>
    <StudentDetail v-if="selectDisplayStudent === 1" v-bind:studentID="studentID"
      v-on:changeDisplayStudentList="updateDisplay($event)"></StudentDetail>
    <EditStudent v-if="selectDisplayStudent === 2" v-bind:studID="studentID"
      v-on:changeDisplayStudentList="updateDisplay($event)"></EditStudent>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import StudentDetail from './StudentDetail.vue';
import EditStudent from './EditStudent.vue';
export default {
  name: 'StudentList',
  data() {
    return {
      list: [],
      selectDisplayStudent: 0,
      studentID: undefined,
      role: null,
      userID: null,
      searchContent: null,
    }
  }, components: {
    StudentDetail,
    EditStudent
  },
  created() {
    this.role = localStorage.getItem('role');
    this.userID = localStorage.getItem('userID');
    console.log(this.role);
    console.log(this.userID);

  },
  async mounted() {
    await this.getStudents();
  },
  methods: {
    async checkSearch() {

      if (this.searchContent) {//tuc la co dien vao search
        await axios
          .get("https://localhost:44319/api/Student/GetStudentSearch/" + this.searchContent, this.getTokenConfig())
          .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
      }
      else {
        this.getStudents();
      }

    },
    setSearchContent(value) {
      console.log(value)
      this.searchContent = value;
    },
    async getStudents() {
      //giờ nha, check nếu role là admin thì get list, ko thì get mình thằng student này thôi
      if (this.role === 'Admin') {
        await axios
          .get('https://localhost:44319/api/Student', this.getTokenConfig())
          .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
      } else {
        console.log('in method async getStudents: userID: ' + this.userID);
        await axios
          .get('https://localhost:44319/api/Student/GetStudentByAspUserID/' + this.userID, this.getTokenConfig())
          .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
        console.log('in method async getStudents: this.List: ' + this.list);
        console.log(this.list);
      }

    },
    detailStudent(value) {
      console.log(value)
      this.studentID = value;
      this.selectDisplayStudent = 1;
    },
    updateDisplay(value) {
      this.getStudents();
      this.selectDisplayStudent = value;
    },
    getTokenConfig() {
      var token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      return config;
    },
    editStudent(value) {
      this.studentID = value;
      console.log(this.studentID);
      this.selectDisplayStudent = 2;
    },
    deleteStudent(value) {
      this.$confirm(
        {
          message: 'Do you want to delete this StudentID:' + value,
          button: {
            no: 'No',
            yes: 'Yes'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm
          */
          callback: confirm => {
            if (confirm) {
              axios
                .get('https://localhost:44319/api/Student/DeleteStudent/' + value, this.getTokenConfig())
                .then(response => {
                  console.log("K_____ res :- ", response);
                  console.log("K_____ res status:- ", response.status);
                })
                .catch(error => {
                  console.log("K_____ error :- ", error.response.data);
                });
              // this.getDepartments();
              this.getStudents();
              this.$router.go();//để reload lại trang
            }
          }
        })

    }
  }
}


</script>