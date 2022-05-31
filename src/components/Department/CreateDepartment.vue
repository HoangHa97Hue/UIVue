<template>

    <div class="container">
         <div class="text-warning" style="width: 100%;text-align: center;"></div>
            <br />
        <form method="post" @submit="checkForm">
            <h1>Create Department</h1>
            <small id="emailHelp" class="form-text text-muted" style="color:red !important">
                {{ errorOrMessageFromBE }}
            </small>
            <div class="form-group">
                <label class="form__label">DepartmentID</label>
                <!-- <input class="form__input" v-model.trim="departmentID" @input="setID($event.target.value)"/> -->
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="departmentID" @input="setID($event.target.value)" placeholder="Enter ID">
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.departmentID.required">Department ID is required</div>
                    <div class="error" v-if="!$v.departmentID.maxLength">Department ID must have at most
                        {{ $v.departmentID.$params.maxLength.max }} letters.</div>
                </small>
            </div>

            <label class="form__label">Department Name</label>
            <!-- <input class="form__input" v-model.trim="departmentID" @input="setID($event.target.value)"/> -->
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                v-model.trim="departmentName" @input="setName($event.target.value)" placeholder="Enter Name">
            <small id="emailHelp" class="form-text text-muted">
                <div class="error" v-if="!$v.departmentName.required">Department Name is required</div>
                <div class="error" v-if="!$v.departmentName.maxLength">Department Name must have at most
                    {{ $v.departmentName.$params.maxLength.max }} letters.</div>
            </small>

            <label class="form__label">Description</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                v-model.trim="description" @input="setDescription($event.target.value)" placeholder="Enter Description">
            <small id="emailHelp" class="form-text text-muted">
                <div class="error" v-if="!$v.description.maxLength">Description must have at most
                    {{ $v.description.$params.maxLength.max }} letters.</div>
            </small>
            <button style="margin-right: 20px;" class="btn btn-primary back_btn" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
            <button style="margin-left: 20px;" class="btn btn-secondary back_btn">
                <router-link style="text-decoration: none;" to="/TestDepartment_Detail">Back
                </router-link>
            </button>
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
        </form>


    </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios';


export default {

    data() {
        return {
            departmentID: null,
            departmentName: null,
            description: null,
            form: {
                ID: '',
                Name: '',
                description: ''
            },
            error: [],
            submitStatus: null,
            errorOrMessageFromBE: null,
        }
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
            maxLength: maxLength(100)
        }
    },
    methods: {
        getTokenConfig() {
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
        checkForm(e) {
            this.form.ID = this.departmentID;
            this.form.Name = this.departmentName;
            this.form.description = this.description;
            console.log(this.departmentID);
            console.log(this.departmentName);
            console.log(this.description);
            console.log(this.form.ID);
            console.log(this.form.Name);
            console.log(this.form.description);
            console.log("form");
            console.log(this.form)
            let options = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: 'Bearer ' + this.getTokenConfig(),
                },
                data: JSON.stringify(this.form),
                url: 'https://localhost:44319/api/Department/CreateDepartment',
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
                    this.errorOrMessageFromBE = '',
                    this.$router.push({ name: 'home' }).catch(() => { });
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



