<script lang="ts" setup>
import { countPayType, billList, countTotal } from './hooks/store'
</script>

<template>
  <!-- 条形图 -->
  <div class="strip">
    <header>
      <van-tag
        mark
        :type="countPayType === 'expense' ? 'success' : 'warning'"
        size="large"
      >
        进度条
      </van-tag>
    </header>
    <main>
      <div v-for="item in billList" :key="item.type_id" class="item">
        <div class="title">
          <span>{{ item.type_name }}</span>
          <span>￥{{ item.total_amount.toFixed(2) }}</span>
        </div>
        <div class="process">
          <van-progress
            :color="countPayType === 'expense' ? '#007fff' : '#f32b1d'"
            :percentage="((item.total_amount / countTotal) * 100).toFixed(2)"
            stroke-width="8"
          />
        </div>
      </div>
    </main>
  </div>
  <!-- 环形图 -->
  <div class="circle">
    <header>
      <van-tag
        mark
        :type="countPayType === 'expense' ? 'success' : 'warning'"
        size="large"
      >
        环形图
      </van-tag>
    </header>
    <main>
      <canvas id="chart" />
    </main>
  </div>
  
</template>

<style lang="less" scoped>
header {
  margin: 10px 0;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
  .title {
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
  }
  .process {
    flex: 3;
  }
}
</style>
