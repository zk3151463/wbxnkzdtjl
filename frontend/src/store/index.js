import { createStore } from "vuex";
import api from "@/api/index.js";

export default createStore({
  state: {
    playCurrentIndex: 0,
    lyric: "",
    currentTime: 0,
    intervalId: 0,
    logintype: false,
    buytype: false,
    secretkey: "8ccf48181bc843ad0b26053c7dee8ed6",
    user: {},
  },
  getters: {},
  mutations: {},
  modules: {},
});
