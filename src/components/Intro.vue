<!--
 * @Author: codytang
 * @Date: 2020-07-10 23:01:38
 * @LastEditTime: 2020-07-13 13:00:51
 * @LastEditors: codytang
 * @Description: 
-->

<template>
  <div class="intro">
    <p>
      一共有<span>{{ concert.block }}</span
      >个区，每一排递增<span>{{ concert.step }}</span
      >个座位，共<span>{{ concert.sum }}</span
      >个座位
    </p>
    <p>
      第1排有<span>{{ concert.front }}</span
      >个座位，最后1排有<span>{{ concert.back }}</span
      >个座位
    </p>
    <p>
      已经售出<span>{{ concert.used }}</span
      >个座位，还剩下<span>{{ concert.remain }}</span
      >个座位
    </p>
    <div class="hr"></div>

    <p>
      一共有<span>{{ users.length }}</span
      >个用户购票，其中购票成功的有
      <span class="success">{{ usersSuccess.length }}</span
      >个
    </p>
    <p>
      购买了邻座的用户有<span class="success">{{
        concert.adjacentSeatCount
      }}</span
      >个，非邻座有
      <span class="warning">{{ concert.notAdjacentSeatCount }}</span
      >个
    </p>
    <p>
      一共有<span class="warning">{{ usersRefund.length }}</span
      >个用户退票，用户退票的概率为
      <span class="warning">{{ refundRate }}</span>
    </p>
    <p>
      一共有<span class="error">{{ usersFail.length }}</span
      >个用户购票失败
    </p>
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
    refundRate: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    usersSuccess() {
      return this.users.filter((item) => item.status === 'SUCCESS');
    },
    usersFail() {
      return this.users.filter((item) => item.status === 'FAIL');
    },
    usersRefund() {
      return this.users.filter((item) => item.status === 'REFUND');
    },
  },
};
</script>

<style scoped>
.intro {
  font-size: 12px;
  margin: 20px;
}
.intro span {
  font-weight: bold;
  margin: 0 2px;
}
.intro .hr {
  height: 1px;
  background: skyblue;
  max-width: 320px;
  display: block;
  margin: 0 auto;
}
</style>
