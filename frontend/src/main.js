import {
	createApp
} from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css';
import App from './App.vue'
import router from './router'
import store from './store'
// import IpcRenderer from '@/utils/ipcRenderer'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './theme/index.less';
// import * as socketApi from '@/api/socket.js'
import ContextMenu from "web-contextmenu";

// import vue3videoPlay from 'vue3-video-play' // 引入组件
// import 'vue3-video-play/dist/style.css' // 引入css


const app = createApp(App)
app.use(ContextMenu);
// app.config.globalProperties.$socketApi = socketApi
app.use(store)
	.use(ViewUIPlus)
	.use(router)
	// .use(IpcRenderer)
	// .use(vue3videoPlay)
	.mount('#app')