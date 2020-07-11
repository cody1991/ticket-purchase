<!--
 * @Author: codytang
 * @Date: 2020-07-10 22:13:27
 * @LastEditTime: 2020-07-11 12:21:51
 * @LastEditors: codytang
 * @Description: 展示用户购票行为
-->

<template>
  <div class="users">
    <div class="user" v-for="user in users" :key="user.id">
      <span v-if="!user.disabled">
        用户 {{ user.name }} (ID: {{ user.id && user.id.slice(0, 4) }}) 购买了
        {{ user.ticket }} 张票
        <span
          v-for="pos in user.purchaseTicketPos"
          :key="pos.row + pos.col"
          class="pos"
          >{{ pos.row }}排{{ pos.col }}座</span
        >
      </span>
      <span v-else style="color: red;">
        用户 {{ user.name }} (ID: {{ user.id && user.id.slice(0, 10) }})
        购票失败
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.users {
  padding: 20px;
  text-align: left;
  font-size: 12px;
}
.user {
  border-bottom: 1px solid #eee;
  margin-bottom: 18px;
  padding-bottom: 5px;
}
.pos {
  border: 1px solid #000;
  margin: 0 2px;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
