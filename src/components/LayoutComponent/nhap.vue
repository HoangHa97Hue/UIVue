 <nav class="navbar navbar-expand-lg  bg-primary">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->
      <router-link to="/" class="navbar-brand">Home</router-link> |
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul v-if="isRoleAndLogin==1" class="navbar-nav me-auto" style="width: 160px;margin-right: 20px !important;">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true"
              aria-expanded="false">Create Category</a>
            <div class="dropdown-menu">
              <router-link to="/Create_Department">Department</router-link> <br>
              <router-link to="/Create_Grade">Grade</router-link> <br>
              <router-link to="/Create_Student">Student</router-link> <br>
              <router-link to="/Create_Score">Score</router-link> <br>
              <router-link to="/Create_Subject">Subject</router-link> <br>
            </div>
          </li>
        </ul>
      <!-- </div> -->


      <!-- <div class="collapse navbar-collapse" id="navbarColor01"> -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true"
              aria-expanded="false">List Category</a>
            <div class="dropdown-menu">
              <router-link v-if="isRoleAndLogin==1"  to="/TestDepartment_Detail">Department</router-link> <br>
              <router-link to="/TestGrade_Detail">Grade</router-link> <br>
              <router-link to="/TestStudent_Detail">Student</router-link> <br>
              <router-link  v-if="isRoleAndLogin==1" to="/List_Instructor">Instructor</router-link> <br>
              <router-link to="/Score_List">Score</router-link> <br>
              <router-link to="/Subject_List">Subject</router-link> <br>
            </div>
          </li>
        </ul>

      </div>
      <button v-if="!isLogined" class="btn btn-warning" >
        <router-link  to="/Login_Component">Login</router-link>
      </button>
      <button v-else @click="LogoutFunction" class="btn text-danger">Log Out</button>
    </div>
    <vue-confirm-dialog></vue-confirm-dialog>
  </nav>


/////////cai nay ne
   <ul v-if="isRoleAndLogin==1" class="navbar-nav me-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Create Category</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/Create_Department">Department</router-link> 
            </a>
            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/Create_Grade">Grade</router-link> 
            </a>
            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/Create_Student">Student</router-link>
            </a>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/Create_Score">Score</router-link> 
            </a>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/Create_Subject">Subject</router-link> 
            </a>
          </div>
        </li>

         <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Create Category</a>
          <div class="dropdown-menu">
            </div>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/TestGrade_Detail">Grade</router-link> 
            </a>
            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/TestStudent_Detail">Student</router-link> 
            </a>
            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link  to="/List_Instructor">Instructor</router-link> 
            </a>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/Score_List">Score</router-link> 
            </a>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link to="/Subject_List">Subject</router-link> 
            </a>

            <a class="dropdown-item" href="#" style="text-decoration:none">
              <router-link v-if="isRoleAndLogin==1"  to="/TestDepartment_Detail">Department</router-link> 
            </a>

            </li>

      </ul>