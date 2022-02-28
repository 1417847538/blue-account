<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { deleteBillItem } from '@/network/bill'
import type { Bill, BillItem } from './hooks/types'

import { changeBillItem } from '@/components/content/billChilds/hooks/store'

const router = useRouter()
const { bill } = defineProps<{
  bill: Bill
}>()

const dayExpense = computed(() => {
  return bill.bills.reduce((sum: number, item: BillItem) => {
    if (item.pay_type === 1) sum += Number(item.amount)
    return sum
  }, 0)
})

const dayIncome = computed(() => {
  return bill.bills.reduce((sum: number, item: BillItem) => {
    if (item.pay_type === 2) sum += Number(item.amount)
    return sum
  }, 0)
})

const onDelete = async (id: number | undefined) => {
  if (!id) return
  const { code, message } = await deleteBillItem(id)
  if (code === 200) {
    Toast(message)
    changeBillItem()
  }
}

const goDetail = (id: number) => {
  router.push({
    path: '/billItem',
    query: {
      id,
    },
  })
}
</script>

<template>
  <van-cell-group inset class="card">
    <!-- 每日账单标题 -->
    <header>
      <span class="title-date">{{ bill.date }}</span>
      <span class="title-amount">
        <span class="expense">
          <van-icon name="minus" />￥{{ dayExpense }}
        </span>
        <span class="income"> <van-icon name="plus" />￥{{ dayIncome }} </span>
      </span>
    </header>

    <!-- 每日账单细节 -->
    <van-swipe-cell v-for="item in bill.bills" :key="item.id">
      <van-cell class="card-item" @click="goDetail(item.id)">
        <main>
          <span>
            <van-tag
              mark
              size="large"
              :type="item.pay_type === 1 ? 'success' : 'danger'"
            >
              {{ item.type_name }}
            </van-tag>
          </span>
          <span :style="{ color: 'green' }" v-if="item.pay_type === 1">
            -{{ item.amount }}
          </span>
          <span :style="{ color: 'red' }" v-else> +{{ item.amount }} </span>
        </main>

        <footer>
          <span>
            {{ dayjs(Number(item.date)).format('HH:mm') }}
          </span>
          <div v-if="item.remark">备注：{{ item.remark }}</div>
        </footer>
      </van-cell>

      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          style="height: 100%"
          @click="onDelete(item.id)"
        >
        </van-button>
      </template>
    </van-swipe-cell>
  </van-cell-group>
</template>

<style lang="less" scoped>
.card {
  margin-top: 10px;
  border: 1px solid #f7f8fa;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    background-color: #f7f8fa;
    color: #000000;
    .title-date {
      font-size: 18px;
    }
    .title-amount {
      font-size: 14px;
      .expense {
        color: green;
      }
      .income {
        margin-left: 15px;
        color: red;
      }
    }
  }
  .card-item {
    padding: 10px;
    main {
      font-size: 18px;
      display: flex;
      justify-content: space-between;
    }
    footer {
      padding-top: 6px;
      font-size: 14px;
    }
  }
}
</style>
