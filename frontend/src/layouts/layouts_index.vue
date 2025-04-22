<template>
  <div>
    <!-- <Header class="layout-header" style="--wails-draggable: drag">
      <div
        style="
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        "
        class="head_right"
      >
        <buy></buy>
        <login></login>
      </div>
    </Header> -->
    <Layout style="-webkit-app-region: no-drag">
      <Sider class="layout-sider" hide-trigger>
        <div style=""></div>
        <div
          class="left_list"
          v-if="$route.name == $route.matched[0].children[0].name"
          style="-webkit-app-region: no-drag"
        >
          <div>
            <div style="">
              <img
                src="@/assets/image/logo.png"
                alt=""
                style="width: 90%; -webkit-user-drag: none"
              />
            </div>
            <div>
              <div
                style="display: flex; padding: 10px; align-items: center"
                v-for="(item, index) in leftlist"
                :key="index"
                :class="
                  $route.matched[0].meta.title == item.title ? 'q1' : 'q2'
                "
                @click="gourl(item.name)"
              >
                <img
                  :src="item.icon"
                  alt=""
                  style="width: 15%; -webkit-user-drag: none"
                />
                <div class="left_title">{{ item.title }}</div>
              </div>
            </div>
          </div>
          <div style="width: 100%">
            <!-- <img src="@/assets/image/left_foot.png" alt=""
                            style="width: 100%;border-radius: 10px;height: 35vh;" /> -->
            <div style="text-align: center; font-size: 10px">
              © {{ new Date().getFullYear() }}
            </div>
          </div>
        </div>
        <div class="left_list" v-else style="overflow-y: scroll; height: 100vh">
          <div>
            <div class="goindex" @click="gourl('home')">
              <Icon type="ios-arrow-back" />首页
            </div>
            <div style="height: 43vh; overflow: scroll">
              <div
                style="display: flex; padding: 10px; align-items: center"
                v-for="(item, index) in $route.matched[0].children.slice(1)"
                :key="index"
                :class="$route.name == item.name ? 'q1' : 'q2'"
                @click="gourl(item.name)"
              >
                <img
                  :src="item.meta.icon"
                  alt=""
                  style="
                    width: 15%;
                    -webkit-user-drag: none;
                    border-radius: 10px;
                  "
                />
                <div class="left_title">{{ item.meta.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </Sider>
      <Content class="layout-content">
        <router-view />
      </Content>
    </Layout>
    <div class="demo-register"></div>
  </div>
</template>
<script>

import login from "@/components/login.vue";
import buy from "@/components/buy.vue";

import { getImgUrl } from "../utils/tools";
export default {
  name: "Head",
  components: {
    login,
    buy,
  },
  data() {
    return {
      leftlist: [
        {
          title: "首页",
          name: "home",
          icon: getImgUrl("icon/a-mubiaodaohang.png"),
        },
        {
          title: "抖音黑科技",
          name: "taobaoCopyhome",
          icon: getImgUrl("icon/a-shangdiandianpu.png"),
        },
        {
          title: "电商工具",
          name: "exponentialReduction1",
          icon: getImgUrl("icon/shujuzhanshi.png"),
        },
      ],
      version: "08",
    };
  },

  mounted() {},
  methods: {
    gourl(name) {
      console.log(name);
      this.$router.push({ name: name });
    },
  },
};
</script>
<style lang="less" scoped>
.goindex {
  color: @v-bg-title;
  font-weight: 500;
  margin-bottom: 10px;
}

.q1 {
  color: @v-bg-title;
  background-color: @v-bg-left-box;
  border-radius: 5px;
}

.q2 {
  color: @v-bg-title-hover;

  // background-color: #434449;
}

.q2:hover {
  background-color: @v-bg-left-box-hover;
  border-radius: 5px;
}

.left_title {
  // color: #fFFFFF;
  margin-left: 10px;
  font-weight: 500;
  font-size: 1rem;
}

.left_list {
  background-color: @v-bg-left;
  height: calc(100vh - 0px);
  padding: 0 8%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.layout-header {
  height: 40px;
}

.layout-content {
  background: @v-bg;
}

.ivu-layout-header {
  padding: 0;
  background-color: @v-bg-left;
  line-height: 40px;
}

.layout-sider {
  background: @v-bg;
  -webkit-user-drag: none;
  // min-height: 120px;
  width: 20%;
  // line-height: 120px;
}

.head_right {
  margin-left: 200px;
  background-color: @v-bg;
}
</style>
