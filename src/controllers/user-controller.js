const mysql = require("../db/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await mysql.execute("SELECT * FROM users;");

    const response = {
      length: result.length,
      users: result.map((prod) => {
        return {
          id: prod.id,
          firstname: prod.firstname,
          lastname: prod.lastname,
          email: prod.email,
          photo: prod.photo,
          createdAt: prod.createdAt,
        };
      }),
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.getUserDetail = async (req, res, next) => {
  try {
    const query = "SELECT * FROM users WHERE id = ?;";
    const result = await mysql.execute(query, [req.params.id]);

    if (result.length == 0) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const response = {
      user: {
        id: result[0].id,
        firstname: result[0].firstname,
        lastname: result[0].lastname,
        email: result[0].email,
        photo: result[0].photo,
        createdAt: result[0].createdAt,
      },
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const query = ` UPDATE users SET firstname = ?, lastname = ?, email = ?, photo = ? WHERE id = ?`;

    await mysql.execute(query, [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.photo,
      req.params.id,
    ]);
    const response = {
      message: "User Updated Successfully",
      upatedUser: {
        id: req.params.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        name: req.body.email,
        photo: req.body.photo,
      },
    };
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const query = `DELETE FROM users WHERE id = ?`;
    await mysql.execute(query, [req.params.id]);

    const response = {
      message: "User Deleted Successfully",
    };
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    var results = await mysql.execute(query, [req.body.email]);

    if (results.length < 1) {
      return res.status(401).send({ message: "Auth failed" });
    }

    if (await bcrypt.compareSync(req.body.password, results[0].password)) {
      const token = jwt.sign(
        {
          userId: results[0].userId,
          email: results[0].email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).send({
        message: "Auth successfully",
        user: {
          firstname: results[0].firstname,
          lastname: results[0].lastname,
          email: results[0].email,
          photo: results[0].photo,
        },
        token: token,
      });
    }
    return res.status(401).send({ message: "Auth failed" });
  } catch (error) {
    return res.status(500).send({ message: "Auth failed" });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    var query = `SELECT * FROM users WHERE email = ?`;
    var result = await mysql.execute(query, [req.body.email]);

    if (result.length > 0) {
      return res
        .status(409)
        .send({ message: "This user is already registered" });
    }

    const hash = await bcrypt.hashSync(req.body.password, 10);

    query =
      "INSERT INTO users (firstname, lastname, email, password, photo, createdAt) VALUES (?,?,?,?,?,?)";
    const results = await mysql.execute(query, [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hash,
      req.body.photo,
      req.body.createdAt,
    ]);

    const response = {
      message: "User created successfully",
      createdUser: {
        userId: results.insertId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        photo: req.body.photo,
        createdAt: req.body.createdAt,
      },
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.updateUserPwd = async (req, res, next) => {
  try {
    const query = ` UPDATE users SET password = ? WHERE email = ?`;
    //console.log(query);
    const hash = await bcrypt.hashSync(req.body.password, 10);
    await mysql.execute(query, [hash, req.body.email]);
    const response = {
      message: "User Updated Successfully",
      upatedUserPwd: {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        name: req.body.email,
        photo: req.body.photo,
      },
    };
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
