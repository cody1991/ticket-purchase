<!--
 * @Author: codytang
 * @Date: 2020-07-10 22:13:27
 * @LastEditTime: 2020-07-10 22:14:05
 * @LastEditors: codytang
 * @Description: 展示用户购票行为
-->

<template>
  <div class="users">
    <div class="user" v-for="user in users" :key="user.id">
      <span v-if="!user.disabled">
        用户 {{ user.name }} (ID: {{ user.id && user.id.slice(0, 10) }}) 购买了
        {{ user.ticket }} 张票
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

<style></style>
