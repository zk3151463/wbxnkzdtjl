import {
  createRouter,
  createWebHistory
} from "vue-router";
import layouts_index from "../layouts/layouts_index.vue";
import {
  getImgUrl
} from "../utils/tools"

const routes = [{
    path: "/",
    component: layouts_index,
    meta: {
      title: "首页"
    },
    children: [{
      path: "/",
      name: "home",
      component: () => import("@/views/index.vue"),
      meta: {
        title: "首页",
        home: true
      },
    }, ],
  },
  {
    path: "/douyin",
    name: "douyin",
    component: layouts_index,
    meta: {
      title: "抖音系黑科技"
    },
    children: [{
        path: "home",
        name: "taobaoCopyhome",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "抖音系黑科技",
          icon: getImgUrl("image/caiji.png"),
          content: "",
        },
      },
      {
        path: "videoDownload",
        name: "videoDownload",
        component: () => import("@/views/babyCopy/taobaoCopy.vue"),
        meta: {
          title: "达人采集",
          window: true,
          url: "videoDownload",
          icon: getImgUrl("image/caiji.png"),
          content: "全自动邀约达人，每天触达5000+，采集手机号、微信号等功能",
          app_id: 4,
          width: 1150,
          height: 760
        },
      },
      {
        path: "videoDownload1",
        name: "videoDownload1",
        component: () => import("@/views/douyin/videoDownload.vue"),
        meta: {
          title: "抖音视频下载",
          window: true,
          url: "videoDownload1",
          icon: getImgUrl("image/caiji.png"),
          content: "全自动邀约达人，每天触达5000+，采集手机号、微信号等功能",
          app_id: 4,
          width: 1150,
          height: 760
        },
      },

    ],
  },

  {
    path: "/exponentialReduction",
    name: "exponentialReduction",
    component: layouts_index,
    meta: {
      title: "电商工具"
    },
    children: [

      {
        path: "home",
        name: "exponentialReduction1",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "电商工具",
          icon: getImgUrl("image/caiji.png"),
          content: "电商工具",
        },
      },
      {
        path: "exponentialReductionhome",
        name: "exponentialReductionhome",
        component: () => import("@/views/exponential/exponential.vue"),
        meta: {
          title: "指数还原",
          url: "exponentialReductionhome",

          icon: getImgUrl("image/caiji.png"),
          content: "全自动邀约达人，每天触达5000+，采集手机号、微信号，招商报名等功能",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes,
});

export default router;