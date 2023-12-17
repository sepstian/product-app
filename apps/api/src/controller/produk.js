const { errorResponse } = require("../helper/utils");
const { Produk } = require("../models");

module.exports = {
  getProduk: async (req, res, next) => {
    try {
      
    } catch (error) {
      next(errorResponse(500, false, "Error Get Produk", null, error.message));
    }
  },
  createProduk: async (req, res, next) => {
    try {
      const result = await Produk.create(req.body);
      return res.status(200).send({result});
    } catch (error) {
      next(errorResponse(500, false, "Error Produk", null, error.message));
    }
  },
  editProduk: async (req, res, next) => {
    try {
      const updateData = {
        nama_produk: req.body.nama_produk,
        kategori_id: req.body.kategori_id,
        status_id: req.body.status_id,
      };
      const update = await Produk.update({ ...updateData },
        {
            where: {
                id: req.body.id
            }
        })
        return res.status(200).send({update})
    } catch (error) {
      next(errorResponse(500, false, "Error Edit Produk", null, error.message));
    }
  },
};
