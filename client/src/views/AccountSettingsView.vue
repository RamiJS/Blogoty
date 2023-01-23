<template>
   <section class="flex flex-col lg:py-[30px] lg:px-10 w-full ">
    <h1 class="text-2xl md:text-3xl text-black-300 font-bold pt-5 px-6 md:px-0">
        Public Profile
    </h1>
    <div class="relative self-start pt-6 pb-16">
        <div class="bg-black-100">
            <img class="w-screen relative h-52 opacity-50" src="@/assets/images/banner.jpg" alt="banner">
            <component
                :is="PhotoIcon"
                class="w-7 h-7 absolute top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mr-2 text-white"
                >
            </component>
        </div>
       <div class="bg-black-100 absolute rounded-full bottom-0 left-5">
            <img class="w-[124px] h-[124px] relative opacity-50 rounded-full" :src="userInfo.image" alt="profile img">
            <component
                :is="PhotoIcon"
                class="w-7 h-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mr-2 text-white"
                >
            </component>
        </div>
    </div>

    <div class="grid grid-cols-2 pt-6 gap-5">
        <div class="flex flex-col gap-2">
            <label for="">Username</label>
            <input :value="userInfo.username" type="text" class="p-4 rounded-sm border border-black-300/10 shadow-md">
        </div>
        <div class="flex flex-col gap-2">
            <label for="">Email</label>
            <input :value="userInfo.email" type="text" class="p-4 rounded-sm border border-black-300/10 shadow-md">
        </div>
        <div class="flex flex-col gap-2 col-span-2 pt-4">
            <label for="status">Status</label>
            <textarea :value="userInfo.status" class="p-4 rounded-sm border border-black-300/10 shadow-md" name="status" cols="30" rows="10"></textarea>
        </div>
        <div class="flex flex-col gap-2 pt-4">
            <label for="">Roles</label>
            <input :value="userInfo.roles" disabled type="text" class="p-4 rounded-sm border border-black-300/10 shadow-md">
        </div>
    </div>
  </section>
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios'
import {useRoute} from "vue-router";
import { PhotoIcon } from "@heroicons/vue/24/outline"
export default {
    components: { PhotoIcon },
    setup(){
        const route = useRoute()
        const id = route.params.id;
        const userInfo = ref([''])
        const getUserInfo = async()=>{
            await axios.get(`http://localhost:3000/userInfo/${id}`)
            .then((res) => {
            userInfo.value = res.data
            console.log(userInfo.value);
            })
        }
        getUserInfo()


        return {
            userInfo,
            PhotoIcon
        }
    }
}
</script>

<style>

</style>