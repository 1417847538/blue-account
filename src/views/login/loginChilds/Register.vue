<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Toast } from 'vant'
import { checkUsername, checkPassword } from './hooks/validator'
import { register, loginMessage } from '@/api/login'

enum LeftIconType {
  CIRCLE = 'circle',
  CHECKED = 'checked',
  LOADING = 'loading',
  CLEAR = 'clear',
}

const username = ref<string>('')
const password = ref<string>('')
const buttonLoading = ref(false)

const showLeftIcon = reactive<{
  username: LeftIconType
  password: LeftIconType
}>({
  username: LeftIconType.CIRCLE,
  password: LeftIconType.CIRCLE,
})

//输入框左侧图标变化
const changeLeftIcon = (
  event?: FocusEvent,
  value: string,
  type: 'username' | 'password'
): boolean => {
  const isBlur = event?.type === 'blur' || false
  let result = false
  if (type === 'username') {
    result = checkUsername(value)
  } else if (type === 'password') {
    result = checkPassword(value)
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

const iconClick = (type: 'username' | 'password') => {
  Toast(
    `必须以字母开头,长度为6-18位
${type === 'password' ? '密码必须同时包含字母和数字' : ''}`
  )
}
const emit = defineEmits<{
  (fn: 'toLogin', { username: string, password: string }): void
}>()

const onSubmit = async (values: loginMessage) => {
  try {
    buttonLoading.value = true
    const { message, code } = await register(values)
    if (code === 200) {
      Toast.success({ message, duration: 500 })
      let user = {
        username: username.value,
        password: password.value,
      }
      setTimeout(() => {
        // 注册触发父元素Login中的函数
        emit('toLogin', user)
        username.value = ''
        password.value = ''
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
  <van-form @submit="onSubmit" label-width="64px" validate-trigger="onSubmit">
    <van-cell-group inset>
      <!-- 用户名判断 -->
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="输入用户名"
        clearable
        @blur="changeLeftIcon($event, username, 'username')"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            validator: (value:string) => checkUsername(value),
            message: '用户名格式错误',
          },
          {
            validator: (value:string) =>changeLeftIcon($event,value,'username'),
            trigger: 'onChange'
          },
        ]"
      >
        <template #left-icon>
          <van-loading v-if="showLeftIcon.username === 'loading'" size="20" />
          <van-icon v-else :name="showLeftIcon.username" />
        </template>

        <template #right-icon>
          <van-icon name="info-o" @click="iconClick('username')" />
        </template>
      </van-field>

      <!-- 密码判断 -->
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="输入密码"
        clearable
        @blur="changeLeftIcon($event, password, 'password')"
        :rules="[
				 { required: true, message: '请填写密码' },
				 {
            validator: (value:string) => checkPassword(value),
            message: '密码格式错误',
          },
           {
            validator: (value:string) => changeLeftIcon($event,value,'password'),
            trigger: 'onChange'
          },]"
      >
        <template #left-icon>
          <van-loading v-if="showLeftIcon.password === 'loading'" size="20" />
          <van-icon v-else :name="showLeftIcon.password" />
        </template>

        <template #right-icon>
          <van-icon name="info-o" @click="iconClick('password')" />
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
        注册
      </van-button>
    </div>
  </van-form>
</template>

<style></style>
