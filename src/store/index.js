import { getUserList } from "@/api";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userList: [],
  },
  getters: {
    getUserList(state) {
      return state.userList;
    },
  },
  mutations: {
    // 自定义函数
    initUserList(state, value) {
      state.userList = value;
    },
  },
  actions: {
    getUserList(context) {
      // console.log(axios);
      axios.get("/goods/list").then((res) => {
        // res.list  返回的值  希望给到state里的list
        // 修改state的唯一合法方案 通过mutaions
        context.commit("initUserList", res.list);
      });
    },
  },
  modules: {},
});
