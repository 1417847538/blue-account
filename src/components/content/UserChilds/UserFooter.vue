<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

const router = useRouter()

const loginOut = () => {
  localStorage.removeItem('token')
  Toast.success({ message: '退出登录', duration: 800 })
  setTimeout(() => {
    router.push('/login')
  }, 800)
}
</script>

<template>
  <footer>
    <van-button size="large" type="primary" @click="loginOut">
      退出登陆
    </van-button>
  </footer>
</template>

<style lang='less' scoped>
footer{
	margin: 0 20px;
	flex: 2;
}
</style>
