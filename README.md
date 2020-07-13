<!--
 * @Author: codytang
 * @Date: 2020-07-10 22:06:46
 * @LastEditTime: 2020-07-12 22:15:55
 * @LastEditors: codytang
 * @Description: README
-->

# Ticket Purchase [![Build Status](https://travis-ci.org/cody1991/ticket-purchase.svg?branch=master)](https://travis-ci.org/cody1991/ticket-purchase)

## Demo 地址

https://cody1991.github.io/ticket-purchase/?back=100&block=4&front=50&refundRate=0.1&sleepMax=50&step=2

## 任务列表

- Other
  - [x] 新增算法的流程图
  - [ ] 展示演唱会的位置使用 canvas 绘制，现在座位太多的话很卡。。（非必须）
- Class
  - [x] User: 购票用户信息与行为
  - [x] Seats: 演唱会座位信息
  - [x] AdvancedSeas: 继承 Seats，优化购票算法
- Views
  - [x] Helloworld: 简单的项目介绍
  - [x] DisplaySeats: 展示演唱会座位
  - [x] DisplayUsers: 展示用户购票
    - [x] 展示 n 排 n 座
    - [x] 展示在第几个区域
  - [x] Intro: 演唱会现况
- Deploy (Github Pages)
  - [x] 手动构建: `sh ./deploy.sh`
  - [x] 自动构建: 接入 `Travis CI`
- Algorithm
  - [x] purchase ticket by order 按顺序购票，无太多逻辑
  - [x] 支持退票
  - [x] 随机购票
  - [x] 邻座分配（只考虑横向的邻座）

## 流程图

![流程图](./public/flow.png)
