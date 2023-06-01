import { defineStore } from "pinia";

import { loginApi, logoutApi } from "@/api/login";
import { getLandList } from "@/api/common";
import { resetRouter } from "@/router";
import { store } from "@/store";

import { LoginData } from "@/api/login/types";

import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  // state
  const token = useStorage("accessToken", "");
  const nickname = useStorage("nickname", "");
  const avatar = ref("");
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限
  const taxSource = ref<string[]>(["全国"]); //  当前税地
  const sourceList = ref([]);
  // const menus = useStorage("menus", [])

  /**
   * 登录调用
   *
   * @returns
   * @param loginData
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          const { user_info } = response.data;
          token.value = response.data.token;
          nickname.value = user_info.account;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
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
