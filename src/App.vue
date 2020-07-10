<!--
 * @Author: codytang
 * @Date: 2020-07-09 21:10:07
 * @LastEditTime: 2020-07-10 00:49:48
 * @LastEditors: codytang
 * @Description: 购票系统
-->

<template>
  <div id="app">
    <HelloWorld :msg="`Welcome to Your ${appName} App`" />
    <div class="intro">
      一共有 {{ jayChouConcert.sum }} 个座位，已经使用
      {{ jayChouConcert.used }} 个座位，还剩下
      {{ jayChouConcert.remain }}个座位<br />
      <div class="seat"></div>
      代表空闲座位
      <div class="seat occupy"></div>
      代表已占用座位
    </div>

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

    <div class="users">
      <div class="user" v-for="user in displayUsers" :key="user.id">
        <span v-if="!user.disabled">
          用户 {{ user.name }} (ID: {{ user.id && user.id.slice(0, 10) }})
          购买了 {{ user.ticket }} 张票
        </span>
        <span v-else style="color: red;">
          用户 {{ user.name }} (ID: {{ user.id && user.id.slice(0, 10) }})
          购票失败
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Seats from "@/models/Seats.js";
import User from "@/models/User.js";

User.ticketLimit = 5;

import HelloWorld from "@/components/HelloWorld.vue";
import { randomNumber } from "@/libs/utils";

export default {
  name: "App",
  data() {
    return {
      appName: "Ticket Purchase",
      jayChouConcert: {},
      seats: [],
      users: [],
      displayUsersLen: 20,
    };
  },
  components: {
    HelloWorld,
  },
  beforeDestroy() {
    this.seats = null;
  },
  computed: {
    displaySeats() {
      return this.seats;
    },
    displayUsers() {
      return this.users.slice(0, this.displayUsersLen);
    },
  },
  mounted() {
    const self = this;
    // 周杰伦演唱会
    this.jayChouConcert = new Seats({
      block: 4,
      front: 5,
      back: 40,
      step: 2,
    });

    const { seats } = this.jayChouConcert;

    this.seats = seats;

    for (let index = 0; index < 1000; index += 1) {
      const user = new User();

      setTimeout(function() {
        self.users.unshift(user);
        if (self.jayChouConcert.remain - user.ticket >= 0) {
          self.jayChouConcert.purchaseTicket(user.ticket);
        } else {
          user.disabled = true;
        }
      }, randomNumber(index * 100, index * 150));
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
.seat-rows {
  line-height: 5px;
}
.seat-cols {
  display: inline-block;
  line-height: 5px;
  height: 5px;
}
.intro {
  font-size: 10px;
  margin: 20px;
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

.users {
  padding: 20px;
  text-align: left;
  font-size: 12px;
}
.user {
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;
}
</style>
