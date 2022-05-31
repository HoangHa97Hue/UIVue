<template>
  <div  style="height: 10%!important;">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="height: 10%!important;">
      <div class="container-fluid">
        <router-link to="/" class="nav-link active" style="color: white !important;">Home</router-link> |
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul  class="navbar-nav me-auto">
            <li v-if="isRoleAndLogin==1" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                aria-expanded="false">Create Category</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                  <router-link style="text-decoration:none" to="/Create_Department">Department</router-link>
                </a>
                <a class="dropdown-item" href="#">
                  <router-link style="text-decoration:none" to="/Create_Grade">Grade</router-link>
                </a>
                <a class="dropdown-item" href="#">
                  <router-link style="text-decoration:none" to="/Create_Student">Student</router-link>
                </a>
                <a class="dropdown-item" href="#">
                  <router-link style="text-decoration:none" to="/Create_Score">Score</router-link>
                </a>

                <a class="dropdown-item" href="#">
                  <router-link style="text-decoration:none" to="/Create_Subject">Subject</router-link>
                </a>

              </div>
            </li>
            <li v-if="isRoleAndLogin == 1 || isRoleAndLogin == 2" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                aria-expanded="false">List Category</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#" >
              <router-link style="text-decoration:none" to="/Grade_List">Grade</router-link> 
            </a>
            <a class="dropdown-item" href="#" >
              <router-link style="text-decoration:none" to="/Student_List">Student</router-link> 
            </a>
            <a class="dropdown-item" href="#" >
              <router-link style="text-decoration:none" to="/List_Instructor">Instructor</router-link> 
            </a>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link style="text-decoration:none" to="/Score_List">Score</router-link> 
            </a>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link style="text-decoration:none" to="/Subject_List">Subject</router-link> 
            </a>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link style="text-decoration:none" v-if="isRoleAndLogin==1"  to="/TestDepartment_Detail">Department</router-link> 
            </a>           
              </div>
            </li>
             <a v-if="isRoleAndLogin == 2" class="dropdown-item" href="#" style="text-decoration:none">
              <router-link style="text-decoration: none;color: bisque !important;" 
              to="/Create_Student_Register_SignUp">Create Student For Register Singup</router-link> 
            </a>
          </ul>      
          <button v-if="!isLogined" class="btn btn-warning">
            <router-link to="/Login_Component">Login</router-link>
          </button>
          <button v-else @click="LogoutFunction" class="btn text-danger">Log Out</button>
          <!-- <router-link to="/Register_Component_SignUp">SignUpBefore Login </router-link>
          <router-link to="/Register_Component">SignUp </router-link> -->

        </div>
      </div>
    </nav>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
  

</template>

<script>
export default {
  data() {
    return {
      isLogined: null,
      userID: null,
      isRoleAndLogin: null,
      role: null,
    }
  },

  async created() {
    await this.getUserRole();
    this.userID = localStorage.getItem('userID');
    if (this.userID) {
      this.isLogined = true;
    } else {
      this.isLogined = false;
    }
  },
  mounted() {
    window.addEventListener('userID-localstorage-changed', (event) => {
      this.userID = event.detail.storage;
    });
    window.addEventListener('role-localstorage-changed', (event) => {
      this.role = event.detail.storage;
    });
  },
  watch: {
    userID(value) {
      if (value != null) {
        this.isLogined = true;
      } else {
        this.isLogined = false;
      }
    }

    , role(value) {
      console.log('role:' + this.role);
      console.log('role:' + this.isRoleAndLogin);
      if (value === 'Member') {
        this.isRoleAndLogin = 2
      } else if (value === 'Admin') {
        this.isRoleAndLogin = 1
      } else {
        this.isRoleAndLogin = 0
      }
    }
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
    }
    ,
    LogoutFunction() {
      this.$confirm(
        {
          message: 'Do you want to LOG OUT',
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
              this.isLogined = !this.isLogined;
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              localStorage.removeItem('userID');
              localStorage.removeItem('fromRegisterPage');
              this.$router.go();//để reload lại trang
            }
          }
        })

    }
  }
}
</script>