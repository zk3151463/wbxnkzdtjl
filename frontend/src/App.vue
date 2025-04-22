<!--
 * @Author: LiBing
 * @Date: 2024-01-30 10:11:35
 * @LastEditTime: 2024-01-30 10:25:03
-->
<template>
  <!--  <div style="overflow: hidden; user-select: none; -webkit-app-region: drag" @contextmenu.prevent>-->
  <div style="overflow: hidden; user-select: none; -webkit-app-region: drag">
    <router-view />
  </div>
</template>
<script>
// import { sendSock } from "@/api/socket.js";
export default {
  name: "App",
  components: {},
  setup() {},
  data() {
    return {
      //    menus: [
      //     {
      //       text: "右击菜单",
      //       subText: "副标题",
      //       action: (el, event, axis, menus, item, isDark) => {
      //         alert("F12 控制台查看点击事件接口可用参数")
      //         console.log("点击的dom", el);
      //         console.log("点击的原生事件", event);
      //         console.log("点击的坐标", axis);
      //         console.log("右击菜单的完整列表信息", menus);
      //         console.log("当前右击菜单信息", item);
      //         console.log("当前右击菜单是否使用夜间模式", isDark);
      //       }
      //     }
      //   ]
    };
  },
  created() {
    document.title = "漫客工具箱";
    // this.init();
    // sendSock('nihao');
    // this.$socketApi.sendSock('as',this.getConfigResult)
    // this.$socketApi.getSock(this.getConfigResult);
  },
  methods: {},
};
</script>
<style lang="less">
* {
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
}

body {
  margin: 0;
  padding: 0;
  // background-color: #fff;
  // border-radius: 100px;
}

html {
  margin: 0;
  padding: 0;
  // box-sizing: border-box;
  font-family: "微软雅黑";
  overflow: hidden;
  background: @v-bg;
}

.icon {
  width: 0.3rem;
  height: 0.3rem;
}

a {
  color: #333;
  text-decoration: none;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-center-modal .ivu-modal {
  top: 0;
}
</style>
