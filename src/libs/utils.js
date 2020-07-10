/*
 * @Author: codytang
 * @Date: 2020-07-09 23:06:47
 * @LastEditTime: 2020-07-10 00:13:28
 * @LastEditors: codytang
 * @Description: 公共函数
 */

function randomString(len) {
  const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  while (len--) {
    result += text[Math.floor(Math.random() * text.length)];
  }
  return result;
}

function randomNumber(from, to) {
  if (from > to) [from, to] = [to, from];
  return from + Math.floor(Math.random() * (to - from + 1));
}

export { randomString, randomNumber };
