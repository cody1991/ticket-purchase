<!--
 * @Author: codytang
 * @Date: 2020-07-10 22:06:46
 * @LastEditTime: 2020-07-11 12:05:07
 * @LastEditors: codytang
 * @Description: README
-->

# Ticket Purchase [![Build Status](https://travis-ci.org/cody1991/ticket-purchase.svg?branch=master)](https://travis-ci.org/cody1991/ticket-purchase)

## 任务列表

- Class
  - [x] User: 购票用户信息与行为
  - [x] Seats: 演唱会座位信息
- Views
  - [x] Helloworld: 简单的项目介绍
  - [x] DisplaySeats: 展示演唱会座位
  - [ ] DisplayUsers: 展示用户购票
    - [x] 展示 n 排 n 座
    - [ ] 展示在第几个区域
  - [x] Intro: 演唱会现况
- Deploy (Github Pages)
  - [x] 手动构建: `sh ./deploy.sh`
  - [x] 自动构建: 接入 `Travis CI`
- Algorithm
  - [x] purchase ticket by order 按顺序购票，无太多逻辑
  - [ ] 随机购票
  - [ ] 邻座分配
