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
  const lastTime = ref("");
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限
  const sourceList = ref([]);
  const menusList = useStorage("menusList", []);

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
          const { user_info, menus } = response.data;
          token.value = response.data.token;
          nickname.value = user_info.account;
          lastTime.value = user_info.last_time;
          menusList.value = menus;
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
    menusList.value = [];
  }
  function getSourceList(): Promise<void> {
    return new Promise((resolve, reject) => {
      getLandList()
        .then(({ data }) => {
          const { tax_land_list } = data;
          if (tax_land_list && tax_land_list.length) {
            sourceList.value = tax_land_list.map((it: any) => ({
              label: it.tax_land_name,
              value: it.id,
            }));
          }
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
    lastTime,
    roles,
    perms,
    login,
    logout,
    resetToken,
    sourceList,
    getSourceList,
    menusList,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
