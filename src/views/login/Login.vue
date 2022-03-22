<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import Login from './loginChilds/Login.vue'
import Register from './loginChilds/Register.vue'

interface User {
  username: string
  password: string
}

const router = useRouter()
// 登陆后记住密码，直接就登陆到内部了

if (localStorage.getItem('token')) router.push('/bill')

const login = ref<User | undefined>()
const activeTab = ref<string>('login')

// 注册成功后,跳回登陆页面账号并自动填写到登陆的账号和密码
const toLogin = (user: User) => {
  activeTab.value = 'login'
  if (login.value) {
    login.value.username = user.username
    login.value.password = user.password
  }
}
</script>

<template>
  <div class="login">
    <header>小蓝记账</header>
    <van-cell-group inset class="main">
      <van-tabs
        v-model:active="activeTab"
        animated
        color="blue"
        title-active-color="rgb(10 162 221)"
      >
        <van-tab title="登陆" name="login">
          <Login ref="login" />
        </van-tab>
        <van-tab title="注册" name="register">
          <Register @toLogin="toLogin" />
        </van-tab>
      </van-tabs>
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  height: 100vh;
  background: url('@/assets/img/bg2.jpeg');
  background-size: cover;
  background-position: center;
  flex-direction: column;
  opacity: 0.85;
  justify-content: center;
  overflow: hidden;
  header {
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 64px;
    color: rgba(16, 127, 213, 0.898);
    text-shadow: 2px 2px 5px pink;
  }
  .main {
    opacity: 0.9;
    min-height: 30vh;
    margin: 10px;
    /deep/ .van-tab {
      font-size: 18px;
    }
  }
}
</style>
