<template>
  <div class="login-container">
    <el-form
      v-if="registerVisible"
      ref="loginFormRef"
      :model="loginData"
      :rules="loginRules"
      class="login-form"
    >
      <div class="flex text-white items-center py-4">
        <span class="text-2xl flex-1 text-center">{{ $t("login.title") }}</span>
        <lang-select style="color: #fff" />
      </div>

      <el-form-item prop="username">
        <div class="p-2 text-white">
          <svg-icon icon-class="user" />
        </div>
        <el-input
          class="flex-1"
          ref="username"
          size="large"
          v-model="loginData.username"
          :placeholder="$t('login.username')"
          name="username"
        />
      </el-form-item>

      <el-tooltip
        :disabled="isCapslock === false"
        content="Caps lock is On"
        placement="right"
      >
        <el-form-item prop="password">
          <span class="p-2 text-white">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            class="flex-1"
            v-model="loginData.password"
            placeholder="密码"
            :type="passwordVisible === false ? 'password' : 'input'"
            size="large"
            name="password"
            @keyup="checkCapslock"
            @keyup.enter="handleLogin"
          />
          <span class="mr-2" @click="passwordVisible = !passwordVisible">
            <svg-icon
              :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
              class="text-white cursor-pointer"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <div class="mt-4 text-white text-sm" style="text-align: right">
        <span style="cursor: pointer" @click="handle">忘记密码</span>
      </div>

      <el-button
        size="default"
        :loading="loading"
        type="primary"
        class="w-full mt-4"
        @click.prevent="handleLogin"
        >{{ $t("login.login") }}
      </el-button>
    </el-form>
    <el-form
      v-else
      ref="registerFormRef"
      :model="registerData"
      :rules="registerRules"
      class="register-form"
    >
      <div class="flex text-white items-center py-4">
        <span class="text-2xl flex-1 text-center">{{
          $t("register.title")
        }}</span>
        <lang-select style="color: #fff" />
      </div>

      <el-form-item prop="phone">
        <div class="p-2 text-white">
          <svg-icon icon-class="user" />
        </div>
        <el-input
          class="flex-1"
          ref="phone"
          size="large"
          v-model="registerData.phone"
          :placeholder="$t('register.phone')"
          name="phone"
        />
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="verifyCode">
        <span class="p-2 text-white">
          <svg-icon icon-class="verify_code" />
        </span>
        <el-input
          v-model="registerData.verifyCode"
          auto-complete="off"
          :placeholder="$t('register.Code')"
          class="w-[60%]"
          @keyup.enter="handleRegister"
        />

        <div class="captcha">
          <!-- <img :src="captchaBase64" @click="getCaptcha" /> -->
          <!-- <el-button
        size="default"
        :loading="loading"
        type="primary"
        class="w-full mt-4"
        @click.prevent="handleRegister"
        >{{ $t("register.register") }}
      </el-button> -->

          <el-button :disabled="loading2" class="but" @click="getCaptcha">{{
            (countNum as number) > 0 ? countNum : "获取验证码"
          }}</el-button>
        </div>
      </el-form-item>

      <el-tooltip
        :disabled="isCapslock === false"
        content="Caps lock is On"
        placement="right"
      >
        <el-form-item prop="password">
          <span class="p-2 text-white">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            class="flex-1"
            v-model="registerData.password"
            placeholder="新密码"
            :type="passwordVisible === false ? 'password' : 'input'"
            size="large"
            name="password"
            @keyup="checkCapslock"
            @keyup.enter="handleRegister"
          />
          <span class="mr-2" @click="passwordVisible = !passwordVisible">
            <svg-icon
              :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
              class="text-white cursor-pointer"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-tooltip
        :disabled="isCapslock === false"
        content="Caps lock is On"
        placement="right"
      >
        <el-form-item prop="password2">
          <span class="p-2 text-white">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            class="flex-1"
            v-model="registerData.password2"
            placeholder="确认密码"
            :type="password2Visible === false ? 'password' : 'input'"
            size="large"
            name="password2"
            @keyup="checkCapslock"
            @keyup.enter="handleRegister"
          />
          <span class="mr-2" @click="password2Visible = !password2Visible">
            <svg-icon
              :icon-class="password2Visible === false ? 'eye' : 'eye-open'"
              class="text-white cursor-pointer"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <div class="mt-4 text-white text-sm" style="text-align: right">
        <span style="cursor: pointer" @click="handle">去登陆</span>
      </div>

      <el-button
        size="default"
        :loading="loading"
        type="primary"
        class="w-full mt-4"
        @click.prevent="handleRegister"
        >{{ $t("register.register") }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import LangSelect from "@/components/LangSelect/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

// 状态管理依赖
import { useUserStore } from "@/store/modules/user";

// API依赖
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import { LoginData, RegisterData } from "@/api/auth/types";
const userStore = useUserStore();
const route = useRoute();

/**
 * 按钮loading
 */
const loading = ref(false);
/**
 * 验证码按钮loading
 */
const loading2 = ref(false);
/**
 * 是否大写锁定
 */
const isCapslock = ref(false);
/**
 * 密码是否可见
 */
const passwordVisible = ref(false);
/**
 * 确认密码是否可见
 */
const password2Visible = ref(false);
/**
 * 是否忘记密码
 */
const registerVisible = ref(true);
/**
 * 验证码倒计时
 */
const countNum = ref<number>();

/**
 * 登录表单引用
 */
const loginFormRef = ref(ElForm);

const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
});

