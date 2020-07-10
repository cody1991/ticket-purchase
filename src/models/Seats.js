/*
 * @Author: codytang
 * @Date: 2020-07-09 21:16:00
 * @LastEditTime: 2020-07-10 00:27:16
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
    for (let rows = 0; rows < this.floor; rows++) {
      const floorLen = (this.back - this.step * rows) * this.block;
      this.seats[rows] = Array(floorLen).fill(0); // 初始化为0，代表还没有售出
      this.sum += floorLen;
    }
  }

  get remain() {
    return this.sum - this.used;
  }

  purchaseTicket(ticketNumber) {
    this.used += ticketNumber;
    let count = ticketNumber;
    // 简单实现
    for (let rows = 0; rows < this.floor; rows += 1) {
      const curItem = this.seats[rows];
      const rowsLen = curItem.length;

      for (let cols = 0; cols < rowsLen; cols += 1) {
        if (curItem[cols] === 0 && count !== 0) {
          curItem[cols] = 1;
          count = count - 1;
        }

        if (count === 0) break;
      }
      if (count === 0) break;
    }
  }
}

export default Seats;
