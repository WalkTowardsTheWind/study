import { defineStore } from "pinia";

import { loginApi, logoutApi } from "@/api/login/index";
import { getUserInfo } from "@/api/user";
import { getLandList } from "@/api/common";
import { resetRouter } from "@/router";
import { store } from "@/store";

import { LoginData } from "@/api/login/types";
import { UserInfo } from "@/api/user/types";

import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  // state
  const token = useStorage("accessToken", "");
  const nickname = ref("");
  const avatar = ref("");
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限
  const taxSource = ref<string[]>(["全国"]); //  当前税地
  const sourceList = ref([]);

  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    console.log(2);
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          // const { token } = response.data;
          // console.log(token)
          token.value = response.data.token; // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          if (!data.roles || data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!");
          }
          nickname.value = data.nickname;
          avatar.value = data.avatar;
          roles.value = data.roles;
          perms.value = data.perms;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      console.log("out");
      logoutApi()
        .then(() => {
          console.log(111);
          resetRouter();
          resetToken();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 重置
  function resetToken() {
    token.value = "";
    nickname.value = "";
    avatar.value = "";
    roles.value = [];
    perms.value = [];
  }

  function taxSourceChange(value: []): void {
    taxSource.value = value;
  }
  function getSourceList(): Promise<void> {
    return new Promise((resolve, reject) => {
      getLandList()
        .then(({ data }) => {
          sourceList.value = data;
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return {
    token,
    nickname,
    avatar,
    roles,
    perms,
    login,
    getInfo,
    logout,
    resetToken,
    taxSource,
    taxSourceChange,
    sourceList,
    getSourceList,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
