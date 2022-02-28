<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const addressClick = () => {
  location.href = 'https://github.com/1417847538/blue-account'
}

const editPassword = () => {
  router.push('/update-password')
}

const blogClick = () => {
  location.href = 'http://xiaolan1.icu'
}
</script>

<template>
  <main>
    <van-cell-group inset>
      <van-cell title="项目地址" icon="like-o" is-link @click="addressClick" />
      <van-cell title="修改密码" icon="edit" is-link @click="editPassword" />
      <van-cell title="我的博客" icon="info-o" is-link @click="blogClick" />
    </van-cell-group>
  </main>
</template>

<style lang="less" scoped>
main {
  flex: 3;
  opacity: 0.7;
}
</style>
