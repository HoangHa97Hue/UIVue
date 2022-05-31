<template>
  <div class="container">
     <div class="text-warning" style="width: 100%;text-align: center;"></div>
      <br />
    <form method="post" @submit="checkForm">
      <h1>Edit Subject</h1>
      <div class="form-group">
        <label class="form__label">SubjectID</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          v-model.trim="subjectID" disabled @input="setID($event.target.value)" placeholder="Enter ID" />
        <small id="emailHelp" class="form-text text-muted">
          <div class="error" v-if="!$v.subjectID.required">
            Subject ID is required
          </div>
          <div class="error" v-if="!$v.subjectID.maxLength">
            Subject ID must have at most
            {{ $v.subjectID.$params.maxLength.max }} letters.
          </div>
        </small>
      </div>
      <br>
      <label class="form__label">Subject Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
        v-model.trim="subjectName" @input="setName($event.target.value)" placeholder="Enter Name" />
      <small id="emailHelp" class="form-text text-muted">
        <div class="error" v-if="!$v.subjectName.required">
          Subject Name is required
        </div>
        <div class="error" v-if="!$v.subjectName.maxLength">
          Subject Name must have at most
          {{ $v.subjectName.$params.maxLength.max }} letters.
        </div>
      </small>
        <br>
       <label class="form__label">Number of Credits</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
        v-model.trim="numberOfCredits" @input="setNumberOfCredits($event.target.value)" placeholder="Enter Name" />
      <small id="emailHelp" class="form-text text-muted">
        <div class="error" v-if="!$v.numberOfCredits.required">
          Subject Name is required
        </div>    
      </small>
      <br>
      <button style="margin-right: 10px;" class="btn btn-primary border-warning"  type="submit" :disabled="submitStatus === 'PENDING'">
        Submit!
      </button>
      <button class="btn btn-light border border-info" v-on:click="changeDisplaySubjectList">Back</button>

      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your submission!
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>
    <small id="emailHelp" class="form-text text-muted">
      <div class="error" v-for="item in error" v-bind:key="item">{{ item }}</div>
    </small>
  </div>

</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: 'EditSubject',
  props: {
    subjectIDForEdit: String,
    // displayDepartmentList: Boolean
  },
  data() {
    return {
      subjectID: null,
      subjectName: null,
      numberOfCredits: null,
      form: {
        ID: "",
        Name: "",
        numberOfCredits: "",
      },
      error: [],
      submitStatus: null,
      subjectDetails: null

    };
  },
  validations: {
    subjectID: {
      required,
      maxLength: maxLength(10),
    },
    subjectName: {
      required,
      maxLength: maxLength(50),
    },
    numberOfCredits: {
      required
    },
  },
  async mounted() {
    // neu nhu ko de async thi sao
    await this.getSubjectDetail(); // neu nhu ko de await thi sao
    console.log(this.subjectDetails)
    this.subjectID = this.subjectDetails.id;
    console.log('in mounted: SJid'+this.subjectID )
    this.subjectName = this.subjectDetails.name;
    this.numberOfCredits = this.subjectDetails.numberOfCredits;
    // console.log('Department ID: '+this.gradeDetails.departmentID);
    // console.log('Department ID: '+this.departmentID);
    // await this.getListDepartment();
    // console.log('Edit: ' + this.departIDForEdit); 
  },
  methods: {
    
    getToken() {
      var token = JSON.parse(localStorage.getItem('token'));
      return token;
    },
    setID(value) {
      this.subjectID = value;
      this.$v.subjectID.$touch();
    },
    setName(value) {
      this.subjectName = value;
      this.$v.subjectName.$touch();
    },

    changeDisplaySubjectList() {
      console.log("In Edit");
      this.$emit("changeDisplaySubjectList", true);
    },
    getTokenConfig() {
      var token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      return config;
    },
    async getSubjectDetail() {
      await axios
        .get(
          "https://localhost:44319/api/Subject/GetSubject/" +
          this.subjectIDForEdit,
          this.getTokenConfig()
        )
        .then(
          (response) =>
            (this.subjectDetails = JSON.parse(JSON.stringify(response.data)))
        );
    },
    checkForm(e) {
      this.form.ID = this.subjectID;
      console.log("In checkForm sjID: "+this.subjecID);
      this.form.Name = this.subjectName;
      console.log("In checkForm sjName: "+this.subjecName);
      this.form.numberOfCredits = this.numberOfCredits;
      if (this.submitStatus != 'Error') {
        let options = {
          method: "POST",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer ' + this.getToken(),
          },
          data: JSON.stringify(this.form),
          url: 'https://localhost:44319/api/Subject/EditSubject',
        }

        //check thu coi form da valid chua
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
        }

        axios(options)
          .then(response => {
            console.log("K_____ res :- ", response);
            console.log("K_____ res status:- ", response.status);
          })
          .catch(error => {
            console.log("K_____ error :- ", error.response.data);
          });

        e.preventDefault();
      }
      return;

    }
  },

};
</script> 



