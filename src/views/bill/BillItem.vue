<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { Dialog, Toast } from 'vant'

import { type, showAdd } from './billChilds/hooks/store'
import { changeBillItem } from './billChilds/hooks/hooks'
import type { BillItem } from './billChilds/hooks/types'

import { deleteBillItem, getBillItem } from '@/api/bill'

import Navbar from '@/components/navbar/Navbar.vue'
import AddPopup from '@/components/addPopup/AddPopup.vue'

const route = useRoute()
const router = useRouter()

let billItem = reactive<BillItem>({})
const id = Number(route.query.id)

// 详情页请求
const getBillItemRequest = async (id: number) => {
  const { code, data } = await getBillItem(id)
  if (code === 200) {
    Object.assign(billItem, data[0])
  }
}

getBillItemRequest(id)


const onDelete = async () => {
  const { code, message } = await deleteBillItem(id)
  if (code === 200) {
    Toast(message)
    setTimeout(() => {
      router.push('/bill')
    }, 500)
    changeBillItem()
  }
}

const showDeleteDialog = () => {
  Dialog.confirm({
    title: '提示',
    message: '确认要删除该条账单嘛？',
  }).then(() => onDelete())
}
</script>

<template>
  <Navbar title="详情页" />
  <main v-if="Object.keys(billItem).length">
    <div class="card">
      <van-tag
        size="large"
        :type="billItem.pay_type === 1 ? 'success' : 'danger'"
      >
        {{ billItem.type_name }}
      </van-tag>
    </div>

    <div class="amount">
      <span :style="{ color: 'green' }" v-if="billItem.pay_type === 1">
        -{{ billItem.amount }}
      </span>
      <span :style="{ color: 'red' }" v-else> +{{ billItem.amount }} </span>
    </div>

    <van-field
      label="记账时间"
      :model-value="dayjs(Number(billItem.date)).format('YYYY-MM-DD HH:mm')"
      readonly
    />

    <van-field label="备注" :model-value="billItem.remark" readonly />

    <div class="buttons">
      <van-button
        type="danger"
        text="删除"
        icon="delete"
        plain
        @click="showDeleteDialog"
      />
      <van-button
        type="primary"
        text="编辑"
        icon="records"
        plain
        @click="showAdd.showAdd = true"
      />
    </div>
  </main>

  <!-- 确认删除提示框 -->
  <!-- <van-dialog /> -->
  <!-- 编辑模态框 -->
  <AddPopup
    :showAddRead="showAdd"
    @close="showAdd.showAdd = false"
    :defaultData="billItem"
  />
</template>

<style lang="less" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  .card {
    margin: 10px;
  }
  .amount {
    font-weight: 600;
    font-size: 20px;
    margin: 10px 0 20px 0;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin-top: 20px;
  }
}
</style>
