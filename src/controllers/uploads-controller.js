const uploadFile = require("../middleware/upload");

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    return res.status(201).send({
      message: "File uploded successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file:  ${err}`,
    });
  }
};

module.exports = {
  upload,
};
