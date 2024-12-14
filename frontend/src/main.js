import * as AntIcon from '@ant-design/icons-vue';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/global.less';
import components from './components/global';
import Router from './router/index';
import Antd from 'ant-design-vue';
import './assets/theme.less';
import 'ant-design-vue/dist/reset.css';

// 创建主题管理
const themeManager = {
  // 检查系统主题
  isSystemDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },
  // 设置主题
  setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  },
  // 监听系统主题变化
  watchSystemTheme(enabled) {
    if (enabled) {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => this.setTheme(e.matches));
    }
  }
};

// 响应式字体大小管理
const fontManager = {
  setBaseFontSize() {
    const width = window.innerWidth;
    let fontSize;
    if (width < 768) {
      fontSize = 14;
    } else if (width < 1024) {
      fontSize = 16;
    } else {
      fontSize = 18;
    }
    document.documentElement.style.fontSize = `${fontSize}px`;
  },
  init() {
    this.setBaseFontSize();
    window.addEventListener('resize', () => this.setBaseFontSize());
  }
};

const app = createApp(App);
app.config.productionTip = false;

// 注册全局组件
for (const i in components) {
  app.component(i, components[i]);
}

// 注册图标组件
for (const i in AntIcon) {
  const whiteList = ['createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor', 'default'];
  if (!whiteList.includes(i)) {
    app.component(i, AntIcon[i]);
  }
}

// 初始化主题和字体
fontManager.init();

// 将主题管理器添加到全局属性
app.config.globalProperties.$themeManager = themeManager;

app.use(Antd).use(Router).mount('#app');

// 导出主题管理器供其他组件使用
export { themeManager };