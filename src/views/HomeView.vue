<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{ title }}</h1>
    <button @click="fetchUserList">get userList</button>
    <el-table :data="userList" style="width: 100%" max-height="400">
      <el-table-column fixed type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="name" width="150"> </el-table-column>
      <el-table-column prop="phone" label="phone" width="150">
      </el-table-column>
      <el-table-column prop="username" label="username" width="150">
      </el-table-column>
      <el-table-column prop="website" label="website" width="150">
      </el-table-column>
      <el-table-column prop="email" label="email" width="300">
      </el-table-column>
      <el-table-column prop="address.city" label="address-city" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, userList)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <hr />
    <button @click="addUser">addUser</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getUserList, createUser, deleteUser } from "@/api";
import axios from "axios";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      title: "用户列表",
      userList: [],
    };
  },
  methods: {
    async addUser() {
      const userInfo = {
        address: { city: "beijing" },
        company: "dd",
        email: "@qq.com",
        name: "caroline",
        phone: "9999999",
        username: "caroline",
        website: "caroline.net",
      };
      try {
        const newUser = await createUser(userInfo);
        console.log(newUser);

        this.userList.push(newUser);
      } catch (error) {
        this.errorMessage = "Failed to add user. Please try again later."; // 错误提示
      }
    },

    deleteRow(index, rows) {
      this.delUser(this.userList[index].id);
      rows.splice(index, 1);
    },
    async delUser(uid) {
      const res = await deleteUser(uid);
      console.log(res);
    },
    async fetchUserList() {
      try {
        const uList = await getUserList(); // 调用 API 获取数据
        this.userList = uList;
      } catch (error) {
        this.errorMessage = "Failed to load user list. Please try again later."; // 错误提示
      }
    },
  },
};
</script>
