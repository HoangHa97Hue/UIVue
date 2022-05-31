<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="container-fluid" v-if="isRoleAndLogin === 1">
      <div class="row">
        <div class="col-12">
          <div class="row" style="height: 240px;">
            <div class="col-3" @click="manageDepartment">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestDepartment_Detail">
                      <h5 class="card-title">Manage Department</h5>
                      <img src="http://dut.udn.vn/Images/Slides/Slider_KhoaCNTT_KN40namCB.jpg" alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestDepartment_Detail">Manage Department
                    </router-link>
                  </button> -->
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestGrade_Detail">
                      <h5 class="card-title">Manage Classes</h5>
                      <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestGrade_Detail">Manage Classes</router-link>
                  </button> -->
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Student_List">
                      <h5 class="card-title">Manage Students</h5>
                      <img
                        src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Student_List">Manage Students</router-link>
                  </button> -->
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Score_List">
                      <h5 class="card-title">Manage Score</h5>
                      <img
                        src="https://images.unsplash.com/photo-1581574919402-5b7d733224d6?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Score_List">Manage Scores</router-link>
                  </button> -->
                </div>
              </div>
            </div>
          </div>
          <div class="row d-flex justify-content-center" style="height: 255px;margin-top: 10px !important;">
            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/List_Instructor">
                      <h5 class="card-title">Manage Instructor</h5>
                      <img
                        src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/List_Instructor">Manage Instructor</router-link>
                  </button> -->
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Subject_List">
                      <h5 class="card-title">Manage Subject</h5>
                      <img
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Subject_List">Manage Subject</router-link>
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid" v-else-if="isRoleAndLogin === 2">
      <div class="row">
        <div class="col-12">
          <div class="row" style="height: 250px;">
            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestGrade_Detail">
                      <h5 class="card-title">Class Infomation</h5>
                      <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestGrade_Detail">Student's Class Infomation
                    </router-link>
                  </button> -->
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Student_List">
                      <h5 class="card-title">Private Infomation</h5>
                      <img
                        src="https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/45f3b75f-cc6b-417a-a97b-ec4c5f7fc9b6.png?auto=format"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Student_List">Student's Infomation</router-link>
                  </button>
                </div> -->
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Score_List">
                      <h5 class="card-title">Views Scores</h5>
                      <img
                        src="https://images.unsplash.com/photo-1581574919402-5b7d733224d6?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Score_List">Student's Score
                    </router-link>
                  </button> -->
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Subject_List">
                      <h5 class="card-title">Subject Infomation</h5>
                      <img
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/Subject_List">Subject's Infomation
                    </router-link>
                  </button> -->
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestGrade_Detail">
                      <h5 class="card-title">Enroll Subject</h5>
                      <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870"
                        alt="">
                    </router-link>
                  </button>

                  <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestGrade_Detail">Student's Class Infomation
                    </router-link>
                  </button> -->
                </div>
              </div>
            </div>

           

            <!-- <button class="border-info text-info ">
                    <router-link style="text-decoration: none;" to="/TestGrade_Detail">Student's Class Infomation
                    </router-link>
                  </button> -->

          </div>
        </div>
      </div>
    </div>


    <div class="container-fluid" v-else>
      <div class="col-12">
        <div class="row  d-flex align-items-center justify-content-center">
          <!--d-flex align-items-center justify-content-center-->
          <!-- <div class="col-3"></div> -->
          <div :class="[hiddenAbout ? 'col-6' : 'col-4']">
            <button class="btn btn-info m-2" @click="displayAboutUniversity"> About
              <!-- bo cai the button about vao, neu click thi the div ben canh xuat hien-->
            </button>
          </div>
          <div v-if="!hiddenAbout" class="col-6 aboutUniversity d-flex align-items-center">
            <span style="color: white;font-weight: bold;">
              Tên trường: Đại học Bách khoa - Đại học Đà Nẵng
              Tên tiếng Anh: University of Science and Technology - The University of Danang (DUT)
              Mã trường: DDK
              Loại trường: Công lập
              Hệ đào tạo: Đại học - Sau đại học - Tại chức - Liên thông - Văn bằng 2 - Liên kết quốc tế
              Địa chỉ: 54 Nguyễn Lương Bằng, phường Hòa Khánh, quận Liên Chiểu, thành phố Đà Nẵng
              SĐT: 0236 3842308 - 0236.3620999
              Email: tchc.dhbk@dut.udn.vn
              Website: http://dut.udn.vn/
              Facebook: www.facebook.com/DUTpage/
            </span>

          </div>
        </div>

        <!-- <div class="row">
          <div class="col-3"></div>
          <div class="col-3 d-flex justify-content-center">
            <button @click="displayAboutUniversity"> About -->
        <!-- bo cai the button about vao, neu click thi the div ben canh xuat hien-->
        <!-- </button>
          </div>
          <div v-if="!hiddenAbout" class="col-6 aboutUniversity "> -->
        <!--aboutUniversity dung css de background image an cho no-->

        <!-- </div>
        </div> -->
      </div>
      <div class="col-12">
        <!-- lam ve cai bieu tuong click vao no nhay ra form login-->
      </div>
    </div>


  </div>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      isRoleAndLogin: null,//0 laf chua dang nhap, //1 la admin, 2 la member
      hiddenAbout: true,
    }
  },
  async created() {
    await this.getUserRole();
  },
  methods: {
    async getUserRole() {
      const role = localStorage.getItem('role');
      if (!role) {
        this.isRoleAndLogin = 0
      } else if (role === 'Admin') {
        this.isRoleAndLogin = 1
      } else {
        this.isRoleAndLogin = 2
      }
    },
    displayAboutUniversity() {
      this.hiddenAbout = !this.hiddenAbout;
    }

  }
}
</script>

<style scoped>
img {
  height: 170px;
  width: 230px;
  margin-bottom: 20px;
}
</style>


