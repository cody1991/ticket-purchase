<!--
 * @Author: codytang
 * @Date: 2020-07-10 23:01:38
 * @LastEditTime: 2020-07-11 18:19:34
 * @LastEditors: codytang
 * @Description: 
-->

<template>
  <div class="intro">
    一共有 {{ concert.sum }} 个座位，已经使用 {{ concert.used }} 个座位，还剩下
    {{ concert.remain }}个座位<br />
    一共有 {{ users.length }} 个用户，购票成功
    {{ usersSuccess.length }}个，退票成功 {{ usersRefund.length }}个，购票失败
    {{ usersFail.length }}个<br />
    <div class="seat"></div>
    代表空闲座位
    <div class="seat occupy"></div>
    代表已占用座位
  </div>
</template>

<script>
export default {
  props: {
    concert: {
      type: Object,
      default: () => {},
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    usersSuccess() {
      return this.users.filter((item) => item.status === "SUCCESS");
    },
    usersFail() {
      return this.users.filter((item) => item.status === "FAIL");
    },
    usersRefund() {
      return this.users.filter((item) => item.status === "REFUND");
    },
  },
};
</script>

<style scoped>
.intro {
  font-size: 10px;
  margin: 20px;
}
</style>
