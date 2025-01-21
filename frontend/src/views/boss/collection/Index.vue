<template>
    <div id="app-base-socket-ipc">
      <div class="one-block-1">
        <span>
          1. 发送异步消息
        </span>
      </div>  
      <div class="one-block-2">
        <a-space>
          <a-button @click="handleInvoke">发送 - 回调</a-button>
          结果：{{ message1 }}
        </a-space>
        <p></p>
        <a-space>
          <a-button @click="handleInvoke2">发送 - async/await</a-button>
          结果：{{ message2 }}
        </a-space>            
      </div>   
      <div class="one-block-1">
        <span>
          <!-- 尽量不要使用，任何错误都容易引起卡死 -->
          2. 同步消息（不推荐，阻塞执行）
        </span>
      </div>  
      <div class="one-block-2">
        <a-space>
          <a-button @click="handleSendSync">同步消息</a-button>
          结果：{{ message3 }}
        </a-space>   
      </div>        
      <div class="one-block-1">
        <span>
          3. 长消息： 服务端持续向前端页面发消息
        </span>
      </div>  
      <div class="one-block-2">
        <a-space>
          <a-button @click="sendMsgStart">开始</a-button>
          <a-button @click="sendMsgStop">结束</a-button>
          结果：{{ messageString }}
        </a-space>
      </div>
      <div class="one-block-1">
        <span>
          4. 多窗口通信：子窗口与主进程通信，子窗口互相通信
        </span>
      </div>  
      <div class="one-block-2">
        <a-space>
          <a-button @click="createWindow(0)">打开新窗口2</a-button>
          <a-button @click="sendTosubWindow()">向新窗口2发消息</a-button>
        </a-space>
      </div>      
    </div>
  </template>
  <script>
  import { toRaw } from 'vue';
  
  export default {
    data() {
      return {
        messageString: '',
        message1: '',
        message2: '',
        message3: '',
        windowName: 'window-ipc',
        newWcId: 0,
        views: [
          {
            type: 'vue',
            content: '#/special/subwindow',
            windowName: 'window-ipc',
            windowTitle: 'ipc window'
          },    
        ],
      }
    },
    mounted () {
    //   this.init();
    },
    methods: {
    init () {

    },
      sendMsgStart() {
        const params = {
          type: 'start',
          content: '开始'
        }
      },
      sendMsgStop() {
        const params = {
          type: 'end',
          content: ''
        }
      },
      handleInvoke() {
        ipc.emit('go-on-event-demo', ['传递的数据'])
       
      },
      async handleInvoke2() {
      
      },
      handleSendSync() {
      },
      createWindow(index) {
       
      },
      async sendTosubWindow() {
       
      },
    }
  }
  </script>
  <style lang="less" scoped>
  #app-base-socket-ipc {
    padding: 0px 10px;
    text-align: left;
    width: 100%;
    .one-block-1 {
      font-size: 16px;
      padding-top: 10px;
    }
    .one-block-2 {
      padding-top: 10px;
    }
  }
  </style>
  