/*
 * @Author: codytang
 * @Date: 2020-07-11 18:57:35
 * @LastEditTime: 2020-07-12 18:20:27
 * @LastEditors: codytang
 * @Description: 优化选座位算法
 */

import { randomNumber } from "@/libs/utils";
import Seats from "./Seats";
class AdvancedSeats extends Seats {
  constructor(options = {}) {
    super(options);

    this.adjacentSeatCount = 0;
    this.notAdjacentSeatCount = 0;
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
    console.log("```````");
    console.log(`${user.name} 开始购票，票数为 ${ticket}`);
    if (this.remain < ticket) {
      console.log("票太少啦");
      return;
    }
    const freeMapArray = Array.from(this.freeMap.entries());
    const curUsedList = [];
    const selectSeatKeys = []; // 最后统一删除
    let hadFound = false;
    const noSpaceSeat = new Map();
    while (!hadFound && noSpaceSeat.size < this.freeMap.size) {
      let selectSeatIndex = randomNumber(0, this.freeMap.size - 1); // 随机选择一个点
      const selectItem = this.getSeatInfo(freeMapArray, selectSeatIndex);
      const { row: targetRow, col: targetCol } = selectItem;

      if (noSpaceSeat.get(`${targetRow}-${targetCol}`)) {
        console.log("这个已经不能再用啦");
        continue;
      }

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

      if (maxSeat.col - minSeat.col + 1 < ticket) {
        for (let index = minSeat.col; index <= maxSeat.col; index += 1) {
          noSpaceSeat.set(`${targetRow}-${index}`, true);
        }
        continue;
      } else {
        const curSeat = minSeat;
        for (let index = 0; index < ticket; index += 1) {
          const { row, col } = curSeat;
          const key = `${row}-${col}`;
          this.seats[row][col] = Object.assign(this.seats[row][col], {
            state: 1,
            user,
          });
          const selectKey = this.freeMap.get(key);
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
        this.used += ticket;
        this.adjacentSeatCount += 1;
        hadFound = true;
      }
    }

    if (noSpaceSeat.size === this.freeMap.size && noSpaceSeat.size > 0) {
      // 无法邻座
      console.log("无法邻座");
      this.notAdjacentSeatCount += 1;
      let selectSeatIndex = randomNumber(0, this.freeMap.size - 1); // 随机选择一个点
      for (let index = 0; index < ticket; index += 1) {
        const selectItem = this.getSeatInfo(freeMapArray, selectSeatIndex);
        const { row, col } = selectItem;
        const key = `${row}-${col}`;
        this.seats[row][col] = Object.assign(this.seats[row][col], {
          state: 1,
          user,
        });
        const selectKey = this.freeMap.get(key);
        curUsedList.push({
          row,
          col,
          block: selectKey.block,
        });
        selectSeatKeys.push(key);
        if (selectSeatIndex + 1 < this.freeMap.size) {
          selectSeatIndex = selectSeatIndex + 1;
        } else {
          selectSeatIndex = 0;
        }
      }
      selectSeatKeys.map((key) => {
        this.freeMap.delete(key);
      });
      this.used += ticket;
    }

    if (curUsedList.length > 0) {
      console.log(
        `他选择了`,
        curUsedList
          .map((item) => `${item.block}区${item.row}排${item.col}座`)
          .join(", ")
      );
      console.log("```````");
    } else {
      console.log(`他购票失败`);
    }

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
    });
    this.used -= user.purchaseTicketPos.length;
  }
}

export default AdvancedSeats;
