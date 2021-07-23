'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // room
  router.post('/room', controller.room.createRoom);
  router.get('/room/:roomid', jwt, controller.room.getRoomInfo);
  router.get('/room/:roomid/users', jwt, controller.room.getRoomUsers);
  router.post('/room/roomList', jwt, controller.room.roomList);

  // room of user
  router.put('/room/:roomid/enter', jwt, controller.user.enterRoom);
  router.put('/roomLeave', jwt, controller.user.roomLeave);

  // user
  router.post('/user', controller.user.createUser);
  router.get('/user/userLogin', controller.user.userLogin);
  router.get('/user/:name', jwt, controller.user.getUserByName);

  // message
  router.post('/message/send', jwt, controller.user.send);
  router.post('/message/retrieve', jwt, controller.user.retrieve);

};
