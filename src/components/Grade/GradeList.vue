<template>
    <div class="container">
        <div v-if="selectDisplayListGrade === 0">
            <div class="text-warning" style="width: 100%;text-align: center;"></div>
            <br />
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-12" v-if="role === 'Admin'">
                        <h1>Grade List</h1>
                        <div class="text-warning" style="width: 100%;text-align: center;">Delete function will delete
                            all Students,
                            Scores belonged to that Grade</div>
                    </div>


                    <div class="col-12" v-else>
                        <h1>Grade List</h1>

                    </div>
                    <div class="col-5" v-if="role === 'Admin'">
                        <form class="d-flex" @submit.prevent>
                            <input class="form-control me-sm-2" type="text"
                                @input="setSearchContent($event.target.value)" placeholder="Search by Grade Name">
                            <button class="btn btn-secondary my-2 my-sm-0" type="submit"
                                @click="checkSearch">Search</button>
                        </form>

                    </div>
                </div>
            </div>
            <div style="height: 328px; overflow-y: scroll;">
                <table v-if="role === 'Admin'" class="table table-striped hover" style="border: 2px">
                    <tr>
                        <td class="title_collumn">GradeID</td>
                        <td class="title_collumn">Name</td>
                        <td class="title_collumn">DepartmentID</td>
                        <td>
                            <div v-if="role === 'Admin'">
                                <button class="border-info text-info ">
                                    <router-link style="text-decoration: none;" to="/Create_Grade">Create Grade
                                    </router-link>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="item in list" v-bind:key="item.ID">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.departmentID }}</td>
                        <td><button class="btn text-info" v-on:click="detailGrade(item.id)">Detail</button>
                            <button v-if="role === 'Admin'" class="btn text-warning"
                                v-on:click="editGrade(item.id)">Edit</button>
                            <button v-if="role === 'Admin'" class="btn text-danger"
                                v-on:click="deleteGrade(item.id)">Delete</button>
                        </td>
                    </tr>
                </table>

                <table v-else class="table table-striped hover" style="border: 2px">
                    <tr>
                        <td>GradeID</td>
                        <td>Name</td>
                        <td>DepartmentID</td>
                        <td> <button class="border-info text-info ">
                                <router-link style="text-decoration: none;" to="/Create_Grade">Create Grade
                                </router-link>
                            </button></td>
                    </tr>
                    <tr>
                        <td>{{ list.id }}</td>
                        <td>{{ list.name }}</td>
                        <td>{{ list.departmentID }}</td>
                        <td><button class="btn text-info" v-on:click="detailGrade(list.id)">Detail</button>
                            <button v-if="role === 'Admin'" class="btn text-warning"
                                v-on:click="editGrade(list.id)">Edit</button>
                        </td>
                    </tr>
                </table>
            </div>
             <div class="text-end">
                <button class="btn btn-secondary back_btn m-0" style="height: 30px; margin: 0;">
                    <router-link style="text-decoration: none;" to="/">Back
                    </router-link>
                </button>
            </div>

        </div>


        <GradeDetail v-else-if="selectDisplayListGrade === 1" v-bind:gradeID="gradeID"
            v-on:changeDisplayGradeList="updateDisplay($event)"></GradeDetail>
        <EditGrade v-else-if="selectDisplayListGrade === 2" v-bind:gradeIDForEdit="gradeID"
            v-on:changeDisplayGradeList="updateDisplay($event)"></EditGrade>

        <vue-confirm-dialog></vue-confirm-dialog>
    </div>
</template>

<script>
import axios from "axios";
import GradeDetail from "./GradeDetail.vue";
import EditGrade from "./EditGrade.vue";
export default {
    name: "GradeList",
    data() {
        return {
            list: [],
            selectDisplayListGrade: 0,
            gradeID: undefined,
            role: undefined,
            userID: null,
            searchContent: null
        };
    },
    created() {
        this.role = localStorage.getItem('role');
        this.userID = localStorage.getItem('userID');
        console.log(this.role);
        console.log(this.userID);

    },
    async mounted() {
        await this.getGrades()

    },
    methods: {
        async checkSearch() {
            if (this.searchContent) {//tuc la co dien vao search
                await axios
                    .get("https://localhost:44319/api/Grade/GetGradeSearch/" + this.searchContent, this.getTokenConfig())
                    .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
            }
            else {
                this.getGrades();
            }
        },
        setSearchContent(value) {
            console.log(value)
            this.searchContent = value;
        },
        async getGrades() {
            if (this.role === 'Admin') {
                await axios
                    .get("https://localhost:44319/api/Grade", this.getTokenConfig())
                    .then(
                        (response) => (this.list = JSON.parse(JSON.stringify(response.data)))
                    );
            } else {
                await axios
                    .get("https://localhost:44319/api/Grade/GetGradeByAspUserID/" + this.userID, this.getTokenConfig())
                    .then(
                        (response) => (this.list = JSON.parse(JSON.stringify(response.data)))
                    );
            }
        },
        detailGrade(value) {
            this.gradeID = value;
            this.selectDisplayListGrade = 1;
        },
        editGrade(value) {
            this.gradeID = value;
            this.selectDisplayListGrade = 2;
        },
        updateDisplay(value) {
            this.getGrades();
            this.selectDisplayListGrade = value;
        },
        getTokenConfig() {
            var token = JSON.parse(localStorage.getItem("token"));
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            return config;
        },
        deleteGrade(value) {
            this.$confirm(
                {
                    message: 'Do you want to delete this GradeID:' + value,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    /**
                    * Callback Function
                    * @param {Boolean} confirm
                    */
                    callback: confirm => {
                        if (confirm) {
                            axios
                                .get('https://localhost:44319/api/Grade/DeleteGrade/' + value, this.getTokenConfig())
                                .then(response => {
                                    console.log("K_____ res :- ", response);
                                    console.log("K_____ res status:- ", response.status);
                                })
                                .catch(error => {
                                    console.log("K_____ error :- ", error.response.data);
                                });
                            // this.getDepartments();
                            this.getGrades();
                            this.$router.go();//để reload lại trang
                        }
                    }
                })

        }
    },
    components: { GradeDetail, EditGrade },
};
</script>