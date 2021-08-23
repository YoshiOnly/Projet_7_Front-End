import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Signup from '../views/signup.vue'
import Messagerie from '../views/messagerie.vue'
import Create from '../views/Create.vue'
import Comment from '../views/Comment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/messagerie',
    name: 'messagerie',
    component: Messagerie
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment
  },
  {
    path: "/Admin",
    name: "Admin",
    component: () => import("../views/Admin"),
},
{
    path: "/Compte",
    name: "Compte",
    component: () => import("../views/Compte"),
},
{
  path: "/CommentsList",
  name: "CommentsList",
  component: () => import("../views/CommentsList"),
},
{
  path: "/CreateComment",
  name: "CreateComment",
  component: () => import("../views/CreateComment"),
},
{
  path: "/UsersList",
  name: "UsersList",
  component: () => import("../views/UsersList")
}
]

const router = new VueRouter({
  routes
})

export default router
