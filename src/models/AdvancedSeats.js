/*
 * @Author: codytang
 * @Date: 2020-07-11 18:57:35
 * @LastEditTime: 2020-07-11 23:58:18
 * @LastEditors: codytang
 * @Description: 优化选座位算法
 */

import { randomNumber } from "@/libs/utils";
import Seats from "./Seats";
class AdvancedSeats extends Seats {
  constructor(options = {}) {
    super(options);
  }

  purchaseTicket(user) {
    const { ticket } = user;
    this.used += ticket;
    let selectSeatIndex = randomNumber(0, this.freeMap.size - 1); // 随机选择一个点
    const freeMapArray = Array.from(this.freeMap.entries());
    const selectSeatItems = []; // 最后统一删除
    const curUsedList = [];

    for (let index = 0; index < ticket; index += 1) {
      const selectItem = freeMapArray[selectSeatIndex];
      const [key, value] = selectItem;
      const [row, col] = key.split("-");
      this.seats[row][col] = Object.assign(this.seats[row][col], {
        state: 1,
        user,
      });
      curUsedList.push({
        row,
        col,
        block: value.block,
      });
      selectSeatItems.push(selectItem);
      if (selectSeatIndex + 1 < this.freeMap.size) {
        selectSeatIndex = selectSeatIndex + 1;
      } else {
        selectSeatIndex = 0;
      }
    }
    selectSeatItems.map((item) => {
      const [key, value] = item;
      this.freeMap.delete(key);
      this.busyMap.set(key, value);
    });
    return curUsedList;
  }

  refundTicket(user) {
    if (!user || !user.purchaseTicketPos || user.purchaseTicketPos.length === 0)
      return;
    user.purchaseTicketPos.map((ticket) => {
      const { row, col } = ticket;
      this.seats[row][col] = Object.assign(this.seats[row][col], {
        state: 0,
        user: null,
      });

      const key = `${row}-${col}`;
      this.freeMap.set(key, {
        row,
        col,
        block: this.seats[row][col].block,
      });
      this.busyMap.delete(key);
    });
    this.used -= user.purchaseTicketPos.length;
  }
}

export default AdvancedSeats;
