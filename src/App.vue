<!--
 * @Author: codytang
 * @Date: 2020-07-09 21:10:07
 * @LastEditTime: 2020-07-11 15:07:42
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
import Seats from "@/models/Seats.js";
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
      displayUsersLen: 10,
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
    this.jayChouConcert = new Seats({
      block: 4,
      front: 5,
      back: 40,
      step: 2,
    });

    while (this.jayChouConcert && this.jayChouConcert.remain) {
      // 一旦无票，则结束整个程序
      await sleep(randomNumber(0, 50));

      if (!this.jayChouConcert) return;

      if (Math.random() > 0.1) {
        // 新用户购票逻辑，购票不考虑已存在用户重新购票
        const user = new User();
        this.users.unshift(user);
        if (
          this.jayChouConcert &&
          this.jayChouConcert.remain - user.ticket >= 0
        ) {
          user.purchaseTicketPos = this.jayChouConcert.purchaseTicket(user);
          user.status = "SUCCESS";
        } else {
          user.status = "FAIL";
        }
      } else {
        // 用户退票逻辑处理
        if (this.users.length && this.users.length > 0) {
          const index = randomNumber(0, this.users.length - 1);
          const user = this.users[index];
          user.status = "REFUND";
          this.users.splice(index, 1);
          this.users.unshift(user);
          this.jayChouConcert.refundTicket(user);
        }
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.seat {
  display: inline-block;
  width: 5px;
  height: 5px;
  background: green;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5) inset;
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
