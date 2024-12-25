import request from "@/utils/request.js";

export const getUserList = () => {
  return request
    .get("/users")
    .then((response) => response.data)
    .catch((error) => {
      // 处理错误，比如展示错误信息
      console.error("Error fetching user list:", error);
      throw error; // 抛出错误，以便上层捕获
    });
};

export const createUser = (userInfo) => {
  return request
    .post("/users", JSON.stringify(userInfo))
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error add user:", error);
      throw error;
    });
};

export const deleteUser = (uid) => {
  return request
    .delete(`/users/${uid}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error add user:", error);
      throw error;
    });
};
