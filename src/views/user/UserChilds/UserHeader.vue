<script lang="ts" setup>
import { ActionSheetAction } from 'vant'
import { useRouter } from 'vue-router'

import {
  userInfo,
  showEditAvatar,
  showEditSignature,
  editSignature,
} from './hooks/store'

import { getUserInfoRequest, editSignatureRequest } from './hooks/hooks'
const router = useRouter()

getUserInfoRequest()

const actions = [{ name: '更换头像' }]

const onSelect = (item: ActionSheetAction) => {
  showEditAvatar.value = false
  router.push('/update-avatar')
}
</script>

<template>
  <header>
    <!-- 头像 -->
    <div class="header-avatar" @click="showEditAvatar = true">
      <van-image
        round
        fit="contain"
        width="80"
        height="80"
        :src="userInfo.avatar"
        alt="用户头像"
      />
    </div>
    <!-- 用户名称 -->
    <div class="header-name">
      {{ userInfo.username }}
    </div>
    <!-- 个性签名 -->
    <div class="header-signature">
      <span>{{ userInfo.signature }}</span>
      <van-icon
        style="margin-left: 5px"
        name="edit"
        @click="showEditSignature = true"
      />
    </div>
  </header>

  <!-- 编辑个性签名对话框 -->
  <van-dialog
    v-model:show="showEditSignature"
    title="修改个性签名"
    show-cancel-button
    @cancel="showEditSignature = false"
    @confirm="editSignatureRequest"
  >
    <van-field
      v-model.trim="editSignature"
      placeholder="请输入个性签名"
      clearable
    />
  </van-dialog>

  <!--修改头像对话框 -->
  <van-action-sheet
    v-model:show="showEditAvatar"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @select="onSelect"
  />
</template>

<style lang="less" scoped>
header {
  flex: 3;
  padding-top: 30px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 4;
  }
  .header-name {
    flex: 3;
    font-weight: 700;
    font-size: 22px;
    color: rgb(45, 72, 228);
  }
  .header-signature {
    flex: 3;
    font-size: 18px;
    font-weight: 600;
    color: rgb(233, 16, 143);
  }
}
</style>
