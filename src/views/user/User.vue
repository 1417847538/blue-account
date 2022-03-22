<script lang="ts" setup>
import UserHeader from './UserChilds/UserHeader.vue'
import UserMain from './UserChilds/UserMain.vue'
import UserFooter from './UserChilds/UserFooter.vue'
</script>

<template>
  <div class="user">
    <UserHeader />
    <UserMain />
    <UserFooter />
  </div>
</template>

<style lang="less" scoped>
.user {
  height: 100vh;
  font-size: 18px;
  background: url('@/assets/img/bg1.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
	flex-direction: column;
}
</style>
