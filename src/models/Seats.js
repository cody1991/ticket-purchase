/*
 * @Author: codytang
 * @Date: 2020-07-09 21:16:00
 * @LastEditTime: 2020-07-12 15:28:45
 * @LastEditors: codytang
 * @Description: 生成演唱会座位
 */

class Seats {
  /**
   * @description:
   * @param {Number} options.block 代表有几个区域
   * @param {Number} options.front 代表第一排的数量
   * @param {Number} options.back 代表最后一排的数量
   * @param {Number} options.step 代表每一排的递减数量
   * @return: null
   */

  constructor({ block = 5, front = 50, back = 100, step = 2 }) {
    if (back < front) [back, front] = [front, back];

    this.block = block;
    this.front = front;
    this.back = back;
    this.step = step;
    this.sum = 0; // 座位总数，直接存下来，方便获取
    this.used = 0; // 已经售出的座位

    this.freeMap = new Map(); // 未售出

    /**
     * 计算楼层数
     * front + step * (floor - 1) = back
     * ===>
     * floor = (back - front) / step + 1
     */
    this.floor = Math.floor((this.back - this.front) / this.step) + 1;

    /**
     * 用户可能输入的最后一层数量有误，这里简单调整下
     */
    const checkBack = this.front + this.step * (this.floor - 1);
    if (checkBack !== this.back) {
      this.back = checkBack;
    }

    console.log(
      `Seats init with \nblock ${this.block} \nfront ${this.front} \nback ${this.back} \nstep ${this.step} \nfloor ${this.floor}`
    );
    this.seats = [];
    for (let row = 0; row < this.floor; row++) {
      const rowsLen = (this.front + this.step * row) * this.block;
      this.seats[row] = [];
      for (let col = 0; col < rowsLen; col += 1) {
        const item = {
          state: 0, // 初始化为0，代表还没有售出
          user: null,
          block: this.calcBlock(col, rowsLen, this.block),
        };
        this.seats[row].push(item);
        this.freeMap.set(`${row}-${col}`, item);
      }

      this.sum += rowsLen;
    }
  }

  get remain() {
    return this.sum - this.used;
  }

  purchaseTicket(user) {
    const { ticket } = user;
    this.used += ticket;
    let count = ticket;
    const curUsedList = [];
    // 简单实现
    for (let row = 0; row < this.floor; row += 1) {
      const curItem = this.seats[row];
      const rowsLen = curItem.length;
      for (let col = 0; col < rowsLen; col += 1) {
        if (curItem[col].state === 0 && count !== 0) {
          this.seats[row][col] = Object.assign(curItem[col], {
            state: 1,
            user,
          });

          curUsedList.push({
            row,
            col,
            block: curItem[col].block,
          });
          count = count - 1;
        }
        if (count === 0) break;
      }
      if (count === 0) break;
    }
    return curUsedList;
  }

  calcBlock(col, rowsLen, block) {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[
      Math.floor(col / (rowsLen / block))
    ]; // 简单获取区块标识，从A-Za-z，不能超过 26 * 2
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
    });
    this.used -= user.purchaseTicketPos.length;
  }
}

export default Seats;
