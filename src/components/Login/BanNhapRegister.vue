<template>
    <div class="container">
        <h2>You must register Account before create new Student</h2>
        <form method="post" @submit="checkForm">
            <h1>Register</h1>
            <small id="emailHelp" class="form-text text-muted" style="color: red!important;">
                {{ errorOrMessageFromBE }}
            </small>

            <div class="form-group m-3">
                <label class="form__label">Email</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="email" @input="setEmail($event.target.value)" placeholder="Enter Email" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.email.required">Email is required</div>
                    <div class="error" v-if="!$v.email.email">
                        Email must match {{ $v.email.$params.email }} pattern
                    </div>
                    <div class="error" v-if="!$v.email.maxLength">
                        Email must have at most
                        {{ $v.email.$params.maxLength.max }} letters.
                    </div>
                </small>
            </div>

            <div class="form-group m-3">
                <label class="form__label">Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="password" @input="setPassword($event.target.value)" placeholder="Enter Password" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.password.required">
                        Password is required
                    </div>
                    <div class="error" v-if="!$v.password.maxLength">
                        Password must have at most
                        {{ $v.password.$params.maxLength.max }} letters.
                    </div>
                </small>
            </div>

            <div class="form-group m-3">
                <label class="form__label">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="confirmPassword" @input="setConfirmPassword($event.target.value)"
                    placeholder="Enter Password" />
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.confirmPassword.required">
                        Confirm Password is required
                    </div>
                    <div class="error" v-if="!$v.confirmPassword.maxLength">
                        Confirm Password must have at most
                        {{ $v.password.$params.maxLength.max }} letters.
                    </div>
                    <div class="error" v-if="!$v.confirmPassword.sameAs">
                        Confirm Password must same as Password letters.
                    </div>
                </small>
            </div>

            <label class="form__label">Select Role</label>
            <select v-model="role">
                <option selected value="-1">Choose Role</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
            </select>
            <!-- <small id="emailHelp" class="form-text text-muted">
                <div class="error" v-if="!$v.role.required">Role is required</div>
                </small> -->

            <button class="btn btn-primary" type="submit" :disabled="submitStatus === 'PENDING'">
                Sign In!
            </button>
            <p class="typo__p" v-if="submitStatus === 'OK'">
                Thanks for your submission!
            </p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">
                Please fill the form correctly.
            </p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

            <!-- <button class="btn btn-secondary">Sign UP!</button> -->
        </form>
        <small id="emailHelp" class="form-text text-muted">
            <div class="error" v-for="item in error" v-bind:key="item">
                {{ item }}
            </div>
        </small>
    </div>
</template>

<script>
import { required, maxLength, email, sameAs } from "vuelidate/lib/validators";
import axios from "axios";

export default {
    data() {
        return {
            email: null,
            password: null,
            confirmPassword: null,
            form: {
                email: null,
                password: null,
                confirmPassword: null,
                role: null,
            },
            error: [],
            submitStatus: null,
            role: null,
            errorOrMessageFromBE: null,
            // selectDisplayRegisterPage : null,
            // disableButton: false,
        };
    },
    validations: {
        email: {
            required,
            maxLength: maxLength(100),
            email,
        },
        password: {
            required,
            maxLength: maxLength(50),
        },
        confirmPassword: {
            required,
            maxLength: maxLength(50),
            sameAs: sameAs("password"),
        },
        // role: {
        //     required
        // }
    },
    methods: {
        getTokenConfig() {
            var token = JSON.parse(localStorage.getItem("token"));
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            return config;
        },
        getToken() {
            var token = JSON.parse(localStorage.getItem("token"));
            return token;
        },
        signIn() {
            this.$router.push({ name: "Login_Component" }); //xius qua router dky thang Login
        },
        setEmail(value) {
            this.email = value;
            this.$v.email.$touch();
        },
        setPassword(value) {
            this.password = value;
            this.$v.password.$touch();
        },
        setConfirmPassword(value) {
            this.confirmPassword = value;
            this.$v.confirmPassword.$touch();
        },
        checkForm(e) {
            //check thử theo cách mới nè
            if (!this.email) {
                this.$refs.email.focus();
                // Swal.fire('Give Email');
                return;
            }

            if (!this.password) {
                this.$refs.password.focus();
                // Swal.fire('Give Password');
                return;
            }

            if (!this.confirmPassword) {
                this.$refs.confirmPassword.focus();
                // Swal.fire('Give Password');
                return;
            }

            this.form.email = this.email;
            this.form.password = this.password;
            this.form.confirmPassword = this.confirmPassword;
            this.form.role = this.role;
            //set them 1 cai bien de no biet la co tu cai buoc register qua ko
            localStorage.setItem('fromRegisterPage', 'true');
             window.dispatchEvent(new CustomEvent('fromRegisterPage-localstorage-changed', {
                        detail: {
                            storage: localStorage.getItem('fromRegisterPage')
                        }

                    }))


            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.getTokenConfig(),
                },
                data: JSON.stringify(this.form),
                url: "https://localhost:44319/api/Account/CreateAspUserID",
            };

            //check thu coi form da valid chua
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = "ERROR";
            } else {
                // do your submit logic here
                this.submitStatus = "PENDING";
                setTimeout(() => {
                    this.submitStatus = "OK";
                }, 500);
            }

            axios(options)
                .then((response) => {
                    localStorage.setItem("userID", JSON.stringify(response.data));
                    console.log("asdv");
                    this.$emit("changeDisplayRegisTerOnCreate", false);
                })
                .catch((error) => {
                    this.errorOrMessageFromBE = error.response.data;
                    console.log("K_____ error :- ", error.response.data);
                });
            e.preventDefault();
        },
    },
};
</script>