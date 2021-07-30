'use strict';

const Controller = require('egg').Controller;

class RoomController extends Controller {
  async createRoom() {
    const { ctx } = this;
    const roomname = ctx.request.body.name;
    const res = await ctx.service.room.createRoom(roomname);
    if (res) {
      ctx.body = res;
    } else {
      ctx.body = 'error';
      ctx.status = 400;
    }
  }

  async getRoomInfo() {
    const { ctx } = this;
    const roomid = ctx.params.roomid;
    const res = await ctx.service.room.getRoomInfo(roomid);
    if (!res) {
      ctx.status = 400;
      ctx.body = 'Invalid Room ID';
    } else {
      ctx.status = 200;
      ctx.body = res;
    }
  }

  async getRoomUsers() {
    const { ctx } = this;
    const roomid = ctx.params.roomid;
    const res = await ctx.service.room.getRoomUsers(roomid);
    if (!res) {
      ctx.status = 400;
      ctx.body = 'Invalid Room ID';
    } else {
      ctx.status = 200;
      ctx.body = res;
    }
  }
  async roomList() {
    const { ctx } = this;
    const res = await ctx.service.room.roomList(ctx.request.body);
    if (!res) {
      ctx.status = 400;
      ctx.body = 'Error';
    } else {
      ctx.status = 200;
      ctx.body = res;
    }
  }
}

module.exports = RoomController;
