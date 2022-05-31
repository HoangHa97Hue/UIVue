<template>
    <div class="container">
        <div v-if="displayDepartmentList == 0">
            <div class="text-warning" style="width: 100%;text-align: center;"></div>
            <br />
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-12">
                        <h1>Department List</h1>
                        <div class="text-warning" style="width: 100%;text-align: center;">Delete function will delete
                            all Students,
                            Grades, Score belonged to the specific Department</div>
                    </div>
                    <div class="col-5" v-if="role === 'Admin'">
                        <form class="d-flex" @submit.prevent>
                            <input class="form-control me-sm-2" type="text"
                                @input="setSearchContent($event.target.value)" placeholder="Search by Department Name">
                            <button class="btn btn-secondary my-2 my-sm-0" type="submit"
                                @click="checkSearch">Search</button>
                        </form>

                    </div>
                </div>
            </div>
            <div style="height: 330px; overflow-y: scroll;">
                <table class="table table-striped hover" style="border:2px ;">

                    <tr>
                        <td class="title_collumn">ID</td>
                        <td class="title_collumn">DeName</td>
                        <td class="title_collumn">Description</td>
                        <td>
                            <button class="border-info text-info ">
                                <router-link style="text-decoration: none;" to="/Create_Department">Create Department
                                </router-link>
                            </button>
                        </td>
                    </tr>
                    <tr v-for="item in listDepartment" v-bind:key="item.ID">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td><button class="btn text-info" v-on:click="detailDepartment(item.id)">Detail</button>
                            <button class="btn text-warning" v-on:click="editDepartment(item.id)">Edit</button>
                            <button class="btn text-danger" v-on:click="deleteDepartment(item.id)">Delete</button>
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

        <!-- <b-table hover :items="listDepartment" v-if="displayDepartmentList">
   
</b-table> -->
        <!-- <table style="border:2px ;" v-if="displayDepartmentList"> -->

        <!-- </table> -->

        <DepartmentDetail v-else-if="displayDepartmentList == 1" v-bind:departID="departmentID"
            v-on:changeDisplayDepartList="updateDisplay($event)"></DepartmentDetail>


        <EditDepartment v-else-if="displayDepartmentList == 2" v-bind:departIDForEdit="departmentID"
            v-on:changeDisplayDepartList="updateDisplay($event)"></EditDepartment>
        <!-- v-bind:departmentName="departmentName" v-bind:description="description"-->

        <vue-confirm-dialog></vue-confirm-dialog>

    </div>



</template>

<script>
import axios from 'axios';
import DepartmentDetail from './DepartmentDetail.vue';
import EditDepartment from './EditDepartment.vue';
export default {
    name: "DepartmentList",
    data() {
        return {
            listDepartment: [],
            departmentID: null,
            departmentName: null,
            description: null,
            departmentDetails: null,
            displayDepartmentList: 0,
            role: undefined,
            searchContent: null
        };
    },
    async created() {
        await this.getDepartments()
    },
    mounted() {
        this.role = localStorage.getItem('role');
        // axios
        //     .get("https://localhost:44319/api/Department")
        //     .then(response => (this.listDepartment = JSON.parse(JSON.stringify(response.data))));
    },
    methods: {
        async checkSearch() {
            if (this.searchContent) {//tuc la co dien vao search
                await axios
                    .get("https://localhost:44319/api/Department/GetDepartmentSearch/" + this.searchContent, this.getTokenConfig())
                    .then(response => (this.listDepartment = JSON.parse(JSON.stringify(response.data))));
                console.log(this.listDepartment)
            }
            else {
                this.getDepartments();
            }
        },
        setSearchContent(value) {
            console.log(value)
            this.searchContent = value;
        },
        getToken() {
            var token = JSON.parse(localStorage.getItem('token'));
            return token;
        },
        detailDepartment(value) {
            this.departmentID = value;
            this.displayDepartmentList = 1;
        },
        editDepartment(value) {
            this.departmentID = value;
            //  this.departmentName = value.name;
            //  this.description = value.description;
            this.displayDepartmentList = 2;//tức là để cho trang edit nó hiển thị
            console.log(this.displayDepartmentList);
        },
        updateDisplay(value) {
            this.getDepartments();
            this.displayDepartmentList = value;
        },
        getTokenConfig() {
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return config;
        },
        async getDepartments() {
            await axios
                .get("https://localhost:44319/api/Department", this.getTokenConfig())
                .then(response => (this.listDepartment = JSON.parse(JSON.stringify(response.data))));
        },
        deleteDepartment(value) {
            this.$confirm(
                {
                    message: 'Do you want to delete this DepartmentID:' + value,
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
                                .get('https://localhost:44319/api/Department/DeleteDepartment/' + value, this.getTokenConfig())
                                .then(response => {
                                    console.log("K_____ res :- ", response);
                                    console.log("K_____ res status:- ", response.status);
                                })
                                .catch(error => {
                                    console.log("K_____ error :- ", error.response.data);
                                });
                            // this.getDepartments();
                            this.getDepartments();
                            this.$router.go();//để reload lại trang
                        }
                    }
                })

        }
    },
    computed: {},
    components: { DepartmentDetail, EditDepartment }
}

</script>