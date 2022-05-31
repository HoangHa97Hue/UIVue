<template>
    <div class="container mt-4">
        <form method="post" @submit="checkForm">
            <h1>Login</h1>

            <div class="form-group m-3">
                <label class="form__label">Email</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="email" @input="setEmail($event.target.value)" placeholder="Enter Email">
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.email.required">Email is required</div>
                    <div class="error" v-if="!$v.email.email">Email must match {{ $v.email.$params.email }} pattern</div>
                    <div class="error" v-if="!$v.email.maxLength">Email must have at most
                        {{ $v.email.$params.maxLength.max }} letters.</div>
                </small>
            </div>

            <div class="form-group m-3">
                <label class="form__label">Password</label>
                <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model.trim="password" @input="setPassword($event.target.value)" placeholder="Enter Password">
                <small id="emailHelp" class="form-text text-muted">
                    <div class="error" v-if="!$v.password.required">Password is required</div>
                    <div class="error" v-if="!$v.password.maxLength">Password must have at most
                        {{ $v.password.$params.maxLength.max }} letters.</div>
                </small>
            </div>

            <button class="btn btn-primary" type="submit" :disabled="submitStatus === 'PENDING'">Sign In!</button>
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>

            <button class="btn btn-secondary" @click="signUp">Sign UP!</button>
        </form>
        <small id="emailHelp" class="form-text text-muted">
            <div class="error" v-for="item in error" v-bind:key="item">{{ item }}</div>
        </small>
    </div>

</template>

<script>
import { required, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios';

export default {
    data() {
        return {
            email: null,
            password: null,
            form: {
                email: null,
                password: null,
            },
            error: [],
            submitStatus: null,
            // disableButton: false,
        }
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
        }
    },
    methods: {
        signUp() {
            this.$router.push({ name: 'Register_Component' })//xius qua router dky thang Register
        },
        setEmail(value) {
            this.email = value,
                this.$v.email.$touch();
        },
        setPassword(value) {
            this.password = value,
                this.$v.password.$touch();
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

            this.form.email = this.email;
            this.form.password = this.password;


            let options = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: 'Bearer ' + "your token Paste Here",
                },
                data: JSON.stringify(this.form),
                url: 'https://localhost:44319/api/Token',
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
                    // localStorage.setItem('token', JSON.stringify(response.data));

                    this.$router.push({ name: 'home' }).catch(() => { });//chuyeenr dden trang list Department
                    localStorage.setItem('token', JSON.stringify(JSON.parse(JSON.stringify(response.data)).token));
                    localStorage.setItem('role', JSON.parse(JSON.stringify(response.data)).userRole);
                    localStorage.setItem('userID', JSON.parse(JSON.stringify(response.data)).userID);

                    window.dispatchEvent(new CustomEvent('userID-localstorage-changed', {
                        detail: {
                            storage: localStorage.getItem('userID')
                        }

                    }))

                    window.dispatchEvent(new CustomEvent('role-localstorage-changed', {
                        detail: {
                            storage: localStorage.getItem('role')
                        }

                    }))

                })
                .catch(error => {
                    console.log("K_____ error :- ", error.response.data);
                });
            e.preventDefault();
        }

        // if(this.submitStatus === 'OK'){
        //     console.log(response.data.token);
        // axios.post('https://localhost:44319/api/Token', this.form)
        // .then(response => {
        //     if(response.data.userId >0){ // xem thử vế này nó có chạy ko
        //     localStorage.setItem('token', JSON.stringify(response.data.token));
        //     response.data.token = '';
        //     localStorage.setItem('user', JSON.stringify(response.data));
        //     this.$router.push({name: 'TestDepartment_Detail'});//chuyeenr dden trang list Department
        //     }
        // })   
        // .catch(function (error) {
        // console.log(error);
        // });
        // }

        // e.preventDefault();






        // checkForm(e){
        //     //check thử theo cách mới nè
        //     if(!this.email){
        //         this.$refs.email.focus();
        //         // Swal.fire('Give Email');
        //         return;
        //     }

        //     if(!this.password){
        //         this.$refs.password.focus();
        //         // Swal.fire('Give Password');
        //         return;
        //     }

        //     this.form.email = this.email;
        //     this.form.password = this.password;
        //      let options = {
        //         method: "POST",
        //         headers: { 
        //          'Content-type': 'application/json; charset=UTF-8',
        //             Authorization: 'Bearer ' + "your token Paste Here",
        //               },
        //      data: JSON.stringify( this.form),
        //      url:'https://localhost:44319/api/Token',
        //      }

        //     //check thu coi form da valid chua
        //     this.$v.$touch()
        //     if (this.$v.$invalid) {
        //      this.submitStatus = 'ERROR'
        //      } else {
        //    // do your submit logic here
        //       this.submitStatus = 'PENDING'
        //      setTimeout(() => {
        //       this.submitStatus = 'OK'
        //      }, 500)
        //      }

        //   axios(options)
        //       .then(response => {
        //         console.log("K_____ res :- ", response);
        //          console.log("K_____ res status:- ", response.status);
        //       })
        //       .catch(error => {
        //          console.log("K_____ error :- ", error.response.data);
        //        });             
        //     e.preventDefault();                
        // }
    },

}
</script>