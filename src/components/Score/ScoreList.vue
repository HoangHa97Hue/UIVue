<template>
    <div>
        <div v-if="selectDisplayListScore === 0">
            <div class="text-warning" style="width: 100%;text-align: center;"></div>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1>Score List</h1>
                    </div>
                </div>

                <div class="row d-flex justify-content-center">
                    
                    <div class="col-2 text-end">
                        <span>Select type</span>
                    </div>
                    <div class="col-2">
                        
                        <select v-model="selectedSearch" class="form-select form-select-sm"
                            aria-label=".form-select-sm example">
                            <option value="year">YEAR</option>
                            <option value="semester">SEMESTER</option>
                            <option value="subject">SUBJECT Name</option>
                        </select>
                    </div>
                    <div class="col-4 ">
                        <form class="d-flex" @submit.prevent>
                            <input class="form-control me-sm-2" type="text"
                                @input="setSearchContent($event.target.value)" placeholder="Search">
                            <button class="btn btn-secondary my-2 my-sm-0" type="submit"
                                @click="checkSearch">Search</button>
                        </form>
                        <small id="emailHelp" class="form-text text-muted">{{ errorSelect }}</small>
                    </div>
                </div>
            </div>
            <!-- <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h1>Score List</h1>
                    </div>

                    <div class="col-2">
                        <select v-model="selectedSearch" class="form-select form-select-sm"
                            aria-label=".form-select-sm example">
                            <option value="year">YEAR</option>
                            <option value="semester">SEMESTER</option>
                            <option value="subject">SUBJECT Name</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <form class="d-flex" @submit.prevent>
                            <input class="form-control me-sm-2" type="text"
                                @input="setSearchContent($event.target.value)" placeholder="Search">
                            <button class="btn btn-secondary my-2 my-sm-0" type="submit"
                                @click="checkSearch">Search</button>
                        </form>
                        <small id="emailHelp" class="form-text text-muted">{{ errorSelect }}</small>
                    </div>
                </div>
            </div> -->

            <div style="height: 350px; overflow-y: scroll;">
                <table class="table table-striped hover" style="border:2px ;">
                    <tr>
                        <td class="title_collumn">ScoreID</td>
                        <td class="title_collumn">StudentID</td>
                        <td class="title_collumn">SubjectID</td>
                        <td class="title_collumn">InstructorID</td>
                        <td class="title_collumn">Score</td>
                        <td class="title_collumn">Year</td>
                        <td class="title_collumn">Semester</td>
                        <td class="title_collumn">DateExam</td>
                        <td>
                            <div v-if="role === 'Admin'">
                                <button class="border-info text-info ">
                                    <router-link style="text-decoration: none;" to="/Create_Score">Create Score
                                    </router-link>
                                </button>
                            </div>
                            
                        </td>
                    </tr>
                    <tr v-for="item in list" v-bind:key="item.ID">
                        <td style="height: 30px !important;">{{ item.scoreID }}</td>
                        <td style="height: 30px !important;">{{ item.studentID }}</td>
                        <td style="height: 30px !important;">{{ item.subjectID }}</td>
                        <td style="height: 30px !important;">{{ item.instructorID }}</td>
                        <td style="height: 30px !important;">{{ item.scoreReality }}</td>
                        <td style="height: 30px !important;">{{ item.year }}</td>
                        <td style="height: 30px !important;">{{ item.semester }}</td>
                        <td style="height: 30px !important;">{{ item.dateExam | displayMoment }}</td>
                        <td style="height: 30px !important;"><button class="btn text-warning"
                               v-if="role === 'Admin'" v-on:click="editScore(item.scoreID)">Edit</button>
                            <button v-if="role === 'Admin'" class="btn text-danger" v-on:click="deleteScore(item.scoreID)">Delete</button>
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

        <EditScore v-else-if="selectDisplayListScore === 2" v-bind:scoreIDForEdit="scoreID"
            v-on:changeDisplayScoreList="updateDisplay($event)"></EditScore>

        <vue-confirm-dialog></vue-confirm-dialog>

    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios';
import EditScore from './EditScore.vue';
export default {
    name: "ScoreList",
    data() {
        return {
            list: [],
            selectDisplayListScore: 0,
            scoreID: undefined,
            selectedSearch: null,
            errorSelect: null,
            searchContent: null,
            role: null,
            userID: null
        };
    },
    // mounted() {
    //     // axios
    //     //     .get("https://localhost:44319/api/Score", this.getTokenConfig())
    //     //     .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
    // },
    filters: {
        displayMoment: function (value) {
            return moment(value).format("DD MM YYYY");
        }
    },
    created() {
        this.role = localStorage.getItem('role');
        this.userID = localStorage.getItem('userID');
        console.log(this.role);
        console.log(this.userID);

    },
    async mounted() {
        await this.getScores()

    },
    methods: {
        async getScores() {
            if (this.role === 'Admin') {
                await axios
                    .get("https://localhost:44319/api/Score", this.getTokenConfig())
                    .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
            } else {
                await axios
                    .get("https://localhost:44319/api/Score/GetScoresByAspUserID/" + this.userID, this.getTokenConfig())
                    .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
            }
        },
        async checkSearch() {
            console.log(this.errorSelect);
            if (!this.selectedSearch) {
                this.errorSelect = 'You must select type of searching to search';
                return;
            } else {
                this.errorSelect = null;
                if (this.selectedSearch === 'year') {
                    if (this.searchContent) {//tuc la co dien vao search
                        await axios
                            .get("https://localhost:44319/api/Score/GetScoreSearch/year&&" + this.searchContent, this.getTokenConfig())
                            .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
                    } else {
                        this.getScores();
                    }
                    // this.$router.go();
                } else if (this.selectedSearch === 'semester') {
                    if (this.searchContent) {//tuc la co dien vao search
                        await axios
                            .get("https://localhost:44319/api/Score/GetScoreSearch/semester&&" + this.searchContent, this.getTokenConfig())
                            .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
                    } else {
                        this.getScores();
                    }
                    // this.$router.go();

                } else {
                    if (this.searchContent) {//tuc la co dien vao search
                        await axios
                            .get("https://localhost:44319/api/Score/GetScoreSearch/subject&&" + this.searchContent, this.getTokenConfig())
                            .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
                    } else {
                        this.getScores();
                    }
                    // this.$router.go();
                }

            }
            // this.$router.go();
        },
        setSearchContent(value) {
            this.searchContent = value;
        },
        // async getScores() {
        //     await axios
        //         .get("https://localhost:44319/api/Score", this.getTokenConfig())
        //         .then(response => (this.list = JSON.parse(JSON.stringify(response.data))));
        // },
        editScore(value) {
            this.scoreID = value;
            this.selectDisplayListScore = 2;
        },
        getTokenConfig() {
            var token = JSON.parse(localStorage.getItem("token"));
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return config;
        },
        updateDisplay(value) {
            this.getScores();
            this.selectDisplayListScore = value;
        },
        deleteScore(value) {
            this.$confirm(
                {
                    message: 'Do you want to delete this ScoreID:' + value,
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
                                .get('https://localhost:44319/api/Score/DeleteScore/' + value, this.getTokenConfig())
                                .then(response => {
                                    console.log("K_____ res :- ", response);
                                    console.log("K_____ res status:- ", response.status);
                                })
                                .catch(error => {
                                    console.log("K_____ error :- ", error.response.data);
                                });
                            // this.getDepartments();
                            this.getScores();
                            this.$router.go();//để reload lại trang
                        }
                    }
                })

        }
    },
    components: { EditScore }
}

</script>