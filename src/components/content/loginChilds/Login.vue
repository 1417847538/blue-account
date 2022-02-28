<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { checkUsername, checkPassword } from './hooks/validator'
import { login, loginMessage } from '@/network/login'

const router = useRouter()
const username = ref('')
const password = ref('')
const buttonLoading = ref(false)

const onSubmit = async (values: loginMessage) => {
  try {
    buttonLoading.value = true
    let { data, message } = await login(values)
    if (data.token) {
      localStorage.setItem('token', data.token)
      Toast.success({ message, duration: 500 })
      setTimeout(() => {
        router.push('/bill')
      }, 500)
    }
  } catch (error) {
    console.log('错误：', error)
  } finally {
    buttonLoading.value = false
  }
}

defineExpose({
  username,
  password,
})
</script>

<template>
  <van-form @submit="onSubmit" label-width="64px">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        clearable
        autocomplete
        placeholder="测试账号：xlz123456"
        :rules="[{ required: true, message: '请输入用户名' }, {
					validator:(value:string)=>checkUsername(value),
					message:'用户名格式错误'
				}]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        clearable
        autocomplete
        placeholder="测试密码：xlz123456"
        :rules="[{ required: true, message: '请输入密码' },
				 {
					validator:(value:string) => checkPassword(value),
					message:'密码格式错误'
				}]"
      />
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
</template>

<style></style>
