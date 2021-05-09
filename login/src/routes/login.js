const db = require("../database/mysqlConnection");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const moment = require("moment");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let sql = `SELECT * from userCredentials where email = ?`;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results && results.length > 0) {
      const isCompared = await bcrypt.compare(password, results[0].password);
      console.log(results);
      if (isCompared) {
        res.send({
          message: "login sucessful",
          ...results[0],
        });
        var mysqlTimestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const userId = results[0].userId;

        let sql2 = `SELECT * from userStatus where userId = ?`;
        let sql3 = `INSERT INTO userStatus SET ?`;
        let sql4 = `UPDATE userStatus SET ? where userId = ?`;

        db.query(sql2, [userId], (err, results) => {
          if (err) {
            console.log(err);
          }
          if (results.length <= 0) {
            let userStatus = {
              userState: "online",
              timeStamp: mysqlTimestamp,
              userId,
            };
            db.query(sql3, userStatus, (err) => {
              if (err) {
                return;
              } else {
                return;
              }
            });
          } else {
            let userStatus = {
              userState: "online",
              timeStamp: mysqlTimestamp,
              userId,
            };
            db.query(sql4, [userStatus, userId], (err) => {
              if (err) {
                return;
              } else {
                return;
              }
            });
          }
        });
      } else {
        res.send({
          message: "Email and password does not match",
        });
      }
    } else {
      console.log(results.length);
      res.send({
        message: "Email does not exits",
      });
    }
  });
});

module.exports = router;
