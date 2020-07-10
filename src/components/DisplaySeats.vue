<!--
 * @Author: codytang
 * @Date: 2020-07-10 22:24:47
 * @LastEditTime: 2020-07-10 23:01:10
 * @LastEditors: codytang
 * @Description: 展示座位
-->

<template>
  <div>
    <div v-for="(rows, rowsIndex) in seats" :key="rowsIndex" class="seat-rows">
      <div v-for="(cols, colsIndex) in rows" :key="colsIndex" class="seat-cols">
        <div
          class="seat"
          :class="{
            occupy: cols,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seats: {
      props: Array,
      deault: () => [],
    },
  },
};
</script>

<style></style>
