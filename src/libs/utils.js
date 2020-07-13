/*
 * @Author: codytang
 * @Date: 2020-07-09 23:06:47
 * @LastEditTime: 2020-07-13 10:27:09
 * @LastEditors: codytang
 * @Description: 公共函数
 */

function randomString(len) {
  const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  while (len--) {
    result += text[Math.floor(Math.random() * text.length)];
  }
  return result;
}

function randomNumber(from, to) {
  if (from > to) [from, to] = [to, from];
  return from + Math.floor(Math.random() * (to - from + 1));
}

function sleep(seconds) {
  return new Promise((res) => {
    setTimeout(res, seconds);
  });
}

function getUrlParams(search = window.location.search) {
  const params = search.slice(search.indexOf('?') + 1).split('&');
  return params.reduce((param, hash) => {
    const result = { ...param };
    const [key, val] = hash.split('=');
    if (val) result[key] = decodeURIComponent(val);
    return result;
  }, {});
}

export { randomString, randomNumber, sleep, getUrlParams };
