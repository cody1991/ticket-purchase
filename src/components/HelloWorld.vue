<!--
 * @Author: codytang
 * @Date: 2020-07-09 21:10:07
 * @LastEditTime: 2020-07-12 18:26:47
 * @LastEditors: codytang
 * @Description: 
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 20px;
}
</style>
