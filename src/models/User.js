/*
 * @Author: codytang
 * @Date: 2020-07-09 22:57:56
 * @LastEditTime: 2020-07-11 00:37:02
 * @LastEditors: codytang
 * @Description: 管理用户
 */

import { randomString, randomNumber } from "@/libs/utils";

class User {
  /**
   * ticketLimit为购票上限
   */
  static ticketLimit = 5;

  constructor() {
    /**
     * @description: 创建随机购票用户
     * @return:
     */

    this.name = randomString(randomNumber(5, 10));
    this.id = randomString(32);
    this.ticket = randomNumber(1, User.ticketLimit);
  }
}

export default User;
