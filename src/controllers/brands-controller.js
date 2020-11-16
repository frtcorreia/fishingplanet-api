const mysql = require("../db/mysql");

exports.getBaitBrands = async (req, res, next) => {
  try {
    const result = await mysql.execute("SELECT * FROM bait_brand;");
    const response = {
      length: result.length,
      bait_brands: result.map((prod) => {
        return {
          id: prod.id,
          brand: prod.brand,
          status: prod.status,
        };
      }),
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.postBaitBrand = async (req, res, next) => {
  try {
    const query = "INSERT INTO bait_brand (brand, status) VALUES (?,?)";
    const result = await mysql.execute(query, [
      req.body.brand,
      req.body.status,
    ]);

    const response = {
      message: "Bait Brand Inserted Success",
      createdBaitBrand: {
        id: result.insertId,
        brand: req.body.brand,
        status: req.body.status,
      },
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.getBaitBrandDetail = async (req, res, next) => {
  try {
    const query = "SELECT * FROM bait_brand WHERE id = ?";
    const result = await mysql.execute(query, [req.params.id]);

    if (result.length == 0) {
      return res.status(404).send({
        message: "Bait Brand not found",
      });
    }
    const response = {
      product: {
        idbait_brand: result[0].idbait_brand,
        brand: result[0].brand,
        status: result[0].status,
      },
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.updateBaitBrand = async (req, res, next) => {
  try {
    const query = "UPDATE bait_brand SET brand = ?, status = ? WHERE id = ?";
    await mysql.execute(query, [
      req.body.brand,
      req.body.status,
      req.params.idbait_brand,
    ]);
    const response = {
      message: "Bait Brand Updated Successfully",
      upatedProduct: {
        idbait_brand: req.params.idbait_brand,
        brand: req.body.brand,
        status: req.body.status,
      },
    };
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.deleteBaitBrand = async (req, res, next) => {
  try {
    const query = `DELETE FROM bait_brand WHERE id = ?`;
    await mysql.execute(query, [req.params.id]);

    const response = {
      message: "Bait Brand Deleted Successfully",
    };
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
