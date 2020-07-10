<!--
 * @Author: codytang
 * @Date: 2020-07-09 21:10:07
 * @LastEditTime: 2020-07-10 23:53:50
 * @LastEditors: codytang
 * @Description: 购票系统
-->

<template>
  <div id="app">
    <HelloWorld :msg="`Welcome to Your ${appName} App`" />
    <intro v-if="jayChouConcert" :concert="jayChouConcert"></intro>
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
      displayUsersLen: 20,
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
    // 周杰伦演唱会
    this.jayChouConcert = new Seats({
      block: 4,
      front: 5,
      back: 40,
      step: 2,
    });

    for (let index = 0; index < 1000; index += 1) {
      const user = new User();

      if (this.jayChouConcert && this.jayChouConcert.remain === 0) {
        alert("卖完票啦");
        break;
      }

      await sleep(randomNumber(0, 300));

      this.users.unshift(user);
      if (
        this.jayChouConcert &&
        this.jayChouConcert.remain - user.ticket >= 0
      ) {
        this.jayChouConcert.purchaseTicket(user.ticket);
      } else {
        user.disabled = true;
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
</style>
