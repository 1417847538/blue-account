<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { editUserInfo } from '@/network/user'
import { avatarList } from './avatarList'
const router = useRouter()

const showDialog = ref(false)
const selectedAvatar = ref('')

const imgClick = (url: string) => {
  selectedAvatar.value = url
  showDialog.value = true
}

const editAvatarRequest = async () => {
  try {
    const { code, data } = await editUserInfo({ avatar: selectedAvatar.value })
    if (code === 200) {
      Toast.success('头像更换成功')
      setTimeout(() => {
        router.push('/user')
      }, 1000)
    }
  } catch (error) {
    console.log('error:' + error)
  } finally {
    showDialog.value = false
  }
}

import Navbar from '@/components/common/navbar/Navbar.vue'
import { Toast } from 'vant'
</script>

<template>
  <Navbar title="更换头像" />
  <main>
    <!-- 狗子 -->
    <div class="animal-title">狗子头像</div>
    <div class="dog">
      <div class="item" v-for="item in avatarList.dog" :key="item.name">
        <van-image
          style="border: 2px solid #fff"
          round
          fit="contain"
          width="80"
          height="80"
          :src="item.url"
          alt="dog"
          lazy-load
          @click="imgClick(item.url)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
    </div>
    <!-- 猫子 -->
    <div class="animal-title">猫猫头像</div>
    <div class="cat">
      <div class="item" v-for="item in avatarList.cat" :key="item.name">
        <van-image
          style="border: 2px solid #fff"
          round
          fit="contain"
          width="80"
          height="80"
          :src="item.url"
          alt="cat"
          lazy-load
          @click="imgClick(item.url)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
    </div>
  </main>

  <!-- 确认头像提示框 -->
  <van-dialog
    v-model:show="showDialog"
    title="确认更换该头像吗？"
    show-cancel-button
    round-button
    @confirm="editAvatarRequest"
  >
    <div class="dialog-content">
      <van-image
        style="border: 2px solid #fff"
        round
        fit="contain"
        :src="selectedAvatar"
        width="80"
        height="80"
        alt="avatar"
        lazy-load
      />
    </div>
  </van-dialog>
</template>

<style lang="less" scoped>
main {
  height: 100%;
  background: url('@/assets/img/bg3.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  .dog,
  .cat {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .animal-title {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    padding: 10px 0;
  }
  .item {
    text-align: center;
    width: 33.3%;
    height: 100px;
  }
}
.dialog-content {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
