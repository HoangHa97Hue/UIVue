<template>
    <div class="container">
         <div class="text-warning" style="width: 100%;text-align: center;"></div>
            <br />
        <form method="post" @submit="checkForm">
            <h1>Input Score</h1>
            <small id="emailHelp" class="form-text text-muted" style="color: red !important;">
                {{ errorOrMessageFromBE }}
            </small>
            <div class="form-group m-3">
                <label class="form__label">ScoreID</label>
                <!-- <input class="form__input" v-model.trim="departmentID" @input="setID($event.target.value)"/> -->
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="scoreID" @input="setID($event.target.value)" placeholder="Enter ID">
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.scoreID.required">Score ID is required</div>
                    <div class="error" v-if="!$v.scoreID.patternScID">Score ID must match Sc**** (* is number) pattern
                    </div>
                    <div class="error" v-if="!$v.scoreID.maxLength">Score ID must have at most
                        {{ $v.scoreID.$params.maxLength.max }} letters.</div>
                </small>
            </div>


            <div class="row form-group d-flex m-3">
                <div class="col-4">
                    <label class="form__label">Select Student</label> <br>
                    <select v-model="studentID" id="selectStudent">
                        <option v-for="item in listStudent" v-bind:key="item.id" :value="item.id">StudentName_ID:
                            {{ item.name }}_{{ item.id }}</option>
                    </select>
                </div>

                <div class="col-4">
                    <label class="form__label">Select Instructor</label> <br>
                    <select v-model="instructorID" id="selectInstructor">
                        <option v-for="item in listInstructor" v-bind:key="item.id" :value="item.id">InstructorName_ID:
                            {{ item.name }}_{{ item.id }}</option>
                    </select>
                </div>
                <div class="col-4">
                    <label class="form__label">Select Subject</label> <br>
                    <select v-model="subjectID" id="selectSubject">
                        <option v-for="item in listSubject" v-bind:key="item.id" :value="item.id">SubjectName_ID:
                            {{ item.name }}_{{ item.id }}</option>
                    </select>
                </div>

            </div>
            <div class="form-group m-3">
                <label class="form__label">Score</label>
                <input type="text" class="form-control" :value="score" @input="setScore($event.target.value)" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.score.required">Score  is required</div>
                    <!-- <div class="error" v-if="!$v.score.between">Score must be between {{ $v.score.$params.between.min }}
                        and {{ $v.score.$params.between.max }}</div> -->
                    <div class="error" v-if="!$v.score.patternDouble">Score must from (1-10)</div>  
                </small>
            </div>

            <div class="form-group m-3">
                <!--xem lai thang nay co cho danh so thap phan ko-->
                <label class="form__label">Year</label>
                <input type="number" class="form-control" :value="year" @change="setYear($event.target.value)" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.year.required">Year is required</div>
                    <!-- <div class="error" v-if="!$v.year.between">Year must be between {{$v.year.$params.between.min}} and {{$v.year.$params.between.max}}</div> -->
                    <div class="error" v-if="!$v.year.patternYear">Year must from 2010-2020 </div>
                </small>
            </div>

            <div class="form-group m-3">
                <label class="form__label">Semester</label>
                <input type="number" class="form-control" :value="semester"
                    @change="setSemester($event.target.value)" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.semester.required">Semester is required</div>
                    <!-- <div class="error" v-if="!$v.semester.between">Semester must be between {{$v.semester.$params.between.min}} and {{$v.semester.$params.between.max}}</div> -->
                    <div class="error" v-if="!$v.semester.patternSemester">Semester only accepts 1 or 2 </div>
                </small>
            </div>

            <div class="form-group m-3">
                <label class="form__label">DateExam</label>
                <input type="date" class="form-control" :value="dateExam" @blur="setDateExam($event.target.value)" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.dateExam.required">DateExam is required</div>
                    <div class="error">{{ errorDateExam }}</div>
                </small>
            </div>
            <br>
            <button style="margin-right: 10px;" class="btn btn-primary back_btn" type="submit"
                :disabled="submitStatus === 'PENDING' || disableButton === true">Submit!</button>
            <button style="margin-right: 30px;" class="btn btn-secondary back_btn">
                <router-link style="text-decoration: none;" to="/">Back
                </router-link>
            </button>
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

        </form>
        <small id="emailHelp" class="form-text text-muted">
            <div class="error" v-for="item in error" v-bind:key="item">{{ item }}</div>
             <div class="text-info">{{ statusCreate }}</div>
        </small>
    </div>


    <!-- </div> -->
</template>

<script>
import { required, maxLength, helpers } from 'vuelidate/lib/validators'
import axios from 'axios';

