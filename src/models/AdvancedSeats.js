/*
 * @Author: codytang
 * @Date: 2020-07-11 18:57:35
 * @LastEditTime: 2020-07-12 17:02:13
 * @LastEditors: codytang
 * @Description: 优化选座位算法
 */

import { randomNumber } from "@/libs/utils";
import Seats from "./Seats";
class AdvancedSeats extends Seats {
  constructor(options = {}) {
    super(options);
  }

  getSeatInfo(array, index) {
    const selectItem = array[index];
    const [key, value] = selectItem;
    let [row, col] = key.split("-");
    row = Number(row);
    col = Number(col);
    return {
      row,
      col,
      value,
    };
  }

  getSeatMin(row, col) {
    let result = null;
    while (this.freeMap.has(`${row}-${col}`) && col >= 0) {
      if (this.freeMap.get(`${row}-${col}`)) {
        result = {
          row,
          col,
        };
      }
      col--;
    }
    return result;
  }

  getSeatMax(row, col, colMax) {
    let result = null;
    while (this.freeMap.has(`${row}-${col}`) && col < colMax) {
      if (this.freeMap.get(`${row}-${col}`)) {
        result = {
          row,
          col,
        };
      }
      col++;
    }
    return result;
  }

  purchaseTicket(user) {
    const { ticket } = user;
    if (this.remain <= ticket) return;
    this.used += ticket;

    const freeMapArray = Array.from(this.freeMap.entries());
    const curUsedList = [];
    const selectSeatKeys = []; // 最后统一删除

    const maxCount = 5;
    let count = 0;

    let hadFound = false;

    while (!hadFound && count < maxCount) {
      let selectSeatIndex = randomNumber(0, this.freeMap.size - 1); // 随机选择一个点
      const selectItem = this.getSeatInfo(freeMapArray, selectSeatIndex);
      console.log("selectItem", selectItem);
      const { row: targetRow, col: targetCol } = selectItem;
      let minSeat = { row: targetRow, col: targetCol };
      let maxSeat = { row: targetRow, col: targetCol };
      const rowsLen = this.seats[targetRow].length;
      if (targetCol - 1 >= 0) {
        const getSeatMin = this.getSeatMin(targetRow, targetCol - 1);
        if (getSeatMin) minSeat = getSeatMin;
      }
      if (targetCol + 1 < rowsLen) {
        const getSeatMax = this.getSeatMax(targetRow, targetCol + 1, rowsLen);
        if (getSeatMax) maxSeat = getSeatMax;
      }

      count++;

      if (maxSeat.col - minSeat.col + 1 < ticket) {
        continue;
      } else {
        console.log(minSeat, maxSeat);
        const curSeat = minSeat;
        for (let index = 0; index < ticket; index += 1) {
          const { row, col } = curSeat;
          const key = `${row}-${col}`;
          this.seats[row][col] = Object.assign(this.seats[row][col], {
            state: 1,
            user,
          });
          const selectKey = this.freeMap.get(key);
          console.log(key, selectKey, this.freeMap);
          curUsedList.push({
            row,
            col,
            block: selectKey.block,
          });
          selectSeatKeys.push(key);
          curSeat.col += 1;
        }
        selectSeatKeys.map((key) => {
          this.freeMap.delete(key);
        });
        hadFound = true;
      }
    }

    return curUsedList;

    // const selectSeatItems = []; // 最后统一删除
    // const curUsedList = [];

    // for (let index = 0; index < ticket; index += 1) {
    //   const selectItem = freeMapArray[selectSeatIndex];
    //   const [key, value] = selectItem;
    //   let [row, col] = key.split("-");
    //   row = Number(row);
    //   col = Number(col);
    //   this.seats[row][col] = Object.assign(this.seats[row][col], {
    //     state: 1,
    //     user,
    //   });
    //   curUsedList.push({
    //     row,
    //     col,
    //     block: value.block,
    //   });
    //   selectSeatItems.push(selectItem);
    //   if (selectSeatIndex + 1 < this.freeMap.size) {
    //     selectSeatIndex = selectSeatIndex + 1;
    //   } else {
    //     selectSeatIndex = 0;
    //   }
    // }
    // selectSeatItems.map((item) => {
    //   const [key, value] = item;
    //   this.freeMap.delete(key);
    //
    // });
    // return curUsedList;
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
    });
    this.used -= user.purchaseTicketPos.length;
  }
}

export default AdvancedSeats;
