<!--
 * @Author: codytang
 * @Date: 2020-07-11 17:43:16
 * @LastEditTime: 2020-07-11 18:42:34
 * @LastEditors: codytang
 * @Description: 弹层消息
-->

<template>
  <transition name="fade" v-if="show">
    <div class="dialog-wrapper" v-if="seat && seat.info">
      <div class="mask" @click="close"></div>
      <div class="dialog">
        <p>{{ seat.info.block }}区{{ seat.row + 1 }}排{{ seat.col + 1 }}座</p>
        <p>
          <span v-if="seat.info.state && seat.info.user && seat.info.user.name"
            >已被购买，购买人为 {{ seat.info.user.name }}</span
          >
          <span v-else>
            暂未被购买
          </span>
        </p>
        <div @click="close" class="confirm-btn">我知道了</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    seat: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
  },
  data() {
    return {
      show: this.value,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.dialog-wrapper {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.dialog-wrapper .mask {
  position: fixed;
  z-index: 1000;
  z-index: 999;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.9);
}
.dialog-wrapper .dialog {
  padding: 20px;
  z-index: 1001;
  position: absolute;
  width: 70%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  font-size: 14px;
}
.confirm-btn {
  border: 1px solid #000;
  display: inline-block;
  padding: 10px 30px;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
