<template>
   <form @submit.prevent="updateUserInfo" class="flex flex-col lg:py-[30px] lg:px-10 w-full ">
    <h1 class="text-2xl md:text-3xl text-black-300 font-bold pt-5 px-6 md:px-0">
        Public Profile
    </h1>
    <div class="relative self-start pt-6 pb-16">
        <div class="bg-black-100">
            <img class="w-screen object-cover relative h-40 xl:h-52 opacity-50" src="@/assets/images/banner.jpg" alt="banner">
            <span class="absolute top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black-300/50 p-4">
                <component
                    :is="PhotoIcon"
                    class="w-7 h-7 text-white"
                    >
                </component>
            </span>
        </div>
       <div class="bg-black-100 absolute rounded-full bottom-4 xl:bottom-0 left-5">
            <img class="w-[96px] h-[96px] xl:w-[124px] xl:h-[124px] relative opacity-50 rounded-full object-cover" :src="userInfo.image" alt="profile img">
            <input @change="updateImg" ref="imgfile" accept="image/jpeg" class="hidden" type="file" name="imgfile" id="imgfile">
            <label for="imgfile" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black-300/50 cursor-pointer p-3">
                <component
                    :is="PhotoIcon"
                    class="w-7 h-7 text-white "
                    >
                </component>
            </label>
        </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 px-2 xl:px-0 py-6 gap-5">
        <div class="flex col-span-2 xl:col-span-1 flex-col gap-2">
            <label for="">Username</label>
            <input v-model="userInfo.username" type="text" class="p-4 rounded-sm border border-black-300/10 shadow-md outline-purple">
        </div>
        <div class="flex flex-col col-span-2 xl:col-span-1 gap-2">
            <label for="">Email</label>
            <input v-model="userInfo.email" type="text" class="p-4 rounded-sm border border-black-300/10 shadow-md outline-purple">
        </div>
        <div class="flex flex-col  gap-2 col-span-2 pt-4">
            <label for="status">Status</label>
            <textarea v-model="userInfo.status" class="p-4 rounded-sm border border-black-300/10 shadow-md outline-purple" name="status" cols="30" rows="10"></textarea>
        </div>
        <div class="flex flex-col col-span-2 xl:col-span-1 gap-2 pt-4">
            <label for="">Roles</label>
            <input v-model="userInfo.roles" disabled type="text" class="p-4 rounded-sm border border-black-300/10 shadow-md outline-purple">
        </div>
        <div class="place-self-end col-span-2 xl:col-span-1 pt-4">
            <button class="py-4 px-14 bg-purple text-white text-base font-semibold">Save</button>
        </div>
    </div>
</form>
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
        const imgfile = ref(null)
        const userInfo = ref({
            username: "",
            email: "",
            image: "",
            status: "",
            roles: "",
            id: ""
        })
        const getUserInfo = async()=>{
            await axios.get(`http://localhost:3000/userInfo/${id}`)
            .then((res) => {
                const {username, email, image, status, roles, id} = res.data;
                userInfo.value.username = username;
                userInfo.value.email = email;
                userInfo.value.image = image;
                userInfo.value.status = status;
                userInfo.value.roles = roles;
                userInfo.value.id = id;
            })
        }
        getUserInfo()



        const config = {
        headers: {
        "Content-Type": "Content-Type: multipart/form-data"
        },
        withCredentials: true
        }

        const updateUserInfo = async()=>{
            const formData = new FormData();
            formData.append('username', userInfo.value.username);
            formData.append('imgfile', imgfile.value.files[0]);
            formData.append('email', userInfo.value.email);
            formData.append('status', userInfo.value.status);

            try {
                await axios.patch(`http://localhost:3000/update/${userInfo.value.id}`,
                formData,
                config)
                .then(response => {
                console.log(response);
            }) 
        } catch(err) {
            console.log(err);
        }
        }

        const updateImg = (event) => {
            const file = event.target.files[0];
            userInfo.value.image = URL.createObjectURL(file);
        }


        return {
            userInfo,
            PhotoIcon,
            updateUserInfo,
            imgfile,
            updateImg
        }
    }
}
</script>

<style>

</style>