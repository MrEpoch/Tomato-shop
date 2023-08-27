<div class="flex dark:bg-black/90 dark:text-white/90 justify-center gap-[3rem] flex-col bg-gray-100/40 p-3 items-center min-h-screen">
    <h1 class="sm:text-5xl text-2xl mb-6 font-thin">Update Password</h1>
    <form class="max-w-[500px] dark:bg-black/20 w-full shadow bg-white mb-[5rem] relative rounded p-[2rem] sm:p-[5rem] flex flex-col gap-[3rem]" method="POST">
       <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-0 dark:text-white/80 left-0 translate-y-[-50px] translate-x-[10px] w-[70px] sm:w-[100px] " viewBox="0 0 24 24"><title>shield-account</title><path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" /></svg>
       <div class="flex flex-col gap-[1rem]">
           <label for="email">Email</label>
           <input type="email" name="email" class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3" id="email" placeholder="Email" />
       </div>
       <div class="flex flex-col gap-[1rem]">
           <label for="password">Current Password</label>
           <input type="password" name="password" class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3" id="password" placeholder="Current Password" />
       </div>
       <div class="flex flex-col gap-[1rem]">
           <label for="password">New Password</label>
           <input type="password" name="newPassword" class="dark:bg-black/10 outline-none border-[1px] border-gray-600/50 rounded-[10px] p-3" id="password" placeholder="New Password" />
       </div>
        <div class="flex justify-center">
            <button type="submit" class="py-2 p-8 rounded-[6px] bg-black text-white font-light text-sm sm:text-lg hover:bg-gray-800 transition-all">Update Password</button>
        </div>
    </form>
</div>
