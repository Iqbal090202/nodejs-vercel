const pool = require("../config/connect");
pool.on("error", (err) => {
  console.error(err);
});

function getCurrentDate() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
}

module.exports = {
  getUsers(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
        SELECT name, address, telp, age, created_at FROM users WHERE deleted_at IS NULL
      `,
        function (error, results) {
          if (error) throw error;
          res.json({
            success: true,
            message: "Success",
            data: results,
          });
        }
      );
      connection.release();
    });
  },
  getUserByID(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT name, address, telp, age, created_at FROM users WHERE deleted_at IS NULL AND id = ?`,
        [id],
        function (error, results) {
          if (error) throw error;
          res.json({
            success: true,
            message: "Success",
            data: results[0] ? results[0] : results,
          });
        }
      );
      connection.release();
    });
  },
  addUser(req, res) {
    const currentDate = getCurrentDate()
    let data = {
      name: req.body.name,
      address: req.body.address,
      telp: req.body.telp,
      age: req.body.age,
      created_at: currentDate,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO users SET ?`,
        [data],
        function (error, results) {
          if (error) throw error;
          res.json({
            success: true,
            message: "Data Created",
          });
        }
      );
      connection.release();
    });
  },
  updateUser(req, res) {
    let data = {
      name: req.body.name,
      address: req.body.address,
      telp: req.body.telp,
      age: req.body.age,
    };
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE users SET ? WHERE id = ?`,
        [data, id],
        function (error, results) {
          if (error) throw error;
          res.json({
            success: true,
            message: "Data Updated",
          });
        }
      );
      connection.release();
    });
  },
  deleteUser(req, res) {
    const currentDate = getCurrentDate()
    let dataUpdate = {
      deleted_at: currentDate,
    };
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE users SET ? WHERE id = ?`,
        [dataUpdate, id],
        function (error, results) {
          if (error) throw error;
          res.json({
            success: true,
            message: "Data Deleted",
          });
        }
      );
      connection.release();
    });
  },
};