const patternScID = helpers.regex('patternScID', /^Sc\d{4}$/);
const patternYear = helpers.regex('patternYear', /^((201[0-9])||(202[0-2]))$/);
const patternSemester = helpers.regex('patternSemester', /^(1||2)$/);
const patternDouble = helpers.regex('patternDouble', /^([0-9]{1}\.[0-9]{0,2})|10$/);
export default {

    data() {
        return {
            scoreID: null,
            studentID: null,
            subjectID: null,
            instructorID: null,
            score: null,
            year: null,
            semester: null,
            dateExam: null,
            form: {
                scoreID: '',
                studentID: '',
                subjectID: '',
                instructorID: '',
                scoreReality: '',
                year: '',
                semester: '',
                dateExam: '',
            },
            error: [],
            submitStatus: null,
            listStudent: [],
            listInstructor: [],
            listSubject: [],
            errorDateExam: null,
            disableButton: false,
            errorOrMessageFromBE: null,
            statusCreate: null
        }
    },
    validations: {
        scoreID: {
            required,
            maxLength: maxLength(10),
            patternScID,
        },
        studentID: {
            required,
            maxLength: maxLength(10),
        },
        subjectID: {
            required,
            maxLength: maxLength(10),
        },
        score: {
            required,
            // between: between(0, 10),
            patternDouble
        },
        year: {
            required,
            // between: between(2010,2022)
            patternYear
        },
        semester: {
            required,
            // between: between(1,2),
            patternSemester
        },
        dateExam: {
            required,
        }
    },
    methods: {
        getTokenConfig() {
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return config;
        },
        getToken() {
            var token = JSON.parse(localStorage.getItem('token'));
            return token;
        },
        setID(value) {
            this.scoreID = value;
            this.$v.scoreID.$touch();
        },
        setScore(value) {
           
            this.score =  this.convertStringToDouble(value);
            this.$v.score.$touch();
        },
        convertStringToDouble(value){
            return parseFloat(value);
        },
        setYear(value) {
            this.year = value;
            this.$v.year.$touch();
        },
        setSemester(value) {
            this.semester = value;
            this.$v.semester.$touch();
        },
        setDateExam(value) {
            //check coi có lớn hơn ngày hiện tại ko
            if (new Date(value) > new Date()) {
                this.errorDateExam = "Date exam must before Now Date!";
                this.submitStatus = 'ERROR'; // de no ko nhan dc nut sub mit
                this.disableButton = true;
            } else {
                this.errorDateExam = null;
                this.disableButton = false;
            }
            this.dateExam = value;
            this.$v.dateExam.$touch();
        },
        checkForm(e) {

            if (this.studentID === null || this.studentID === '') {
                for (var i = 0; i < this.error.length; i++) {
                    if (this.error[i] === 'Must choose Student') {
                        this.error.splice(i, 1);
                    }
                }
                this.error.push('Must choose Student');
                this.submitStatus = 'ERROR';
                // e.preventDefault();    
            }
            else if (this.studentID != null) {
                for (var f = 0; f < this.error.length; f++) {
                    if (this.error[f] === 'Must choose Student') {
                        this.error.splice(f, 1);
                    }
                }
            }

            if (this.instructorID === null || this.instructorID === '') {
                for (var j = 0; j < this.error.length; j++) {
                    if (this.error[j] === 'Must choose Instructor') {
                        this.error.splice(j, 1);
                    }
                }
                this.error.push('Must choose Instructor');
                this.submitStatus = 'ERROR';
                // e.preventDefault();    
            }
            else if (this.instructorID != null) {
                for (var t = 0; t < this.error.length; t++) {
                    if (this.error[t] === 'Must choose Instructor') {
                        this.error.splice(t, 1);
                    }
                }
            }

            if (this.subjectID === null || this.subjectID === '') {
                for (var k = 0; k < this.error.length; k++) {
                    if (this.error[k] === 'Must choose Subject') {
                        this.error.splice(k, 1);
                    }
                }
                this.error.push('Must choose Subject');
                this.submitStatus = 'ERROR';
                // e.preventDefault();    
            }
            else if (this.subjectID != null) {
                for (var m = 0; m < this.error.length; m++) {
                    if (this.error[m] === 'Must choose Subject') {
                        this.error.splice(m, 1);
                    }
                }
            }

            if (this.errorDateExam != null) {
                this.submitStatus = 'ERROR';
            }


            this.form.scoreID = this.scoreID;
            this.form.studentID = this.studentID;
            this.form.subjectID = this.subjectID;
            this.form.instructorID = this.instructorID;
            this.form.scoreReality = this.score;
            this.form.year = this.year;
            this.form.semester = this.semester;
            this.form.dateExam = this.dateExam;

            let options = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: 'Bearer ' + this.getToken(),
                },
                data: JSON.stringify(this.form),
                url: 'https://localhost:44319/api/Score/CreateScore',
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
                     this.statusEdit = 'Create Score Succesfully. Please comeback to the list scores!';
                    this.errorOrMessageFromBE = null,
                        //   this.errorOrMessageFromBE = this.response.data;
                        console.log("K_____ res :- ", response);
                    console.log("K_____ res status:- ", response.status);
                })
                //   .catch(error => {
                //       this.errorOrMessageFromBE = this.response.data;
                //      console.log("K_____ error :- ", error.response.data);
                //    });         
                // .catch(function (error) {
                //     if (error.response) {
                //         Request made and server responded
                //         this.errorOrMessageFromBE = error.response.data;
                //         console.log(error.response.data);
                //         console.log(error.response.status);
                //         console.log(error.response.headers);
                //         this.$router.go();
                //     }
                // })
                .catch(error => {
                    // if (error.response) {
                    // Request made and server responded
                    this.errorOrMessageFromBE = error.response.data;
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    // this.$router.go();
                    // }
                })

            e.preventDefault();

        },
    },
    created() {
        // Simple GET request using fetch
        fetch("https://localhost:44319/api/Student", this.getTokenConfig())
            .then(response => response.json())
            .then(data => (this.listStudent = data));
        console.log(this.listStudent);

        fetch("https://localhost:44319/api/Instructor", this.getTokenConfig())
            .then(response => response.json())
            .then(data => (this.listInstructor = data));
        console.log(this.listInstructor);

        fetch("https://localhost:44319/api/Subject", this.getTokenConfig())
            .then(response => response.json())
            .then(data => (this.listSubject = data));
        console.log(this.listSubject);
    }
}
</script> 





