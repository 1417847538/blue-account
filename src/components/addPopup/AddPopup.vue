<script lang="ts" setup>
import { ref, watch, readonly, toRef } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { Toast } from 'vant'

import type { BillItem } from '@/views/bill/billChilds/hooks/types'

import {
  type_pay,
  billType,
  remark,
  amount,
  showDate,
  selectedDate,
  expenseClass,
  incomeClass,
  choosePayType,
  showTypes,
  chooseBillType,
} from './hooks/store'

import { addBillItem, updateBillItem } from '@/api/bill'

import TotalDate from '@/components/totalDate/TotalDate.vue'

const router = useRouter()
const { showAddRead, defaultData } = defineProps<{
  showAddRead: Proxy
  defaultData: BillItem
}>()
const emit = defineEmits(['addChange'])

const showAdd = toRef(showAddRead, 'showAdd')
const totalDate = ref()


const showDateFn = () => {
  showDate.value = true
  totalDate.value.dateType = 'date'
  totalDate.value.dateTitle = '选择年月日'
}

watch(
  () => showAdd.value,
  () => {
    setTimeout(() => {
      // 是详情页
      if (Object.keys(defaultData).length > 0) {
        amount.value = defaultData.amount || ''
        billType.id = defaultData.type_id || 0
        billType.name = defaultData.type_name || ''
        selectedDate.value = new Date(Number(defaultData.date || ''))
        remark.value = defaultData.remark || ''
        type_pay.value = defaultData.pay_type === 1 ? 'expense' : 'income'
      } else {
        // 是添加页
        amount.value = ''
        selectedDate.value = new Date()
        remark.value = ''
        type_pay.value = 'expense'
        billType.id = showTypes.value[0].id
        billType.name = showTypes.value[0].name
      }
    }, 100)
  }
)

const dateChange = (date: Date) => {
  showDate.value = false
  selectedDate.value = date
}
// 增加或改变单日账单
const addOrUpdateBillItemRequest = async () => {
  const params: BillItem = {
    amount: amount.value,
    type_id: Number(billType.id),
    type_name: billType.name,
    date: Number(selectedDate.value) + '',
    pay_type: type_pay.value === 'expense' ? 1 : 2,
    remark: remark.value,
  }
  try {
    if (defaultData.id) {
      params.id = defaultData.id
      const { code, message } = await updateBillItem(params)
      if (code === 200) {
        Toast(message)
        emit('addChange')
        router.go(0)
      }
    } else {
      const { code, message } = await addBillItem(params)
      if (code === 200) {
        Toast(message)
        emit('addChange')
      }
    }
  } catch (error) {
    console.log('error:' + error)
  }
}

const closeKeyboard = () => {
  if (amount.value.length === 0) {
    Toast('请输入金额！')
    return
  }
  
  if (!Number(amount.value)) {
    Toast('请正确输入金额！')
    return
  }
  let index = amount.value.indexOf('.')
  if (index !== -1) {
    if (index === 0) {
      Toast('请正确输入金额！')
      return
    }
    if (amount.value.slice(index + 1).length > 2) {      
      Toast('请正确输入金额！')
      return
    }
  }
  addOrUpdateBillItemRequest()
}
</script>

<template>
  <!-- 增加页面的弹出框 -->
  <van-popup v-model:show="showAdd" position="bottom" round>
    <div class="add-page">
      <header>
        <!-- 支付/收入 -->
        <div class="type">
          <span :class="expenseClass" @click="choosePayType('expense')">
            支出
          </span>
          <span :class="incomeClass" @click="choosePayType('income')">
            收入
          </span>
        </div>
        <!-- 选择时间 -->
        <div class="date">
          <span @click="showDateFn">
            {{ dayjs(selectedDate).format('YYYY-MM-DD') }}
            <van-icon name="arrow-down" />
          </span>
        </div>
      </header>
      <!-- 输入金额 -->
      <div class="add-money">
        <span class="prefix">￥</span>
        <span class="amount">{{ amount }}</span>
      </div>
      <!-- 选择小的类型 -->
      <div class="add-types">
        <div v-for="item in showTypes" :key="item.id" class="item-type">
          <van-tag
            :plain="item.id !== billType.id"
            size="large"
            :type="item.type === 1 ? 'primary' : 'danger'"
            @click="chooseBillType(item)"
          >
            {{ item.name }}
          </van-tag>
        </div>
      </div>
      <!-- 添加备注 -->
      <div class="add-remark">
        <van-field
          v-model="remark"
          rows="1"
          label="备注"
          autosize
          type="textarea"
          maxlength="50"
          show-word-limit
          label-width="50px"
          border
          colon
        />
      </div>

      <van-number-keyboard
        v-model="amount"
        :show="true"
        theme="custom"
        close-button-text="完成"
        extra-key="."
        maxlength="8"
        @close="closeKeyboard"
      />
    </div>

    <TotalDate
      :showDate="showDate"
      :selectedDate="selectedDate"
      @close="showDate = false"
      @dateChange="dateChange"
      ref="totalDate"
    />
  </van-popup>
</template>

<style lang="less" scoped>
.add-page {
  font-size: 14px;
  padding-bottom: 200px;
  header {
    padding: 20px;
    display: flex;
    justify-content: space-between;

    .type {
      margin-top: 2px;
      span {
        margin: 0 5px;
        border-radius: 25px;
        padding: 4px 10px;
        background-color: #f5f5f5;
        border: 1px solid #f5f5f5;
        color: rgba(0, 0, 0, 0.5);
      }
      .button-expense-actived {
        background-color: #eafbf6;
        color: #007fff;
        border: 0.5px solid #007fff;
      }
      .button-income-actived {
        background-color: #f8f3e3;
        color: #ed246a;
        border: 0.5px solid #ec2571;
      }
    }

    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 12px;
      background-color: #f0f0f0;
      border-radius: 20px;
    }
  }

  .add-money {
    padding-bottom: 6px;
    border-bottom: 1px solid #e9e9e9;
    margin: 0 24px;
    .prefix {
      font-size: 36px;
      font-weight: bold;
    }
    .amount {
      font-size: 40px;
      padding-left: 6px;
    }
  }

  .add-types {
    display: flex;
    overflow-x: auto;
    margin: 0 24px;
    margin-bottom: 20px;
    white-space: nowrap;
    .item-type {
      padding: 12px;
    }
  }

  .add-remark {
    padding: 0 4px;
    margin-bottom: 36px;
    /deep/ #van-field-1-label {
      font-size: 16px;
      color: #f52d2d !important;
    }
  }
}
</style>
