'use strict';
const Controller = require('egg').Controller;


class UserController extends Controller {
  async createUser() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.user.createUser(data);
    ctx.body = res;
  }

  async userLogin() {
    const { ctx, app } = this;
    const res = await ctx.service.user.login(ctx.query);
    if (!res) {
      ctx.body = 'login failed!';
      ctx.status = 400;
    } else {
      const token = app.jwt.sign({
        username: ctx.query.username,
        userid: res,
      }, app.config.jwt.secret);
      ctx.body = token;
      ctx.status = 200;
    }
  }

  async getUserByName() {
    const { ctx } = this;
    console.log(ctx.state);
    const name = ctx.params.name;
    const res = await ctx.service.user.getUserByName(name);
    ctx.body = res;
  }

  async enterRoom() {
    const { ctx } = this;
    const roomid = ctx.params.roomid;
    const userid = ctx.state.user.userid;
    const res = await ctx.service.user.enterRoom(roomid, userid);
    if (res) {
      ctx.body = roomid;
      ctx.status = 200;
    } else {
      ctx.body = 'Invalid Room ID';
      ctx.status = 400;
    }
  }

  async roomLeave() {
    const { ctx } = this;
    const userid = ctx.state.user.userid;
    const res = await ctx.service.user.leaveRoom(userid);
    if (res) {
      ctx.body = 'left the room';
      ctx.status = 200;
    } else {
      ctx.body = 'error';
      ctx.status = 400;
    }
  }

  async send() {
    const { ctx } = this;
    const userid = ctx.state.user.userid;
    console.log(userid, ctx.request.body.id);
    if (userid !== ctx.request.body.id * 1) {
      ctx.status = 400;
      ctx.body = 'error userid';
    }
    const res = await ctx.service.user.send(ctx.request.body);
    if (!res) {
      ctx.status = 400;
      ctx.body = 'not enter room';
    } else {
      ctx.status = 200;
      ctx.body = 'success';
    }
  }

  async retrieve() {
    const { ctx } = this;
    const userid = ctx.state.user.userid;
    const res = await ctx.service.user.retrive(userid, ctx.request.body);

    if (!res) {
      ctx.status = 400;
      ctx.body = 'invaliad input';
    } else {
      ctx.status = 200;
      ctx.body = res;
    }
  }
}
module.exports = UserController;
