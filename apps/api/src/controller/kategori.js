const { errorResponse } = require("../helper/utils");
const { Kategori } = require("../models");

module.exports = {
    getKategori: async (req, res, next) => {
        try {
            const result = await Kategori.findAll()
            return res.status(200).send(result)
        } catch (error) {
            next(errorResponse(500, false, "Error Get Category", null, error.message))
        }
    },
  createKategori: async (req, res, next) => {
    try {
      const checkKategori = await Kategori.findOne({
        where: {
          nama_kategori: req.body.nama_kategori,
        },
      });
      if (checkKategori) {
        return res.status(200).send({
          succes: false,
          message: "Kategori is exist",
        });
      }
      const result = await Kategori.create(req.body);
      return res.status(200).send({result});
    } catch (error) {
      next(
        errorResponse(500, false, "Error Create Category", null, error.message)
      );
    }
  },
};
