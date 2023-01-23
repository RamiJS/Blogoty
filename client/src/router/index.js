import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import UserFeedView from '@/views/UserFeedView.vue'
import SingleBlogView from '@/views/SingleBlogView.vue'
import WriteBlogsView from '@/views/WriteBlogsView.vue'
import BookMarksView from '@/views/BookMarksView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AccountSettingsView from '@/views/AccountSettingsView.vue'
import img from '@/views/SendImage.vue'
import axios from 'axios'
import {useRoute} from "vue-router";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/feed',
    name: 'feed',
    component: UserFeedView,
    beforeEnter: async(to, from) => {
      try {
        const response = await axios.get('http://localhost:3000/checkSession')
        if (response.status === 200) {
          console.log('user is signed in');
        }
      } catch (error) {
        console.log("Error: user is not signed in yet");
        return { name: 'login'}
      }
    }
  },
  {
    path: '/img',
    name: 'img',
    component: img,
    
  },
  {
    path: '/feed/:id',
    name: 'blog',
    component: SingleBlogView,
    props: route => ({
      id: route.params.id
    }),
  },
  {
    path: '/writeblog',
    name: 'writeview',
    component: WriteBlogsView,
    beforeEnter: async(to, from) => {
      try {
        const response = await axios.get('http://localhost:3000/checkSession')
        if (response.status === 200) {
          console.log('user is signed in');
        }
      } catch (error) {
        console.log("Error: user is not signed in yet");
        return { name: 'login'}
      }
    }
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: BookMarksView,
    props: true,
    beforeEnter: async(to, from) => {
      try {
        const response = await axios.get('http://localhost:3000/checkSession')
        if (response.status === 200) {
          console.log('user is signed in');
        }
      } catch (error) {
        console.log("Error: user is not signed in yet");
        return { name: 'login'}
      }
    }
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfileView,
    props: route => ({
      id: route.params.id
    }),
  },
  {
    path: '/settings/:id',
    name: 'settings',
    component: AccountSettingsView,
    props: route => ({
      id: route.params.id
    }),
    beforeEnter: async(to, from) => {
      const currentRoute = to.params.id;
      try {
        await axios.get('http://localhost:3000/checkSession')
        .then((res) =>{
          let user = res.data
          if(user.id === currentRoute) {
            console.log('users match');
          } else {
            console.log('users do not match');
            router.push({name: 'feed'})
          }
        })
      } catch (error) {
        console.log("Error: user is not signed in yet");
        return { name: 'feed'}
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
