<template>
  <div class="about">
    <h1>分页加载</h1>
    <div class="block">
      <button @click="fetchUserList((page = currentPage), (size = pageSize))">
        get userList
      </button>
      <el-table :data="userList" style="width: 100%" max-height="400">
        <el-table-column fixed type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="name"> </el-table-column>
        <el-table-column prop="phone" label="phone"> </el-table-column>
        <el-table-column prop="username" label="username"> </el-table-column>
        <el-table-column prop="website" label="website"> </el-table-column>
        <el-table-column prop="email" label="email"> </el-table-column>
        <el-table-column prop="address.city" label="address-city">
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, userList)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import service from "@/utils/request";

export default {
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.fetchUserList(this.currentPage, this.pageSize);
    },
    // async addUser() {
    //   const userInfo = {
    //     address: { city: "beijing" },
    //     company: "dd",
    //     email: "@qq.com",
    //     name: "caroline",
    //     phone: "9999999",
    //     username: "caroline",
    //     website: "caroline.net",
    //   };
    //   try {
    //     const newUser = await createUser(userInfo);
    //     console.log(newUser);

    //     this.userList.push(newUser);
    //   } catch (error) {
    //     this.errorMessage = "Failed to add user. Please try again later."; // 错误提示
    //   }
    // },

    // deleteRow(index, rows) {
    //   this.delUser(this.userList[index].id);
    //   rows.splice(index, 1);
    // },
    // async delUser(uid) {
    //   const res = await deleteUser(uid);
    //   console.log(res);
    // },
    async fetchUserList(page, size) {
      try {
        console.log("fetchUserList===");
        const res = await axios
          .get("/api/users_pagination", {
            params: {
              page,
              size,
            },
          })
          .then((res) => res.data);

        const { userlist, total } = res.data;

        this.userList = userlist;
        this.total = total;
      } catch (error) {
        this.errorMessage = "Failed to load user list. Please try again later."; // 错误提示
      }
    },
  },
  data() {
    return {
      userList: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
    };
  },
};
</script>
