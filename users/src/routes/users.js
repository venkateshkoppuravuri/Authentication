const db = require("../database/mysqlConnection");
const express = require("express");
const router = new express.Router();
const moment = require("moment");

router.post("/users", (req, res) => {
  const { userId } = req.body;

  let uid = parseInt(userId);

  let sql = `select u.name from userstatus v, usercredentials u where u.userId=v.userId and v.userState='online' and u.userId != ?`;

  db.query(sql, [uid], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      console.log(result);
      res.send({
        users: result,
        message: "Users who are online",
      });
      return;
    } else {
      res.send({
        message: "All other users are offline",
      });
      return;
    }
  });
});

router.post("/logout", (req, res) => {
  const { userId } = req.body;
  var mysqlTimestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  let sql3 = `UPDATE userStatus SET ? where userId = ?`;
  let userStatus = {
    userState: "offline",
    timeStamp: mysqlTimestamp,
    userId,
  };
  db.query(sql3, [userStatus, userId], (err) => {
    if (err) {
      return;
    } else {
      res.send({
        message: "User is offline",
      });
      return;
    }
  });
});

module.exports = router;
