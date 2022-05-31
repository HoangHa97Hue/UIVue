import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestDepartment_Detail from '@/components/TestList/TestDepartment_Detail.vue'
import TestGrade_Detail from '@/components/TestList/TestGrade_Detail.vue'
import TestStudent_Detail from '@/components/TestList/TestStudent_Detail.vue'
import Instructor_List from '@/components/Instructor/InstructorList.vue'
import Subject_List from '@/components/Subject/SubjectList.vue'
import Student_List from '@/components/Student/StudentList.vue'
import Score_List from '@/components/Score/ScoreList.vue'
import Grade_List from '@/components/Grade/GradeList.vue'
import Create_Department from '@/components/Department/CreateDepartment.vue'
import Create_Grade from '@/components/Grade/CreateGrade.vue'
import Create_Instructor from '@/components/Instructor/CreateInstructor.vue'
import Create_Student from '@/components/Student/CreateStudent.vue'
import Create_Score from '@/components/Score/CreateScore.vue'
import Create_Subject from '@/components/Subject/CreateSubject.vue'
import LoginComponent from '@/components/Login/LoginComponent.vue'
import RegisterComponent from '@/components/Login/RegisterComponent.vue'
import RegisterComponentSignUp from '@/components/Login/RegisterComponentSignUp.vue'
import LoginComponentSignUp from '@/components/Login/LoginComponentSignUp.vue'

import CreateStudentRegisterSignUp from '@/components/Student/CreateStudentRegisterSignUp.vue'
import EnrollSubject from '@/components/Subject/EnrollSubject.vue'
import { Role } from '@/components/Role/Role';
// import { from } from 'core-js/core/array'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/TestDepartment_Detail',
    name: 'TestDepartment_Detail',
    component: TestDepartment_Detail,
    meta: { authorize: [Role.Admin] }

  },
  {
    path: '/TestGrade_Detail',
    name: 'TestGrade_Detail',
    component: TestGrade_Detail,
    meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/TestStudent_Detail',
    name: 'TestStudent_Detail',

    component: TestStudent_Detail,
    meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/List_Instructor',
    name: 'List_Instructor',

    component: Instructor_List,
    meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/Subject_List',
    name: 'Subject_List',

    component: Subject_List,
    meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/Score_List',
    name: 'Score_List',

    component: Score_List,
    meta: { authorize: [Role.Admin, Role.User] }
  }, {
    path: '/Create_Department',
    name: 'Create_Department',

    component: Create_Department,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/Create_Grade',
    name: 'Create_Grade',
    component: Create_Grade,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/Create_Student',
    name: 'Create_Student',
    component: Create_Student,
    // meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/Create_Score',
    name: 'Create_Score',
    component: Create_Score,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/Create_Subject',
    name: 'Create_Subject',
    component: Create_Subject,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/Login_Component',
    name: 'Login_Component',
    component: LoginComponent,
  },
  {
    path: '/Register_Component',
    name: 'Register_Component',
    component: RegisterComponent,
  },
  {
    path: '/Student_List',
    name: 'Student_List',
    component: Student_List,
    meta: { authorize: [Role.Admin, Role.User] }
  }
  ,
  {
    path: '/Grade_List',
    name: 'Grade_List',
    component: Grade_List,
    // meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/Create_Instructor',
    name: 'Create_Instructor',
    component: Create_Instructor,
    // meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/Register_Component_SignUp',
    name: 'Register_Component_SignUp',
    component: RegisterComponentSignUp,
    // meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/Login_Component_SignUp',
    name: 'Login_Component_SignUp',
    component: LoginComponentSignUp,
    // meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/Create_Student_Register_SignUp',
    name: 'Create_Student_Register_SignUp',
    component: CreateStudentRegisterSignUp,
    meta: { authorize: [Role.Admin, Role.User] }
  },
  {
    path: '/Enroll_Subject',
    name: 'Enroll_Subject',
    component: EnrollSubject,
    meta: { authorize: [Role.Admin, Role.User] }
  },
  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const {path} = to.path;
  const currentUserID = localStorage.getItem('userID');
  const role = localStorage.getItem('role');
  console.log('role now: ' + role)
  console.log('userID now: ' + currentUserID)


  if (authorize) {
    if (!currentUserID) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/Login_Component', query: { returnUrl: to.path } });
  }

  // if(currentUserID){
  //   return next({ path: '/' });
  // }

    if (authorize.length && !authorize.includes(role) && path === '/Create_Student_Register_SignUp') {

      return next({ path: '/Create_Student_Register_SignUp' });
    }
     else if (authorize.length && !authorize.includes(role)) {
      // role not authorised so redirect to home page
      console.log('You dont have role to access this function page')
      return next({ path: '/' });
    }

    
  }

  return next();


})

export default router
