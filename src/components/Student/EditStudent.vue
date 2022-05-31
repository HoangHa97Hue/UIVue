<template>
  <div>
    <div class="container">
      <div class="text-warning" style="width: 100%;text-align: center;"></div>
            <br />
      <form method="post" @submit="checkForm" @submit.prevent>
        <h1>Edit Student</h1>
        <div class="form-group">
          <label class="form__label">StudentID</label>
          <!-- <input class="form__input" v-model.trim="departmentID" @input="setID($event.target.value)"/> -->
          <input type="text" disabled class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            v-model.trim="studentID" @input="setID($event.target.value)" placeholder="Enter ID" />
          <small id="emailHelp" class="form-text text-muted">
            <div class="error" v-if="!$v.studentID.required">
              Student ID is required
            </div>
            <div class="error" v-if="!$v.studentID.maxLength">
              Student ID must have at most
              {{ $v.studentID.$params.maxLength.max }} letters.
            </div>
          </small>
        </div>
        <br>
        <label class="form__label">Student Name</label>
        <!-- <input class="form__input" v-model.trim="departmentID" @input="setID($event.target.value)"/> -->
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          v-model.trim="studentName" @input="setName($event.target.value)" placeholder="Enter Name" />
        <small id="emailHelp" class="form-text text-muted">
          <div class="error" v-if="!$v.studentName.required">
            Student Name is required
          </div>
          <div class="error" v-if="!$v.studentName.maxLength">
            Student Name must have at most
            {{ $v.studentName.$params.maxLength.max }} letters.
          </div>
        </small>
        <br>
        <label class="form__label">Select Gender</label>
        <select class="form-select" v-model="gender" style="wi">
          <option selected value="-1">Choose Gender</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
        <div class="error">{{ errorGender }}</div>
        <br>
        <label class="form__label">Phone</label>
        <!-- <input class="form__input" v-model.trim="departmentID" @input="setID($event.target.value)"/> -->
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          v-model.trim="phone" @input="checkPhone($event.target.value)" placeholder="Enter Phone" />
        <small id="emailHelp" class="form-text text-muted">
          <div class="error" v-if="!$v.phone.required">Phone is required</div>
          <div class="error">{{ errorPhone }}</div>
          <!--vi sao thang nay ko an-->
        </small>
        <br>
        <label class="form__label">
          Address
        </label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          v-model.trim="address" @input="setAddress($event.target.value)" placeholder="Enter Description" />
        <small id="emailHelp" class="form-text text-muted">
          <div class="error" v-if="!$v.address.maxLength">
            Adrress must have at most
            {{ $v.address.$params.maxLength.max }} letters.
          </div>
        </small>
        <br>
        <label class="form__label">Select Grade</label>
        <select class="form-select" v-model="gradeID">
          <option v-for="item in listGrade" v-bind:key="item.id" :value="item.id">
            {{ item.name }}_{{ item.id }}
          </option>
        </select>
        <br>
        <button style="margin-right: 10px;" class="btn btn-primary border-warning"  type="submit" :disabled="submitStatus === 'PENDING'">
          Submit!
        </button>
        <button class="btn btn-light border border-info" v-on:click="changeDisplayStudentList">Back</button>

        <p class="typo__p" v-if="submitStatus === 'OK'">
          Thanks for your submission!
        </p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">
          Please fill the form correctly.
        </p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
      </form>
    </div>
    <small id="emailHelp" class="form-text text-muted">
      <div class="error" v-for="item in error" v-bind:key="item">{{ item }}</div>
    </small>
  </div>

