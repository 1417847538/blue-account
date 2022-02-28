<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

import { checkPassword } from '@/components/content/loginChilds/hooks/validator'
import { updatePassword } from '@/network/user'
import Navbar from '@/components/common/navbar/Navbar.vue'

enum LeftIconType {
  CIRCLE = 'circle',
  CHECKED = 'checked',
  LOADING = 'loading',
  CLEAR = 'clear',
}

const router = useRouter()

const oldPassword = ref('')
const newPassword = ref('')
const repeatPassword = ref('')
const buttonLoading = ref(false)

const showLeftIcon = reactive<{
  oldPassword: LeftIconType
  newPassword: LeftIconType
  repeatPassword: LeftIconType
}>({
  oldPassword: LeftIconType.CIRCLE,
  newPassword: LeftIconType.CIRCLE,
  repeatPassword: LeftIconType.CIRCLE,
})

const validatorRepeatPassword = (value: string) => {
  return value === newPassword.value
}

//输入框左侧图标变化
const changeLeftIcon = (
  event?: FocusEvent,
  value: string,
  type: 'oldPassword' | 'newPassword' | 'repeatPassword'
): boolean => {
  const isBlur = event?.type === 'blur' || false
  let result = false
  if (type === 'oldPassword' || type === 'newPassword') {
    result = checkPassword(value)
  } else if (type === 'repeatPassword') {
    result = value === oldPassword.value && checkPassword(value)
  }
  if (result) {
    setTimeout(() => {
      showLeftIcon[type] = LeftIconType.CHECKED
    }, 1000)
  } else {
    if (value.length === 0) {
      showLeftIcon[type] = LeftIconType.CIRCLE
    } else {
      showLeftIcon[type] =
        isBlur || value.length > 18 ? LeftIconType.CLEAR : LeftIconType.LOADING
    }
  }
}

const iconClick = (type: 'oldPassword' | 'newPassword' | 'repeatPassword') => {
  Toast('密码必须以字母开头,长度为6-18位')
}

const onSubmit = async () => {
  try {
    buttonLoading.value = true
    const { message, code } = await updatePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    })
    if (code === 200) {
      Toast.success(message)
      setTimeout(() => {
        router.push('/user')
      }, 500)
    }
  } catch (error) {
    console.log('error:', error)
  } finally {
    buttonLoading.value = false
  }
}
</script>

<template>
  <Navbar title="修改密码" />
  <main>
    <van-form @submit="onSubmit" label-width="64px" validate-trigger="onSubmit">
      <van-cell-group inset>
        <!-- 旧密码判断 -->
        <van-field
          v-model="oldPassword"
          type="password"
          name="oldPassword"
          label="旧密码"
          placeholder="请输入旧密码"
          clearable
          @blur="changeLeftIcon($event, oldPassword, 'oldPassword')"
          :rules="[{ required: true, message: '请填写旧密码' },{
            validator: (value:string) => checkPassword(value),
            message: '旧密码格式错误',
          },{
            validator: (value:string) =>changeLeftIcon($event,value,'oldPassword'),
            trigger: 'onChange'
          },]"
        >
          <template #left-icon>
            <van-loading
              v-if="showLeftIcon.oldPassword === 'loading'"
              size="20"
            />
            <van-icon v-else :name="showLeftIcon.oldPassword" />
          </template>
        </van-field>

        <!-- 新密码判断 -->
        <van-field
          v-model="newPassword"
          type="password"
          name="newPassword"
          label="新密码"
          placeholder="请输入新密码"
          clearable
          @blur="changeLeftIcon($event, newPassword, 'newPassword')"
          :rules="[{ required: true, message: '请填写新密码' },{
            validator: (value:string) => checkPassword(value),
            message: '密码格式错误',
          },{
            validator: (value:string) => changeLeftIcon($event,value,'newPassword'),
            trigger: 'onChange'
          },]"
        >
          <template #left-icon>
            <van-loading
              v-if="showLeftIcon.newPassword === 'loading'"
              size="20"
            />
            <van-icon v-else :name="showLeftIcon.newPassword" />
          </template>

          <template #right-icon>
            <van-icon name="info-o" @click="iconClick('newPassword')" />
          </template>
        </van-field>

        <!-- 重复新密码判断 -->
        <van-field
          v-model="repeatPassword"
          type="password"
          name="repeatPassword"
          label="确认密码"
          placeholder="请再次输入新密码"
          clearable
          @blur="changeLeftIcon($event, repeatPassword, 'repeatPassword')"
          :rules="[{ required: true, message: '请填写密码' },{
            validator: validatorRepeatPassword,
            message: '两次密码不一致',
          },{
						validator:(value:string) =>checkPassword(value),
						message:'密码格式错误'
					},{
            validator: (value:string) => changeLeftIcon($event,value,'repeatPassword'),
            trigger: 'onChange'
          }]"
        >
          <template #left-icon>
            <van-loading
              v-if="showLeftIcon.repeatPassword === 'loading'"
              size="20"
            />
            <van-icon v-else :name="showLeftIcon.repeatPassword" />
          </template>

          <template #right-icon>
            <van-icon name="info-o" @click="iconClick('repeatPassword')" />
          </template>
        </van-field>
      </van-cell-group>

      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="buttonLoading"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </main>
</template>

<style lang="less" scoped>
main{
  height: 80vh;
  margin: 15px;
  display: flex;
  // justify-content: center;
  align-items: center;
}
</style>
