<!--
 * @Author: codytang
 * @Date: 2020-07-10 22:13:27
 * @LastEditTime: 2020-07-11 15:14:15
 * @LastEditors: codytang
 * @Description: 展示用户购票行为
-->

<template>
  <div class="users">
    <div class="user" v-for="user in users" :key="user.id">
      用户 {{ user.name }} (ID: {{ user.id && user.id.slice(0, 4) }})
      <span v-if="user.status === 'SUCCESS'" class="success">
        购买了
        {{ user.ticket }} 张票
        <div class="pos-group">
          <span
            v-for="pos in user.purchaseTicketPos"
            :key="pos.row + '-' + pos.col"
            class="pos"
            >{{ pos.block }}区{{ pos.row }}排{{ pos.col }}座</span
          >
        </div>
      </span>
      <span v-else-if="user.status === 'FAIL'" class="error">
        购票失败
      </span>
      <span v-else-if="user.status === 'REFUND'" class="warning">
        退票成功
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
}
.pos-group {
  margin: 5px 0;
}
.pos {
  border: 1px solid #67c23a;
  margin: 0 2px;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
