'use strict';
const Service = require('egg').Service;

class UserService extends Service {


  async getUserByName(username) {
    const app = this.app;
    const user = await app.mysql.query('select firstName, lastName, email, phone from user where username = ?', username);
    return user;
  }

  async createUser(data) {
    const app = this.app;
    const result = await app.mysql.insert('user', { username: data.username, firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password, phone: data.phone });
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }

  async login(data) {
    const app = this.app;
    const query = await app.mysql.get('user', { username: data.username, password: data.password });
    console.log(query);
    if (query == null) {
      return false;
    }
    await this.app.mysql.delete('state', { userid: query.id });
    return query.id;
  }

  async enterRoom(roomid, userid) {
    const app = this.app;
    const query = await app.mysql.get('room', { id: roomid });
    if (query == null) {
      return false;
    }
    const isInRoom = await app.mysql.get('state', { userid, roomid });
    if (isInRoom == null) {
      const res = await app.mysql.query('INSERT INTO state VALUES (?,?) ON DUPLICATE KEY UPDATE userid=VALUES(userid),roomid=VALUES(roomid);', [ userid, roomid ]);
      console.log(res);
      // ('state', { userid, roomid });
    }
    return true;
  }

  async leaveRoom(userid) {
    const app = this.app;
    const result = await app.mysql.delete('state', { userid });
    console.log(result);
    return true;
  }

  async send(data) {
    const app = this.app;
    const result = await app.mysql.get('state', { userid: data.id });
    if (result == null) {
      console.log('no such room');
      return false;
    }
    return app.mysql.insert('record', { userid: data.id, text: data.text, roomid: result.roomid });
  }

  async retrive(userid, data) {
    const app = this.app;
    const userState = await app.mysql.get('state', { userid });
    if (userState == null) {
      return false;
    }
    const roomid = userState.roomid;
    console.log(data.pageIndex);

    if (isNaN(data.pageIndex) || isNaN(data.pageSize)) {
      return false;
    }
    let startIndex = 0;
    const index = data.pageIndex;
    let pageSize = data.pageSize;
    const recordAmount = await app.mysql.query('SELECT count(1) as amount from record where roomid = ? ', roomid);
    if (index < 0) {
      startIndex = recordAmount[0].amount + index * pageSize;
    } else {
      startIndex = index * pageSize;
    }
    const endIndex = startIndex + pageSize;

    console.log('startIndex is ' + startIndex + ' endIndex is: ' + endIndex);

    if (startIndex > recordAmount) {
      startIndex = 0;
      pageSize = 0;
    } else if (startIndex < 0 && endIndex < 0) {
      startIndex = 0;
      pageSize = 0;
    } else if (startIndex < 0) {
      startIndex = 0;
    }
    try {
      return app.mysql.query('SELECT userid as id, text, unix_timestamp(timestamp) as timestamp from record where roomid = ? limit ?, ?', [ roomid, startIndex, pageSize ]);
    } catch (err) {
      return false;
    }
  }
}

module.exports = UserService;
