<!--
 * @Author: codytang
 * @Date: 2020-07-10 22:24:47
 * @LastEditTime: 2020-07-13 11:48:58
 * @LastEditors: codytang
 * @Description: 展示座位
-->

<template>
  <div>
    <div v-for="(rows, row) in seats" :key="row" class="seat-rows">
      <div v-for="(item, col) in rows" :key="col" class="seat-cols">
        <div
          class="seat"
          :class="{
            occupy: item.state,
          }"
          @click="showInfo(item, row, col)"
        ></div>
      </div>
    </div>
    <p class="intro">可点击座位查看具体信息</p>
    <seat-dialog
      :seat="seat"
      v-model="seatShow"
      @close="closeInfo"
    ></seat-dialog>
  </div>
</template>

<script>
import SeatDialog from '@/components/SeatDialog.vue';
export default {
  components: {
    SeatDialog,
  },
  props: {
    seats: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      seat: {},
      seatShow: true,
    };
  },
  methods: {
    showInfo(item, row, col) {
      console.log('showinfo');
      this.seat = {
        info: item,
        row,
        col,
      };
      this.seatShow = true;
    },
    closeInfo() {
      this.seatShow = false;
    },
  },
};
</script>

<style scoped>
.seat-rows {
  font-size: 0;
}
.seat-cols {
  display: inline-block;
}
.intro {
  font-size: 12px;
}
</style>
