<script lang="ts">
    export let data;
    let user_data: any = data.user
</script>


<div class="h-screen w-full flex flex-col">
    <div class="flex flex-col mt-14 items-center gap-[5rem] w-full">
        <h2 class="text-5xl font-light text-gray-800">Welcome, {user_data.fullName}</h2>
        <form method="POST" action="?/fullName" class="flex w-full flex-col items-center gap-4">
            <label for="name" class="text-2xl font-light text-gray-800">Full Name</label>
            <div class="flex w-full justify-center items-center gap-5">
                <input value={user_data.fullName} type="text" name="fullName" class="mt-4 w-1/4 border-2 border-gray-800 rounded-lg p-2" placeholder="Full Name">
                <button class="mt-4 w-10 h-10 border-2 hover:bg-red-500 duration-300 border-gray-800 rounded-lg p-2 text-center" type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pen-plus</title><path d="M20.7,7C20.4,7.4 20,7.7 20,8C20,8.3 20.3,8.6 20.6,9C21.1,9.5 21.6,9.9 21.5,10.4C21.5,10.9 21,11.4 20.5,11.9L16.4,16L15,14.7L19.2,10.5L18.2,9.5L16.8,10.9L13,7.1L17,3.3C17.4,2.9 18,2.9 18.4,3.3L20.7,5.6C21.1,6 21.1,6.7 20.7,7M3,17.2L12.6,7.6L16.3,11.4L6.8,21H3V17.2M7,2V5H10V7H7V10H5V7H2V5H5V2H7Z" /></svg></button>
            </div>
        </form>
        <form method="POST" action="?/email" class="flex w-full flex-col items-center gap-4">
            <label for="name" class="text-2xl font-light text-gray-800">Email</label>
            <div class="flex w-full justify-center items-center gap-5">
                <input value={user_data.email} type="text" name="email" class="mt-4 w-1/4 border-2 border-gray-800 rounded-lg p-2" placeholder="Email">
                <button class="mt-4 w-10 h-10 border-2 hover:bg-red-500 duration-300 transition-all border-gray-800 rounded-lg p-2 text-center" type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pen-plus</title><path d="M20.7,7C20.4,7.4 20,7.7 20,8C20,8.3 20.3,8.6 20.6,9C21.1,9.5 21.6,9.9 21.5,10.4C21.5,10.9 21,11.4 20.5,11.9L16.4,16L15,14.7L19.2,10.5L18.2,9.5L16.8,10.9L13,7.1L17,3.3C17.4,2.9 18,2.9 18.4,3.3L20.7,5.6C21.1,6 21.1,6.7 20.7,7M3,17.2L12.6,7.6L16.3,11.4L6.8,21H3V17.2M7,2V5H10V7H7V10H5V7H2V5H5V2H7Z" /></svg></button>
            </div> 
        </form>
        <div class="flex w-full flex-col items-center gap-4">
            <a href="/password-change" class="mt-4 flex items-center text-lg py-2 border-2 border-gray-800 rounded-lg p-4 text-center">
                Change Password
                <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-right</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
            </a>
        </div>
    </div>
</div>
