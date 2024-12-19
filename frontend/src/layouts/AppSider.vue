<template>
    <div :class="{'dark': isDarkMode}" class="w-full h-full">
      <div class="flex flex-no-wrap">
        <!-- Sidebar starts -->
        <div class="flex w-64 absolute lg:relative bg-white dark:bg-gray-800  border-r border-gray-200 dark:border-[#8a929b] shadow {-- h-screen --} flex-col justify-between hidden lg:flex">
              <div class="flex-1 px-8">
                  <div class="pt-4 w-full flex items-center">
                      <div class="text-gray-900 text-lg dark:text-gray-200">漫客工具箱</div>
                  </div>
                  <ul class="mt-8">
                      <li class="flex w-full justify-between text-indigo-700 dark:text-gray-300 cursor-pointer items-center mb-6">
                          <a href="javascript:void(0)" class="flex items-center">
                              <span class="text-sm">框架</span>
                          </a>
                          <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">5</div>
                      </li>
                      <li class="flex w-full justify-between text-indigo-700 dark:text-gray-300 cursor-pointer items-center mb-6">
                          <a href="javascript:void(0)" class="flex items-center">
                              <span class="text-sm">框架1</span>
                          </a>
                          <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">5</div>
                      </li>
                      <li class="flex w-full justify-between text-gray-600 hover:text-indigo-700 dark:text-gray-300 cursor-pointer items-center mb-6">
                          <a href="javascript:void(0)" class="flex items-center">
                              <span class="text-sm">系统</span>
                          </a>
                          <div class="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">8</div>
                      </li>
                      
                  </ul>
              </div>
              <div class="flex flex-shrink-0 border-t border-gray-200 dark:border-[#8a929b] p-4">
                <a href="#" class="group block w-full flex-shrink-0">
                  <div class="flex items-center">
                    <div @click="toggleDarkMode">
                      <svg v-if="!isDarkMode" class="icon inline-block h-9 w-9 rounded-full" t="1734155805984" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3131" width="48" height="48"><path d="M935.538601 630.40178c-11.43005-11.432249-28.673759-14.738607-43.531086-8.353536-46.733115 20.10317-96.362866 30.296859-147.50719 30.296859-99.589478 0-193.221796-38.783705-263.640252-109.20316-108.636744-108.636744-139.609745-270.022125-78.9083-411.148441 6.388069-14.85233 3.078713-32.098837-8.353536-43.532285-11.432249-11.432249-28.675758-14.743604-43.532285-8.354536-52.637312 22.64025-100.017388 54.809439-140.82552 95.616372-85.346135 85.346135-132.346869 198.821199-132.346869 319.519766 0 120.699566 47.001733 234.172631 132.347868 319.518766s198.821199 132.349067 319.517567 132.349067c120.699566 0 234.172431-47.002932 319.520765-132.351066 40.808132-40.810131 72.977122-88.190207 95.615373-140.82552C950.282205 659.081735 946.971849 641.834029 935.538601 630.40178z" fill="#707070" p-id="3132"></path></svg>
                      <svg v-else t="1734156667096" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5456" width="31" height="31"><path d="M512 256a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 0-85.333334 0v85.333333a42.666667 42.666667 0 0 0 42.666667 42.666667zM896 469.333333h-85.333333a42.666667 42.666667 0 0 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 0-85.333334zM256 512a42.666667 42.666667 0 0 0-42.666667-42.666667H128a42.666667 42.666667 0 0 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 42.666667-42.666667zM265.386667 213.333333a42.666667 42.666667 0 0 0-59.306667 62.72l61.44 59.306667a42.666667 42.666667 0 0 0 31.146667 11.946667 42.666667 42.666667 0 0 0 30.72-13.226667 42.666667 42.666667 0 0 0 0-60.16zM725.333333 347.306667a42.666667 42.666667 0 0 0 29.44-11.946667l61.44-59.306667A42.666667 42.666667 0 0 0 758.613333 213.333333l-61.44 60.586667a42.666667 42.666667 0 0 0 0 60.16 42.666667 42.666667 0 0 0 28.16 13.226667zM512 768a42.666667 42.666667 0 0 0-42.666667 42.666667v85.333333a42.666667 42.666667 0 0 0 85.333334 0v-85.333333a42.666667 42.666667 0 0 0-42.666667-42.666667zM756.48 688.64a42.666667 42.666667 0 0 0-59.306667 61.44L758.613333 810.666667a42.666667 42.666667 0 0 0 29.44 11.946666 42.666667 42.666667 0 0 0 30.72-12.8 42.666667 42.666667 0 0 0 0-60.586666zM267.52 688.64l-61.44 59.306667a42.666667 42.666667 0 0 0 0 60.586666 42.666667 42.666667 0 0 0 30.72 12.8 42.666667 42.666667 0 0 0 28.586667-10.666666l61.44-59.306667a42.666667 42.666667 0 0 0-59.306667-61.44zM512 341.333333a170.666667 170.666667 0 1 0 170.666667 170.666667 170.666667 170.666667 0 0 0-170.666667-170.666667z" p-id="5457" fill="#ffffff"></path></svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900">Tom Cook</p>
                      <p class="text-xs font-medium text-gray-500 dark:text-gray-300 group-hover:text-gray-700">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
          </div>  
        <!-- Sidebar end -->
         <div class="w-full">
            <div class="container mx-auto py-10 px-6 h-full dark:bg-gray-800">
                <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
                <div class="w-full h-full rounded border-gray-300">
                    <!-- Place your content here -->
                    <router-view />
                </div>
            </div>
         </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppSider',
    data() {
      return {
        collapsed: true,
        current: 'menu_1',
        menu: {
          'menu_1' : {
            icon: 'icon-fengche',
            title: '框架',
            pageName: 'Bosscollection',
            params: {
              // test: 'hello'
            },
          },
          'menu_2' : {
            icon: 'icon-niudan',
            title: '系统',
            pageName: 'Bossdelivery',
            params: {},
          },
        },
        isDarkMode: false,
      };
    },
    created () {
      this.listenSystemTheme();
    },
    mounted () {
      this.menuHandle()
    },
    methods: {
      menuHandle (e) {
        console.log('sider menu e:', e);
        this.current = e ? e.key : this.current;
        console.log('sider menu current:', this.current);
  
        const linkInfo = this.menu[this.current]
        console.log('[home] load linkInfo:', linkInfo);
        this.$router.push({ name: linkInfo.pageName, params: linkInfo.params})
      },
      changeMenu(e) {
        console.log('sider menu e:', e);
        //this.current = e.key;
      },
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
      },
      listenSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          this.isDarkMode = e.matches;
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* This example part of kwd-dashboard see https://kamona-wd.github.io/kwd-dashboard/ */
  /* So here we will write some classes to simulate dark mode and some of tailwind css config in our project */
:root {
--light: #edf2f9;
--dark: #152e4d;
--darker: #12263f;
}

.dark .dark\:text-light {
color: var(--light);
}

.dark .dark\:bg-dark {
background-color: var(--dark);
}

.dark .dark\:bg-darker {
background-color: var(--darker);
}

.dark .dark\:text-gray-300 {
color: #d1d5db;
}

.dark .dark\:text-indigo-500 {
color: #6366f1;
}

.dark .dark\:text-indigo-100 {
color: #e0e7ff;
}

.dark .dark\:hover\:text-light:hover {
  color: var(--light);
}

.dark .dark\:border-indigo-800 {
border-color: #3730a3;
}

.dark .dark\:border-indigo-700 {
border-color: #4338ca;
}

.dark .dark\:bg-indigo-600 {
background-color: #4f46e5;
}

.dark .dark\:hover\:bg-indigo-600:hover {
background-color: #4f46e5;
}

.dark .dark\:border-indigo-500 {
border-color: #6366f1;
}

.hover\:overflow-y-auto:hover {
overflow-y: auto;
}

</style>
