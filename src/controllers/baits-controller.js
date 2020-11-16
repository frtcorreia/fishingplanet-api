const mysql = require("../db/mysql");

exports.getBait = async (req, res, next) => {
  try {
    const result = await mysql.execute("SELECT * FROM bait;");
    const response = {
      length: result.length,
      baits: result.map((prod) => {
        return {
          id: prod.id,
          name: prod.name,
          description: prod.description,
          photo: prod.photo,
          status: prod.status,
          bait_brand_id: prod.bait_brand_id,
        };
      }),
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.postBait = async (req, res, next) => {
  try {
    const query =
      "INSERT INTO bait (name, description, photo, status, bait_brand_id) VALUES (?,?,?,?,?)";
    const result = await mysql.execute(query, [
      req.body.name,
      req.body.description,
      req.body.photo,
      req.body.status,
      req.body.bait_brand_id,
    ]);

    const response = {
      message: "Bait Inserted Success",
      createdBaitBrand: {
        id: result.insertId,
        name: req.body.name,
        description: req.body.description,
        photo: req.body.photo,
        status: req.body.status,
        bait_brand_id: req.body.bait_brand_id,
      },
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.getBaitDetail = async (req, res, next) => {
  try {
    const query = "SELECT * FROM bait WHERE id = ?;";
    const result = await mysql.execute(query, [req.params.id]);

    if (result.length == 0) {
      return res.status(404).send({
        message: "Bait not found",
      });
    }
    const response = {
      product: {
        id: result[0].id,
        name: result[0].name,
        description: result[0].description,
        photo: result[0].photo,
        status: result[0].status,
        bait_brand_id: result[0].bait_brand_id,
      },
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.updateBait = async (req, res, next) => {
  try {
    const query = ` UPDATE bait SET name = ?, description = ?, photo = ?, status = ?, bait_brand_id = ? WHERE id = ?`;
    await mysql.execute(query, [
      req.body.name,
      req.body.description,
      req.body.photo,
      req.body.status,
      req.body.bait_brand_id,
      req.params.id,
    ]);
    const response = {
      message: "Bait Updated Successfully",
      upatedProduct: {
        idbait: req.params.idbait,
        name: req.body.name,
        description: req.body.description,
        photo: req.body.photo,
        status: req.body.status,
        bait_brand_id: req.body.bait_brand_id,
      },
    };
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.deleteBait = async (req, res, next) => {
  try {
    const query = `DELETE FROM bait WHERE id = ?`;
    await mysql.execute(query, [req.params.id]);

    const response = {
      message: "Bait Deleted Successfully",
    };
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
