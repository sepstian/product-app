const { errorResponse } = require("../helper/utils");
const { Status } = require("../models");

module.exports = {
  getStatus: async (req, res, next) => {
    try {
      const result = await Status.findAll();
      return res.status(200).send(result);
    } catch (error) {
      next(errorResponse(500, false, "Error Get Status", null, error.message));
    }
  },
  createStatus: async (req, res, next) => {
    try {
      const checkStatus = await Status.findOne({
        where: {
          nama_status: req.body.nama_status,
        },
      });
      if (checkStatus) {
        return res.status(200).send({
          succes: false,
          message: "Status is exist",
        });
      }
      const result = await Status.create(req.body);
      return res.status(200).send({ result });
    } catch (error) {
      next(
        errorResponse(500, false, "Error Create Status", null, error.message)
      );
    }
  },
};
