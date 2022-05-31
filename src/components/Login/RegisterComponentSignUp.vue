<template>
    <div class="container">
        <div class="text-warning" style="width: 100%;text-align: center;"></div>
        <br />
        <h4 class="text-info">You must register Account, Login then input your student's information</h4>
        <form method="post" @submit="checkForm">
            <h1>Register</h1>
            <small id="emailHelp" class="form-text text-muted" style="color:red !important">
                {{ registerError }}
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
            <br>
            <button style="margin-right: 10px;" class="btn btn-primary back_btn" type="submit"
                :disabled="submitStatus === 'PENDING'">
                Sign In!
            </button>
            <button class="btn btn-secondary back_btn">
                <router-link style="text-decoration: none;" to="/">Back
                </router-link>
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
            dataToLogin: {
                selectDisplayRegisterPageSignUp: null,
                registerError: null

            }
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
            //hack code cho thang nay, vi ban dau dang ky register no can phai co token dinh theo
            var token = JSON.parse("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4zQGdtYWlsLmNvbSIsImp0aSI6IjIzYTBmYmFmLTBkOGUtNDM1OS1iYjQyLWZlMWU0YzE5Yzg2NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjUzODQ4NDM0LCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.MBo6uxhxs8bD7CPa10FzTr8F3nMfVBj0ouofLI_7ETw");
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

            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.getTokenConfig(),//thằng này giờ mình hackcode , lay token Admin co sẵn lun
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
                    // console.log("asdv");
                    this.$emit("changeDisplayRegisTerOnLogin", false);
                })
                .catch((error) => {
                    this.registerError = error.response.data;
                    console.log("K_____ error :- ", error.response.data);
                });
            e.preventDefault();
            //move to thang login
            // this.$router.push('/Login_Component_SignUp');//choo nay coi lai nha ????????????????????????????
        },
    },
};
</script>