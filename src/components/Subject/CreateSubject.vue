<template>
    <div class="container">
        <form method="post" @submit="checkForm">
         <div class="text-warning" style="width: 100%;text-align: center;"></div>
            <br />
            <h1>Create Subject</h1>
             <small id="emailHelp" class="form-text text-muted" style="color: red !important;">
                {{ errorOrMessageFromBE }}
            </small>
            <div class="form-group m-3">
                <label class="form__label">SubjectID</label>
                <!-- <input class="form__input" v-model.trim="departmentID" @input="setID($event.target.value)"/> -->
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="subjectID" @input="setID($event.target.value)" placeholder="Enter ID">
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.subjectID.required">Subject ID is required</div>
                    <div class="error" v-if="!$v.subjectID.patternSjID">Subject ID must match Sj**** (* is number)
                        pattern</div>
                    <div class="error" v-if="!$v.subjectID.maxLength">Subject ID must have at most
                        {{ $v.subjectID.$params.maxLength.max }} letters.</div>
                </small>
            </div>

            <div class="form-group m-3">
                <label class="form__label">Subject Name</label>
                <!-- <input class="form__input" v-model.trim="departmentID" @input="setID($event.target.value)"/> -->
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="subjectName" @input="setName($event.target.value)" placeholder="Enter Name">
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.subjectName.required">Subject Name is required</div>
                    <div class="error" v-if="!$v.subjectName.maxLength">Subject Name must have at most
                        {{ $v.subjectName.$params.maxLength.max }} letters.</div>
                </small>
            </div>


            <div class="form-group m-3">
                <label class="form__label">Number of Credits</label> <br>
                <select class="form-select" v-model="numberOfCredits">
                    <option v-for="item in 10" :key="item" :value="item">{{ item }}</option>
                </select>
                <!-- <small id="emailHelp" class="form-text text-muted">
          <div class="error">{{errorNumberOfCredits}}</div>
      </small> -->
                <br>
                <button style="margin-right: 20px;" class="btn btn-primary back_btn" type="submit"
                    :disabled="submitStatus === 'PENDING' || !numberOfCredits">Submit!</button>
                <button style="margin-left: 20px;" @click.stop class="btn btn-secondary back_btn">
                    <router-link style="text-decoration: none;" to="/">Back
                    </router-link>
                </button>
                <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
            </div>

        </form>
        <small id="emailHelp" class="form-text text-muted">
            <div class="error" v-for="item in error" v-bind:key="item">{{ item }}</div>

        </small>

    </div>
</template>

<script>
import { required, maxLength, helpers } from 'vuelidate/lib/validators'
import axios from 'axios';

const patternSjID = helpers.regex('patternSjID', /^Sj\d{4}$/);

export default {

    data() {
        return {
            subjectID: null,
            subjectName: null,
            numberOfCredits: null,
            form: {
                ID: '',
                Name: '',
                numberOfCredits: ''
            },
            error: [],
            submitStatus: null,
            errorOrMessageFromBE: null,
        }
    },
    validations: {
        subjectID: {
            required,
            maxLength: maxLength(10),
            patternSjID
        },
        subjectName: {
            required,
            maxLength: maxLength(50),
        },
        numberOfCredits: {
            required
            // between: between(1,10)
        }
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
        checkForm(e) {
            this.form.ID = this.subjectID;
            this.form.Name = this.subjectName;

            if (this.numberOfCredits === null || this.numberOfCredits === '') {
                for (var i = 0; i < this.error.length; i++) {
                    if (this.error[i] === 'Must choose NumberOfCredits') {
                        this.error.splice(i, 1);
                    }
                }
                this.error.push('Must choose NumberOfCredits');
                this.submitStatus = 'ERROR';
                // e.preventDefault();    //cho nos ko chuyen lun
            }
            else if (this.numberOfCredits != null) {
                for (var f = 0; f < this.error.length; f++) {
                    if (this.error[f] === 'Must choose NumberOfCredits') {
                        this.error.splice(f, 1);
                    }
                }
            }

            this.form.numberOfCredits = this.numberOfCredits
            let options = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: 'Bearer ' + this.getToken(),
                },
                data: JSON.stringify(this.form),
                url: 'https://localhost:44319/api/Subject/CreateSubject',
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
                    this.errorOrMessageFromBE = error.response.data;
                    console.log("K_____ error :- ", error.response.data);
                });
            e.preventDefault();
        },
    }
}
</script> 