</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: 'EditStudent',
  props: {
    studID: String,
    // displayDepartmentList: Boolean
  },
  data() {
    return {
      studentID: null,
      studentName: null,
      gender: null,
      phone: null,
      address: null,
      gradeID: null,
      // userID: null,
      form: {
        ID: "",
        Name: "",
        Gender: "",
        Phone: "",
        Address: "",
        GradeID: "",
        AspUserID: "",
      },
      error: [],
      errorPhone: null,
      errorGender: null,
      listGrade: [],
      submitStatus: null,
      listDepartment: null
    };
  },
  validations: {
    studentID: {
      required,
      maxLength: maxLength(10),
    },
    studentName: {
      required,
      maxLength: maxLength(50),
    },
    gender: {
      required,
    },
    phone: {
      required,
    },
    address: {
      required,
      maxLength: maxLength(100),
    },
  },
  async mounted() {
    // neu nhu ko de async thi sao
    await this.getStudentDetail(); // neu nhu ko de await thi sao
    console.log(this.studentDetails)
    this.studentID = this.studentDetails.id;
    this.studentName = this.studentDetails.name;
    this.gender = this.studentDetails.gender;
    console.log('gender: ' + this.studentDetails.gender);
    this.phone = this.studentDetails.phone;
    this.address = this.studentDetails.address;
    this.gradeID = this.studentDetails.gradeID;
  },
  methods: {
    getUserID() {
      var userId = JSON.parse(JSON.stringify(localStorage.getItem("userID")));
      return userId;
    },
    checkPhone(value) {
      if (/^\d{10,12}$/.test(value) === false) {
        this.errorPhone = "Phone must have 10-12 number characters";
        this.submitStatus = "ERROR";
      } else {
        this.errorPhone = null;
        this.phone = value;
        this.$v.phone.$touch();
      }
    },
    getToken() {
      var token = JSON.parse(localStorage.getItem('token'));
      console.log('token:'+this.token)
      return token;
    },
    setID(value) {
      this.studentID = value;
      this.$v.studentID.$touch();
    },
    setName(value) {
      this.studentName = value;
      this.$v.studentName.$touch();
    },
    setAddress(value) {
      this.address = value;
      this.$v.address.$touch();
    },

    changeDisplayStudentList() {
      // console.log("In Edit");
      this.$emit("changeDisplayStudentList", 0);
    },
    getTokenConfig() {
      var token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      return config;
    },
    async getStudentDetail() {
      console.log('stuID: ' + this.studID)
      await axios
        .get(
          "https://localhost:44319/api/Student/GetStudent/" +
          this.studID,
          this.getTokenConfig()
        )
        .then(
          (response) =>
            (this.studentDetails = JSON.parse(JSON.stringify(response.data)))
        );
    },
    checkForm(e) {
      if (this.gradeID === null || this.gradeID === "") {
        this.error = [];
        this.error.push("Must choose Grade For This Student");
        this.submitStatus = "ERROR";
        e.preventDefault();
      }
      //còn mà chọn rồi thì xóa lỗi choose Grade nè
      else if (this.gradeID != null) {
        for (var i = 0; i < this.error.length; i++) {
          if (this.error[i] === "Must choose Grade For This Student") {
            this.error.splice(i, 1);
          }
        }
      }
      //  console.log(this.departmentID);
      //check thang gender
      if (this.gender === "-1" || this.gender === null) {
        this.errorGender = "Must choose Gender";
        this.submitStatus = "ERROR";
      } else {
        this.errorGender = null;
      }
      if (this.errorPhone != null) {
        this.submitStatus = "ERROR";
      }
      this.form.Gender = this.gender;
      this.form.Phone = this.phone;
      this.form.Address = this.address;
      this.form.GradeID = this.gradeID;
      this.form.ID = this.studentID;
      this.form.Name = this.studentName;

      this.form.AspUserID = this.getUserID();

      console.log('this form: '+this.form)
      if (this.submitStatus != 'Error') {
        let options = {
          method: "POST",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer ' + this.getToken(),
          },
          data: JSON.stringify(this.form),
          url: 'https://localhost:44319/api/Student/EditStudent',
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
  created() {
    fetch("https://localhost:44319/api/Grade", this.getTokenConfig())
      .then(response => response.json())
      .then(data => (this.listGrade = data));
    console.log(this.listGrade);
  }

};
</script> 



