<template>
  <div class="container">
    <div v-if="selectDisplayListSubject === true">
      <div class="text-warning" style="width: 100%;text-align: center;"></div>
      <br />
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-12">
            <h1>Subject List</h1>
          </div>


          <div class="col-5">
            <form class="d-flex" @submit.prevent>
              <input class="form-control me-sm-2" type="text" @input="setSearchContent($event.target.value)"
                placeholder="Search by Subject Name">
              <button class="btn btn-secondary my-2 my-sm-0" type="submit" @click="checkSearch">Search</button>
            </form>

          </div>
        </div>
      </div>
      <div style="height: 350px; overflow-y: scroll;">
        <table class="table table-striped hover" style="border:2px ;">
          <tr>
            <td>SujectID</td>
            <td>Name</td>
            <td>NumberOfCredits</td>
            <td>
              <div v-if="role === 'Admin'">
                <button class="border-info text-info ">
                  <router-link style="text-decoration: none;" to="/Create_Subject">Create Subject
                  </router-link>
                </button>
              </div>

              <div v-if="role === 'Member'">
                <button class="border-info text-info ">
                  <router-link style="text-decoration: none;" to="/Enroll_Subject">Enroll Subject
                  </router-link>
                </button>
              </div>
            </td>
          </tr>
          <tr v-for="item in list" v-bind:key="item.ID">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.numberOfCredits }}</td>
            <td v-if="role === 'Admin'">
              <button class="btn text-warning" v-on:click="editSubject(item.id)">Edit</button>
              <button class="btn text-danger" v-on:click="deleteSubject(item.id)">Delete</button>
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
    <EditSubject v-else-if="selectDisplayListSubject === false" v-bind:subjectIDForEdit="subjectID"
      v-on:changeDisplaySubjectList="updateDisplay($event)"></EditSubject>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import EditSubject from './EditSubject.vue';
export default {
  name: "SubjectList",
  data() {
    return {
      list: [],
      role: undefined,
      userID: null,
      selectDisplayListSubject: true,
      searchContent: null
    };
  },
  created() {
    this.role = localStorage.getItem("role");
    this.userID = localStorage.getItem("userID");
  },
  async mounted() {
    await this.getSubjects()

  },
  methods: {
    editSubject(value) {
      this.subjectID = value;
      this.selectDisplayListSubject = false;
    },
    setSearchContent(value) {
      console.log(value)
      this.searchContent = value;
    },
    updateDisplay(value) {
      this.getSubjects();
      this.selectDisplayListSubject = value;
    },
    async getSubjects() {
      await axios
        .get("https://localhost:44319/api/Subject", this.getTokenConfig())
        .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
    },
    getTokenConfig() {
      var token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      return config;
    },
    async checkSearch() {

      if (this.searchContent) {//tuc la co dien vao search
        await axios
          .get("https://localhost:44319/api/Subject/GetSubjectSearch/" + this.searchContent, this.getTokenConfig())
          .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
      }
      else {
        this.getSubjects();
      }

    },
    deleteSubject(value) {
      this.$confirm(
        {
          message: 'Do you want to delete this SubjectID:' + value,
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
                .get('https://localhost:44319/api/Subject/DeleteSubject/' + value, this.getTokenConfig())
                .then(response => {
                  console.log("K_____ res :- ", response);
                  console.log("K_____ res status:- ", response.status);
                })
                .catch(error => {
                  console.log("K_____ error :- ", error.response.data);
                });
              // this.getDepartments();
              this.getSubjects();
              this.$router.go();//để reload lại trang
            }
          }
        })

    }
  },
  components: { EditSubject }
}

</script>