<template>
  <div class="login-container">
    <div class="loginLogo">
      <img class="imgs" src="@/assets/zxn.jpg" alt="" />
    </div>
    <div class="login">
      <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="loginRules"
        class="login-form"
      >
        <div class="flex text-black items-center py-4">
          <span class="text-2xl flex-1 text-center">欢迎登录</span>
        </div>

        <el-form-item class="mt-10" prop="username">
          <el-input
            class="flex-1"
            ref="username"
            size="large"
            v-model="loginData.username"
            placeholder="用户名"
            name="username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="flex-1"
            v-model="loginData.password"
            placeholder="密码"
            type="password"
            size="large"
            name="password"
            @keyup="checkCapslock"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
            v-model="loginData.verifyCode"
            autocomplete="off"
            placeholder="请输入验证码"
            size="large"
            class="w-[60%]"
            @keyup.enter="handleLogin"
          />

          <div class="captcha1">
            <img src="@/assets/zxn.jpg" @click="getCaptcha" />
          </div>
        </el-form-item>

        <div
          class="mt-6"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div class="text-black text-sm" style="text-align: left">
            <el-checkbox v-model="checked1" label="记住密码" size="large" />
          </div>
          <div class="text-black text-sm" style="text-align: right">
            <span style="cursor: pointer" @click="handle">忘记密码</span>
          </div>
        </div>

        <el-button
          size="default"
          :loading="loading"
          color="#356FF3"
          class="w-full mt-4 mb-4"
          @click.prevent="handleLogin"
          >登录
        </el-button>
      </el-form>
    </div>
    <div class="register"></div>

    <el-dialog
      v-model="registerVisible"
      title="密码重置"
      width="35%"
      :before-close="handle"
      :center="true"
    >
      <el-form
        ref="registerFormRef"
        :model="registerData"
        :rules="registerRules"
        class="register-form"
      >
        <el-form-item prop="phone">
          <el-input
            class="flex-1"
            ref="phone"
            size="large"
            v-model="registerData.phone"
            placeholder="手机号"
            name="phone"
          />
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
            v-model="registerData.verifyCode"
            auto-complete="off"
            placeholder="验证码"
            size="large"
            @keyup.enter="handleRegister"
          />

          <div class="captcha2 mr-5 text-centen mt-1">
            <span class="but" style="color: #356ff3" @click="getPhoneCaptcha">{{
              (countNum as number) > 0 ? countNum : "获取验证码"
            }}</span>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="flex-1"
            v-model="registerData.password"
            placeholder="密码"
            :type="passwordVisible === false ? 'password' : 'input'"
            size="large"
            name="password"
            @keyup="checkCapslock"
            @keyup.enter="handleRegister"
          />
        </el-form-item>

        <el-form-item prop="password2">
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
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button
            color="#356FF3"
            size="large"
            class="resetButton-cancel w-[35%]"
            @click="registerVisible = false"
            >取消
          </el-button>
          <el-button
            color="#356FF3"
            size="large"
            class="resetButton-confirm w-[35%]"
            @click="registerVisible = false"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="loginBanquan">
      版权所有@copyRight北京惠通智云信息技术有限公司 保留一切版权
      京ICP备19020515号-1
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

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
 * 记住密码
 */
const checked1 = ref(false);
/**
 * 弹窗
 */
//  const registerVisible = ref(false);
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
const registerVisible = ref(false);
/**
 * 验证码倒计时
 */
const countNum = ref<number>();
/**
 * 验证码图片Base64字符串
 */
// const captchaBase64 = ref();
/**
 * 验证码图片Base64字符串
 */
// const captcha = ref();

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
  // verifyCode: [{ required: true, trigger: "blur" }],
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
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"));
  } else {
    callback();
  }
}
function password2Validator(rule: any, value: any, callback: any) {
  if (value != registerRules.password) {
    callback(new Error("二次密码输入不一致"));
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
  // getCaptchaApi().then(({ data }) => {
  //   const { verifyCodeBase64, verifyCodeKey } = data;
  //   loginData.value.verifyCodeKey = verifyCodeKey;
  //   captchaBase64.value = verifyCodeBase64;
  // });
}
/**
 * 获取手机验证码
 */
function getPhoneCaptcha() {
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
          getCaptcha();
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

onMounted(() => {
  // getCaptcha();
});
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #f6f6f6;

  .loginLogo {
    position: absolute;
    top: 10%;
    left: calc(50% - 25px);

    .imgs {
      width: 50px;
      height: 50px;
    }
  }

  .login {
    position: absolute;
    top: calc(50% - 230px);
    left: calc(50% - 230px);
    width: 460px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 36px 0 #000;

    .login-form {
      width: 520px;
      max-width: 100%;
      padding: 24px;
      margin: 0;
      overflow: hidden;
      // loginlogo

      .captcha1 {
        position: absolute;
        top: 0;
        right: 0;

        img {
          width: 120px;
          height: 38px;
          cursor: pointer;
        }
      }
    }
  }

  .register-form {
    width: 520px;
    max-width: 100%;
    padding: 10px 0;
    margin: 0;
    overflow: hidden;

    .captcha2 {
      position: absolute;
      top: 0;
      right: 0;

      .but {
        width: 120px;
        height: 38px;
        cursor: pointer;
      }
    }
  }

  .loginBanquan {
    position: absolute;
    bottom: 50px;
    left: calc(50% - 450px);
    width: 900px;
    margin-top: 100px;
    // display: flex;
    // align-items: center;
    // flex-direction: column;
    // flex: 1;
    text-align: center;
  }
}
</style>
