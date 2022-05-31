<template>
  <div>
    <form method="post" @submit="checkForm">
      <div class="text-warning" style="width: 100%;text-align: center;"></div>
      <br />
      <h1>Edit Department</h1>
      <div>
        <label class="form__label">DepartmentID</label>
        <br>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          v-model.trim="departmentID" disabled @input="setID($event.target.value)" placeholder="Enter ID" />
        <small id="emailHelp" class="form-text text-muted">
          <div class="error" v-if="!$v.departmentID.required">
            Department ID is required
          </div>
          <div class="error" v-if="!$v.departmentID.maxLength">
            Department ID must have at most
            {{ $v.departmentID.$params.maxLength.max }} letters.
          </div>
        </small>
      </div>
      <br>
      <div class="form-group">
        <label class="form__label">Department Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          v-model.trim="departmentName" @input="setName($event.target.value)" placeholder="Enter Name" />
        <small id="emailHelp" class="form-text text-muted">
          <div class="error" v-if="!$v.departmentName.required">
            Department Name is required
          </div>
          <div class="error" v-if="!$v.departmentName.maxLength">
            Department Name must have at most
            {{ $v.departmentName.$params.maxLength.max }} letters.
          </div>
        </small>
      </div>
      <br>
      <div class="form-group">
        <label class="form__label">Description</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          v-model.trim="description" @input="setDescription($event.target.value)" placeholder="Enter Description" />
        <small id="emailHelp" class="form-text text-muted">
          <div class="error" v-if="!$v.description.maxLength">
            Description must have at most
            {{ $v.description.$params.maxLength.max }} letters.
          </div>
        </small>
      </div>

      <br>
      <button style="margin-right: 10px ;" class="btn btn-primary border-warning" type="submit"
        :disabled="submitStatus === 'PENDING'">
        Submit!
      </button>
      <button class="btn btn-light border border-info" v-on:click="changeDisplayDeList">Back</button>

      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your submission!
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>


  </div>

</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: 'EditDepartment',
  props: {
    departIDForEdit: String,
    // displayDepartmentList: Boolean
  },
  data() {
    return {
      departmentID: null,
      departmentName: null,
      description: null,
      departmentDetails: null,
      form: {
        ID: "",
        Name: "",
        description: "",
      },
      error: [],
      submitStatus: null,
    };
  },
  validations: {
    departmentID: {
      required,
      maxLength: maxLength(10),
    },
    departmentName: {
      required,
      maxLength: maxLength(50),
    },
    description: {
      maxLength: maxLength(100),
    },
  },
  async created() {
    // neu nhu ko de async thi sao
    await this.getDepartmentDetail(); // neu nhu ko de await thi sao
    this.departmentID = this.departmentDetails.id;
    this.departmentName = this.departmentDetails.name;
    console.log('Name' + this.departmentDetails.name);
    this.description = this.departmentDetails.description;
    console.log('Edit: ' + this.departIDForEdit);
  },
  methods: {
    getToken() {
      var token = JSON.parse(localStorage.getItem('token'));
      return token;
    },
    setID(value) {
      this.departmentID = value;
      this.$v.departmentID.$touch();
    },
    setName(value) {
      this.departmentName = value;
      this.$v.departmentName.$touch();
    },
    setDescription(value) {
      this.description = value;
      this.$v.description.$touch();
    },

    changeDisplayDeList() {
      console.log("In Edit");
      this.$emit("changeDisplayDepartList", 0);
    },
    getTokenConfig() {
      var token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      return config;
    },
    async getDepartmentDetail() {
      await axios
        .get(
          "https://localhost:44319/api/Department/GetDepartment/" +
          this.departIDForEdit,
          this.getTokenConfig()
        )
        .then(
          (response) =>
            (this.departmentDetails = JSON.parse(JSON.stringify(response.data)))
        );
    },
    checkForm(e) {
      this.form.ID = this.departmentID;
      this.form.Name = this.departmentName;
      this.form.description = this.description;

      let options = {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + this.getToken(),
        },
        data: JSON.stringify(this.form),
        url: 'https://localhost:44319/api/Department/EditDepartment',
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
  },
};
</script> 



