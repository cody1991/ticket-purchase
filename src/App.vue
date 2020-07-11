<!--
 * @Author: codytang
 * @Date: 2020-07-09 21:10:07
 * @LastEditTime: 2020-07-11 18:59:26
 * @LastEditors: codytang
 * @Description: 购票系统
-->

<template>
  <div id="app">
    <HelloWorld :msg="`Welcome to Your ${appName} App`" />
    <intro
      v-if="jayChouConcert"
      :concert="jayChouConcert"
      :users="users"
    ></intro>
    <display-seats
      v-if="jayChouConcert"
      :seats="[...jayChouConcert.seats]"
    ></display-seats>
    <display-users :users="displayUsers"></display-users>
  </div>
</template>

<script>
import AdvancedSeats from "@/models/AdvancedSeats";
import User from "@/models/User.js";

// 设置每个人的购票上限，测试用
User.ticketLimit = 5;

import HelloWorld from "@/components/HelloWorld.vue";
import DisplayUsers from "@/components/DisplayUsers.vue";
import DisplaySeats from "@/components/DisplaySeats.vue";
import Intro from "@/components/Intro.vue";
import { randomNumber, sleep } from "@/libs/utils";

export default {
  name: "App",
  data() {
    return {
      appName: "Ticket Purchase",
      jayChouConcert: null,
      seats: [],
      users: [],
      displayUsersLen: 25, // 用户展示区域的最大长度
      sleepMax: 100, // 模拟等待时间的峰值
      refundRate: 0.5, // 用户退票的概率
      block: 2,
      front: 1,
      back: 30,
      step: 1,
    };
  },
  components: {
    HelloWorld,
    DisplayUsers,
    DisplaySeats,
    Intro,
  },
  beforeDestroy() {
    this.jayChouConcert = null;
  },
  computed: {
    displayUsers() {
      return this.users.slice(0, this.displayUsersLen);
    },
  },
  async mounted() {
    // 周杰伦的演唱会
    this.jayChouConcert = new AdvancedSeats({
      block: this.block,
      front: this.front,
      back: this.back,
      step: this.step,
    });

    while (this.jayChouConcert && this.jayChouConcert.remain) {
      // 一旦无票，则结束整个程序
      await sleep(randomNumber(0, this.sleepMax));

      if (!this.jayChouConcert) return;

      if (Math.random() > this.refundRate) {
        // 新用户购票逻辑，购票不考虑已存在用户重新购票
        const user = new User();
        if (
          this.jayChouConcert &&
          this.jayChouConcert.remain - user.ticket >= 0
        ) {
          user.purchaseTicketPos = this.jayChouConcert.purchaseTicket(user);
          user.status = "SUCCESS";
        } else {
          user.status = "FAIL";
          user.purchaseTicketPos = [];
        }
        this.users.unshift(user);
      } else {
        // 用户退票逻辑处理
        if (this.users.length && this.users.length > 0) {
          const index = randomNumber(0, this.users.length - 1);
          const user = this.users[index];
          if (user.status !== "SUCCESS") {
            // 只处理成功买票的
            user.status = "REFUND";
            this.users.splice(index, 1);
            this.users.unshift(user);
            this.jayChouConcert.refundTicket(user);
          }
        }
      }
    }
  },
};
</script>

<style>
#app {
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.seat {
  display: inline-block;
  line-height: 5px;
  width: 5px;
  height: 5px;
  background: green;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5) inset;
  cursor: pointer;
}
.seat.occupy {
  background: red;
}

.success {
  color: #67c23a;
}
.error {
  color: #f56c6c;
}
.warning {
  color: #e6a23c;
}
</style>
