'use strict';
const Service = require('egg').Service;

class RoomService extends Service {
  async createRoom(data) {
    const app = this.app;
    const query = await app.mysql.get('room', { name: data });
    if (query == null) {
      const success = await app.mysql.insert('room', { name: data });
      return success.insertId;
    }
    return false;
  }

  async getRoomInfo(roomid) {
    const app = this.app;
    const query = await app.mysql.get('room', { id: roomid });
    if (query == null) {
      return false;
    }
    console.log(query.name);
    return query.name;
  }

  async getRoomUsers(roomid) {
    const app = this.app;
    const query = await app.mysql.get('room', { id: roomid });
    if (query == null) {
      return false;
    }
    const result1 = await app.mysql.query('select username from user where id in (select userid from state where roomid = ?)', roomid);
    const result = [];
    result1.forEach(function(obj) {
      result.push(obj.username);
    });
    return result;
  }

  async roomList() {
    const objList = await this.app.mysql.select('room');
    const result = [];
    objList.forEach(function(obj) {
      result.push(obj.name);
    });
    return result;
  }
}

module.exports = RoomService;
