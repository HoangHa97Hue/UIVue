<template>
  <div class="container">
    <div v-if="selectDisplayListInstructor === 0">
      <div class="text-warning" style="width: 100%;text-align: center;"></div>
      <br />
      <div class="container">
        <div class="row d-flex justify-content-center">

          <div class="col-12">
            <h1>Instructor List</h1>
          </div>
          <div class="col-5">
            <!--v-if="role === 'Admin'"-->
            <form class="d-flex" @submit.prevent>
              <input class="form-control me-sm-2" type="text" @input="setSearchContent($event.target.value)"
                placeholder="Search by Instructor Name">
              <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click="checkSearch">Search</button>
            </form>

          </div>
        </div>
      </div>
      <div style="height: 350px; overflow-y: scroll;">
        <table class="table table-striped hover" style="border:2px ;">
          <tr>
            <td class="title_collumn">InstructorID</td>
            <td class="title_collumn">Name</td>
            <td class="title_collumn">DateOfBirth</td>
            <td><button class="border-info text-info ">
                <router-link style="text-decoration: none;" to="/Create_Instructor">Create Instructor
                </router-link>
              </button></td>
          </tr>
          <tr v-for="item in list" v-bind:key="item.ID">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.dateOfBirth | displayMoment }}</td>
            <td><button class="btn text-info" v-on:click="detailInstructor(item.id)">Detail</button>
              <button v-if="role === 'Admin'" class="btn text-warning"
                v-on:click="editInstructor(item.id)">Edit</button>
              <button v-if="role === 'Admin'" class="btn text-danger"
                v-on:click="deleteInstructor(item.id)">Delete</button>
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
    <InstructorDetail v-else-if="selectDisplayListInstructor === 1" v-bind:instructorID="instructorID"
      v-on:changeDisplayInstructorList="updateDisplay($event)"></InstructorDetail>
    <EditInstructor v-else-if="selectDisplayListInstructor === 2" v-bind:instructorIDForEdit="instructorID"
      v-on:changeDisplayInstructorList="updateDisplay($event)"></EditInstructor>

    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios';
import InstructorDetail from './InstructorDetail.vue';
import EditInstructor from './EditInstructor.vue';
export default {
  name: "InstructorList",
  data() {
    return {
      list: [],
      selectDisplayListInstructor: 0,
      instructorID: undefined,
      role: undefined,
      userID: null,
      searchContent: null,
    };
  },
  filters: {
    displayMoment: function (value) {
      return moment(value).format("DD MM YYYY");
    }
  },
  created() {
    this.role = localStorage.getItem("role");
    this.userID = localStorage.getItem("userID");
  },
  async mounted() {
    await this.getInstructors();
  },
  methods: {

    async checkSearch() {
      if (this.searchContent) {//tuc la co dien vao search
        await axios
          .get("https://localhost:44319/api/Instructor/GetInstructorSearch/" + this.searchContent, this.getTokenConfig())
          .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
      }
      else {
        this.getInstructors();
      }
    },
    setSearchContent(value) {
      this.searchContent = value;
    },
    getTokenConfig() {
      var token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      return config;
    },
    async getInstructors() {
      if (this.role === "Admin") {
        await axios
          .get("https://localhost:44319/api/Instructor", this.getTokenConfig())
          .then((response) => (this.list = JSON.parse(JSON.stringify(response.data))));
        // } else {
        //   await axios
        //     .get("https://localhost:44319/api/Grade/GetGradeByAspUserID/" + this.userID, this.getTokenConfig())
        //     .then(
        //       (response) => (this.list = JSON.parse(JSON.stringify(response.data)))
        //     );
        // }
      }
    },
    detailInstructor(value) {
      this.instructorID = value;
      this.selectDisplayListInstructor = 1;
    },
    editInstructor(value) {
      this.instructorID = value;
      this.selectDisplayListInstructor = 2;
    },
    updateDisplay(value) {
      this.getInstructors();
      this.selectDisplayListInstructor = value;
    },
    deleteInstructor(value) {
      this.$confirm({
        message: "Do you want to delete this InstructorID:" + value,
        button: {
          no: "No",
          yes: "Yes"
        },
        /**
        * Callback Function
        * @param {Boolean} confirm
        */
        callback: confirm => {
          if (confirm) {
            axios
              .get("https://localhost:44319/api/Instructor/DeleteInstructor/" + value, this.getTokenConfig())
              .then(response => {
                console.log("K_____ res :- ", response);
                console.log("K_____ res status:- ", response.status);
              })
              .catch(error => {
                console.log("K_____ error :- ", error.response.data);
              });
            // this.getDepartments();
            this.getInstructors();
            this.$router.go(); //để reload lại trang
          }
        }
      });
    }
  },
  components: { InstructorDetail, EditInstructor }
}

</script>