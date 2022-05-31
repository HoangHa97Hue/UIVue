<template>
    <div class="container">
        <div class="text-warning" style="width: 100%;text-align: center;"></div>
        <br />
        <form method="post" @submit="checkForm">
            <h1>Create Instructor</h1>
            <small id="emailHelp" class="form-text text-muted" style="color:red !important">
                {{ errorOrMessageFromBE }}
            </small>
            <div class="form-group">
                <label class="form__label">InstructorID</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="instructorID"  @input="setID($event.target.value)" placeholder="Enter ID" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.instructorID.required">
                        Instructor ID is required
                    </div>
                    <div class="error" v-if="!$v.instructorID.maxLength">
                        Instructor ID must have at most
                        {{ $v.instructorID.$params.maxLength.max }} letters.
                    </div>
                </small>
            </div>
            <br>
            <label class="form__label">Instructor Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                v-model.trim="instructorName" @input="setName($event.target.value)" placeholder="Enter Name" />
            <small id="emailHelp" class="form-text text-muted">
                <div class="error" v-if="!$v.instructorName.required">
                    Instructor Name is required
                </div>
                <div class="error" v-if="!$v.instructorName.maxLength">
                    Instructor Name must have at most
                    {{ $v.instructorName.$params.maxLength.max }} letters.
                </div>
            </small>

            <small id="emailHelp" class="form-text text-muted">
                <span>Old DOB: {{ DOB }}</span>
            </small>
            <div class="form-group m-3">
                <label class="form__label">DateOfBirth</label>
                <input type="date" class="form-control" :value="DOB" @blur="setDOB($event.target.value)" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.DOB.required">DateOfBirth is required</div>
                    <div class="error">{{ errorDOB }}</div>
                </small>
            </div>

            <br>


            <button style="margin-right: 10px;" class="btn btn-primary back_btn" type="submit"
                :disabled="submitStatus === 'PENDING'">Submit!</button>
            <button style="margin-left: 30px;" @click.stop class="btn btn-secondary back_btn">
                <router-link style="text-decoration: none;" to="/List_Instructor">Back
                </router-link>
            </button>
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
        </form>

        <small id="emailHelp" class="form-text text-muted">
            <div class="error" v-for="item in error" v-bind:key="item">{{ item }}</div>
        </small>

    </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios';


export default {
    // getTokenConfig(){
    //     var token = JSON.parse(localStorage.getItem('token'));
    //     return token;
    // },
    data() {
        return {
            instructorID: null,
            instructorName: null,
            DOB: null,
            // instructorDetails: null,
            form: {
                ID: "",
                Name: "",
                dateOfBirth: "",
            },
            error: [],
            submitStatus: null,
            errorDOB: null,
        }
    },
    validations: {
        instructorID: {
            required,
            maxLength: maxLength(10),
        },
        instructorName: {
            required,
            maxLength: maxLength(50),
        },
        DOB: {
            required
        },
    },
    methods: {
        getToken() {
            var token = JSON.parse(localStorage.getItem('token'));
            return token;
        },
        setID(value) {
            this.instructorID = value;
            this.$v.instructorID.$touch();
        },
        setName(value) {
            this.instructorName = value;
            this.$v.instructorName.$touch();
        },

        changeDisplayInstructorList() {
            console.log("In Edit");
            this.$emit("changeDisplayInstructorList", 0);
        },
        setDOB(value) {
            //check coi có lớn hơn ngày hiện tại ko
            if (new Date(value) > new Date()) {
                this.errorDOB = "Date exam must before Now Date!";
                this.submitStatus = 'ERROR'; // de no ko nhan dc nut sub mit
                this.disableButton = true;
            } else {
                this.errorDOB = null;
                this.disableButton = false;
            }
            this.DOB = value;
            this.$v.DOB.$touch();
        },
        getTokenConfig() {
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return config;
        },
        checkForm(e) {
             this.form.ID = this.instructorID;
      this.form.Name = this.instructorName;
     
      if (this.errorDateExam != null) {
        this.submitStatus = 'ERROR';
      }
      this.form.dateOfBirth = this.DOB;
      //còn mà chọn rồi thì xóa lỗi choose Department nè

      if (this.submitStatus != 'Error') {
        let options = {
          method: "POST",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer ' + this.getToken(),
          },
          data: JSON.stringify(this.form),
          url: 'https://localhost:44319/api/Instructor/CreateInstructor',
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
        },
    },
}
</script> 



