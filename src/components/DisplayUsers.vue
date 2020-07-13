<!--
 * @Author: codytang
 * @Date: 2020-07-10 22:13:27
 * @LastEditTime: 2020-07-13 12:31:34
 * @LastEditors: codytang
 * @Description: 展示用户购票行为
-->

<template>
  <div class="users">
    <div class="user" v-for="user in users" :key="user.id">
      用户 {{ user.name }}
      <!-- (ID: {{ user.id && user.id.slice(0, 4) }}) -->
      <span v-if="user.status === 'SUCCESS'" class="success">
        购买了
        {{ user.ticket }} 张票<span v-if="user.isAdjacentSeat" class="success"
          >（邻座）</span
        ><span v-else class="warning">（非邻座）</span>
        <div class="pos-group">
          <span
            v-for="pos in user.purchaseTicketPos"
            :key="pos.row + '-' + pos.col"
            class="pos"
            >{{ pos.block }}区{{ pos.row + 1 }}排{{ pos.col + 1 }}座</span
          >
        </div>
      </span>
      <span v-else-if="user.status === 'FAIL'" class="error">
        购票失败，需要购买 {{ user.ticket }} 张
      </span>
      <span v-else-if="user.status === 'REFUND'" class="warning">
        退票成功
        <div class="pos-group">
          <span
            v-for="pos in user.purchaseTicketPos"
            :key="pos.row + '-' + pos.col"
            class="pos"
            >{{ pos.block }}区{{ pos.row + 1 }}排{{ pos.col + 1 }}座</span
          >
        </div>
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
  padding: 18px 0;
}
.pos-group {
  margin: 0;
}
.pos {
  border: 1px solid #67c23a;
  margin: 18px 5px 0;
  padding: 4px;
  border-radius: 2px;
  box-sizing: border-box;
  white-space: nowrap;
  display: inline-block;
}
.warning .pos {
  border: 1px solid #e6a23c;
}
</style>
