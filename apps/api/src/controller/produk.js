const { errorResponse } = require("../helper/utils");
const { Produk, Kategori, Status } = require("../models");

module.exports = {
  getProduk: async (req, res, next) => {
    try {
      const result = await Produk.findAll({
        include: [
          {
            model: Kategori,
            as: 'kategori',
            attributes: ['nama_kategori']
          },
          {
            model: Status,
            as: 'status',
            attributes: ['nama_status']
          }
        ]
      })
      return res.status(200).send(result)
    } catch (error) {
      next(errorResponse(500, false, "Error Get Produk", null, error.message));
    }
  },
  createProduk: async (req, res, next) => {
    try {
      const checkProduk = await Produk.findOne({
        where: {
          nama_produk: req.body.nama_produk
        }
      })
      if (checkProduk) {
        return res.status(400).send({
          succes: false,
          message: "Produk is exist",
        });
      }
      const result = await Produk.create(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(errorResponse(500, false, "Error Produk", null, error.message));
    }
  },
  editProduk: async (req, res, next) => {
    try {
      const updateData = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        kategori_id: req.body.kategori_id,
        status_id: req.body.status_id,
      };
      const update = await Produk.update({ ...updateData },
        {
            where: {
                id: req.body.id
            }
        })
        return res.status(200).send(update)
    } catch (error) {
      next(errorResponse(500, false, "Error Edit Produk", null, error.message));
    }
  },
  deleteProduk: async(req, res, next) => {
    try {
      const hapus = await Produk.destroy({
        where: {
          id: req.body.id
        }
      })
      return res.status(200).send(hapus)
    } catch (error) {
      next(errorResponse(500, false, "Error Delete Produk", null, error.message))
    }
  }
};
