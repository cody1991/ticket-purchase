/*
 * @Author: codytang
 * @Date: 2020-07-11 18:57:35
 * @LastEditTime: 2020-07-11 19:19:29
 * @LastEditors: codytang
 * @Description: 优化选座位算法
 */

import Seats from "./Seats";
class AdvancedSeats extends Seats {
  constructor(options = {}) {
    super(options);
  }

  seekFreeSeat() {
    for (let index = 0; index < this.seats.length; index += 1) {
      const rows = this.seats[index];

      console.log(rows);
    }
  }
}

export default AdvancedSeats;