const loginRules = {
  username: [{ required: true, trigger: "blur" }],
  password: [{ required: true, trigger: "blur", validator: passwordValidator }],
};

/**
 * 忘记密码表单引用
 */
const registerFormRef = ref(ElForm);

const registerData = reactive<RegisterData>({
  phone: null,
  code: "",
  password: "",
  password2: "",
});

const registerRules = {
  phone: [{ required: true, trigger: "blur", validator: phoneValidator }],
  password: [{ required: true, trigger: "blur", validator: passwordValidator }],
  password2: [
    { required: true, trigger: "blur", validator: password2Validator },
  ],
  verifyCode: [{ required: true, trigger: "blur" }],
};

/**
 * 手机号校验器
 */
function phoneValidator(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the phone"));
  } else if (/^1[34578]\d{9}$/.test(value)) {
    if (registerData.password2 !== "") {
      if (!registerFormRef.value) return;
      registerFormRef.value.validateField("password2", () => null);
    }
    callback();
  }
}
/**
 * 密码校验器
 */
function passwordValidator(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (registerData.password2 !== "") {
      if (!registerFormRef.value) return;
      registerFormRef.value.validateField("password2", () => null);
    }
    callback();
  }
}
function password2Validator(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== registerData.password) {
    callback(new Error("二次密码输入不一样"));
  } else {
    callback();
  }
}

/**
 * 检查输入大小写状态
 */
function checkCapslock(e: any) {
  const { key } = e;
  isCapslock.value = key && key.length === 1 && key >= "A" && key <= "Z";
}
/**
 *防抖
 */

let timer: any;
const debounce = (fn: () => void, time?: any) => {
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, time || 1000);
  };
};

/**
 * 获取验证码
 */
function getCaptcha() {
  // var {phone}=registerData.value
  loading2.value = true;

  debounce(function () {
    countNum.value = 60;
    let timer: any;
    if (timer) clearInterval(timer);
    console.log(123123123);
    timer = setInterval(() => {
      countNum.value = (countNum.value as number) - 1;
      if (countNum.value == 0) {
        loading2.value = false;
        clearInterval(timer);
        // loading.value = false;
      }
    }, 1000);
  }, 0)();
}

/**
 * 登录
 */
function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(() => {
          const query: LocationQuery = route.query;

          const redirect = (query.redirect as LocationQueryValue) ?? "/";

          const otherQueryParams = Object.keys(query).reduce(
            (acc: any, cur: string) => {
              if (cur !== "redirect") {
                acc[cur] = query[cur];
              }
              return acc;
            },
            {}
          );

          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch(() => {
          // 验证失败，重新生成验证码
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}
/**
 * 重置密码
 */
function handleRegister() {
  registerFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
    }
  });
}
/**
 * 忘记密码/去登录
 */

function handle() {
  registerVisible.value = !registerVisible.value;
}

onMounted(() => {});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;

  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    // .captcha {
    //   position: absolute;
    //   top: 0;
    //   right: 0;

    //   img {
    //     width: 120px;
    //     height: 48px;
    //     cursor: pointer;
    //   }
    // }
  }

  .register-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .captcha {
      position: absolute;
      top: 0;
      right: 0;

      .but {
        width: 120px;
        height: 48px;
        cursor: pointer;
      }
    }
  }
}

.el-form-item {
  background: rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 5px;
}

.el-input {
  background: transparent;

  // 子组件 scoped 无效，使用 :deep
  :deep(.el-input__wrapper) {
    padding: 0;
    background: transparent;
    box-shadow: none;

    .el-input__inner {
      color: #fff;
      background: transparent;
      border: 0;
      border-radius: 0;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: #fff !important;
      }

      // 设置输入框自动填充的延迟属性
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: color 99999s ease-out, background-color 99999s ease-out;
        transition-delay: 99999s;
      }
    }
  }
}
</style>
