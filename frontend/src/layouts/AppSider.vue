<template>
    <a-layout id="app-layout-sider">
      <a-layout-sider
        v-model="collapsed"
        :theme="isDarkMode ? 'dark' : 'light'"
        class="layout-sider"
        width="15%"
      >
        <div class="logo" :style="{ fontSize: 'var(--font-size)' }">
          <img class="pic-logo" src="~@/assets/logo.png">
          <span class="logo-title" :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">漫客工具箱</span>
        </div>
        <a-menu 
          class="menu-item"
          :theme="isDarkMode ? 'dark' : 'light'"
          mode="inline"
          :selectedKeys="[current]"
          @click="menuHandle"
        >
          <a-menu-item v-for="(menuInfo, index) in menu" :key="index" >
            <icon-font :type="menuInfo.icon" />
            {{ menuInfo.title }} 
          </a-menu-item>
        </a-menu>
        <a-button type="text" @click="toggleDarkMode"  class="setting-button" >
            <span :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
                <SettingOutlined />
            </span>
        </a-button>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="layout-content" :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
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
  
  <style lang="less" scoped>
  #app-layout-sider {
    height: 100%;
    text-align: left;
    .logo {
      border-bottom: 1px solid #e8e8e8;
    }
    .pic-logo {
      height: 32px;
      margin: 10px;
    }
    .layout-sider {
      border-top: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
    }
    .menu-item {
      .ant-menu-item {
        background-color: #fff;
        margin-top: 0px;
        margin-bottom: 0px;
        padding: 0 0px !important;
      }
    }
    .layout-content {
      //background-color: #fff;
    }
    .setting-button {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  .dark-mode {
    background-color: #333;
    color: #fff;
    --font-size: 20px;
  }
  
  .light-mode {
    --font-size: 20px;
  }
  </style>
