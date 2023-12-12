<script setup lang="ts">
import { computed } from "vue";
interface Props {
	value: string;
  showYear?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showYear: false
});
const data = computed(()=> {
  const d = props.value? new Date(props.value) : new Date();
  const year = d.getFullYear(); // 获取年份，返回一个四位数的年份
  const month = d.getMonth() + 1; // 获取月份，返回的值是0-11，需要加一
  const day = d.getDate(); // 获取日期，返回一个月的第几天

  const month_str = (month>9? "" : "0") + month;
  const day_str = (day>9? "" : "0") + day;
  return {
    year,
    month,
    day,
    month_str,
    day_str
  }

})
</script>
<template>
  <div :class="'lqsblog-dateblock month-'+ data.month">
    <span class="month">{{ data.month_str }}月</span>
    <span class="day">{{ data.day_str }}</span>
    <span v-if="props.showYear" class="year">{{ data.year}}</span>
  </div>
</template>
<style lang="scss" scoped>
  .lqsblog-dateblock {
    position: relative;
    width: 54px;
    height: 54px;
    background-color: #000;
    color:#fff;
    .month,
    .day,
    .year {
      position: absolute;
      left:0;
      right: 0;
      text-align: center;
    }
    .month {
      top:7px;
      font-size:10px;
      line-height:10px;
    }
    .day {
      top:20px;
      // font-weight: 600;
      font-size: 28px;
      line-height:26px;
    }
    .year {
      bottom: 1px;
      font-size:8px;
      line-height:8px;
      text-align:right;
      opacity: 0.5;
    }

    &.month-1 {
      background-color: var(--lqsblog-color-month-1)
    }
    &.month-2 {
      background-color: var(--lqsblog-color-month-2)
    }
    &.month-3 {
      background-color: var(--lqsblog-color-month-3)
    }
    &.month-4 {
      background-color: var(--lqsblog-color-month-4)
    }
    &.month-5 {
      background-color: var(--lqsblog-color-month-5)
    }
    &.month-6 {
      background-color: var(--lqsblog-color-month-6)
    }
    &.month-7 {
      background-color: var(--lqsblog-color-month-7)
    }
    &.month-8 {
      background-color: var(--lqsblog-color-month-8)
    }
    &.month-9 {
      background-color: var(--lqsblog-color-month-9)
    }
    &.month-10 {
      background-color: var(--lqsblog-color-month-10)
    }
    &.month-11 {
      background-color: var(--lqsblog-color-month-11)
    }
    &.month-12 {
      background-color: var(--lqsblog-color-month-12)
    }
  }
</style>
