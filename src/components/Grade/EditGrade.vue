<template>
  <div>
    <div class="text-warning" style="width: 100%;text-align: center;"></div>
            <br />
    <form method="post" @submit="checkForm">
      <h1>Edit Grade</h1>
      <div class="form-group">
        <label class="form__label">GradeID</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          v-model.trim="gradeID" disabled @input="setID($event.target.value)" placeholder="Enter ID" />
        <small id="emailHelp" class="form-text text-muted">
          <div class="error" v-if="!$v.gradeID.required">
            Grade ID is required
          </div>
          <div class="error" v-if="!$v.gradeID.maxLength">
            Grade ID must have at most
            {{ $v.gradeID.$params.maxLength.max }} letters.
          </div>
        </small>
      </div>
      <br>
      <label class="form__label">Grade Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
        v-model.trim="gradeName" @input="setName($event.target.value)" placeholder="Enter Name" />
      <small id="emailHelp" class="form-text text-muted">
        <div class="error" v-if="!$v.gradeName.required">
          Grade Name is required
        </div>
        <div class="error" v-if="!$v.gradeName.maxLength">
          Grade Name must have at most
          {{ $v.gradeName.$params.maxLength.max }} letters.
        </div>
      </small>

      <!-- <small id="emailHelp" class="form-text text-muted">
        Old departmentID: {{departmentID}}
      </small> -->
      <br>
      <label class="form__label">Select Department</label>
      <select v-model="departmentID" id="selectDepartment" placeholder="Choose Department">
        <!-- @click="genListDepartment"-->
        <!-- <option value="-1">Select Department</option> -->
        <option v-for="item in listDepartment" v-bind:key="item.id" :value="item.id">{{ item.name }}_{{ item.id }}
        </option>
      </select>
      <br>
      <br>
      <button style="margin-right: 10px;" class="btn btn-primary border-warning"  type="submit" :disabled="submitStatus === 'PENDING'">
        Submit!
      </button>
      <button class="btn btn-light border border-info" v-on:click="changeDisplayGradeList">Back</button>

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
  name: 'EditDepartment',
  props: {
    gradeIDForEdit: String,
    // displayDepartmentList: Boolean
  },
  data() {
    return {
      gradeID: null,
      gradeName: null,
      departmentID: null,
      gradeDetails: null,
      form: {
        ID: "",
        Name: "",
        departmentID: "",
      },
      error: [],
      submitStatus: null,
      listDepartment: null
    };
  },
  validations: {
    gradeID: {
      required,
      maxLength: maxLength(10),
    },
    gradeName: {
      required,
      maxLength: maxLength(50),
    },
    departmentID: {
      required
    },
  },
  async mounted() {
    // neu nhu ko de async thi sao
    await this.getGradeDetail(); // neu nhu ko de await thi sao
    console.log(this.gradeDetails)
    this.gradeID = this.gradeDetails.id;
    this.gradeName = this.gradeDetails.name;
    this.departmentID = this.gradeDetails.departmentID;
    console.log('Department ID: '+this.gradeDetails.departmentID);
    console.log('Department ID: '+this.departmentID);
    // await this.getListDepartment();
    // console.log('Edit: ' + this.departIDForEdit); 
  },
  methods: {
    
    getToken() {
      var token = JSON.parse(localStorage.getItem('token'));
      return token;
    },
    setID(value) {
      this.gradeID = value;
      this.$v.gradeID.$touch();
    },
    setName(value) {
      this.gradeName = value;
      this.$v.gradeName.$touch();
    },

    changeDisplayGradeList() {
      console.log("In Edit");
      this.$emit("changeDisplayGradeList", 0);
    },
    getTokenConfig() {
      var token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      return config;
    },
    async getGradeDetail() {
      await axios
        .get(
          "https://localhost:44319/api/Grade/GetGrade/" +
          this.gradeIDForEdit,
          this.getTokenConfig()
        )
        .then(
          (response) =>
            (this.gradeDetails = JSON.parse(JSON.stringify(response.data)))
        );
    },
    checkForm(e) {
      this.form.ID = this.gradeID;
      this.form.Name = this.gradeName;
      if (this.departmentID === null || this.departmentID === '') {
        this.error = [];
        this.error.push('Must choose Department');
        this.submitStatus = 'Error';
        // e.preventDefault();
      }
      //còn mà chọn rồi thì xóa lỗi choose Department nè
      else if (this.departmentID != null) {
        for (var i = 0; i < this.error.length; i++) {
          if (this.error[i] === 'Must choose Department') {
            this.error.splice(i, 1);
          }
        }
      }
      this.form.departmentID = this.departmentID;

      if (this.submitStatus != 'Error') {
        let options = {
          method: "POST",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer ' + this.getToken(),
          },
          data: JSON.stringify(this.form),
          url: 'https://localhost:44319/api/Grade/EditGrade',
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
   created () {
     fetch("https://localhost:44319/api/Department", this.getTokenConfig())
      .then(response => response.json())
      .then(data => (this.listDepartment = data));
      console.log(this.listDepartment);
  }

};
</script> 



