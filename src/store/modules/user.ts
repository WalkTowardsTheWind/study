import { defineStore } from "pinia";

import { loginApi, logoutApi } from "@/api/login";
import { getLandList } from "@/api/common";
import { setTaxLand } from "@/api/system";
import { resetRouter, refreshSelectedTag } from "@/router";
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
  const taxSource = useStorage("taxSource", ""); //  当前税地
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

  async function taxSourceChange(value: string): void {
    taxSource.value = value;
    await setTaxLand({ tax_land_id: value });
    refreshSelectedTag();
  }
  function getSourceList(): Promise<void> {
    return new Promise((resolve, reject) => {
      getLandList()
        .then(({ data }) => {
          sourceList.value = data.map((it: any) => ({
            label: it.tax_land_name,
            value: it.id,
          }));
          // if (sourceList.value && sourceList.value.length && !taxSource.value) {
          // 	// @ts-ignore
          // 	taxSource.value = sourceList.value[0].value
          // }
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
    menusList,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
