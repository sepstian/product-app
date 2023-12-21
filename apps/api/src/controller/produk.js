const { errorResponse } = require("../helper/utils");
const { Produk, Kategori, Status } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  getProduk: async (req, res, next) => {
    try {
      const result = await Produk.findAll({
        include: [
          {
            model: Kategori,
            attributes: ["nama_kategori"],
          },
          {
            model: Status,
            attributes: ["nama_status"],
          },
        ],
      });
      if (result) {
        const { id, nama_produk, harga, kategori_id, status_id } = result;
        const token = jwt.sign({
          id,
          nama_produk,
          harga,
          kategori_id,
          status_id,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "24h"
        }
        );
        return res.status(200).send({
          message: {
            result,
            token
          }
        });
      }
    } catch (error) {
      next(errorResponse(500, false, "Error Get Produk", null, error.message));
    }
  },
  getStatusProduk: async (req, res, next) => {
    try {
      const result = await Produk.findAll({
        where: {
          status_id: req.params.id
        },
        include: [
          {
            model: Kategori,
            attributes: ["nama_kategori"],
          },
          {
            model: Status,
            attributes: ["nama_status"],
          },
        ],
      });

      if (result) {
        const { id, nama_produk, harga, kategori_id, status_id } = result;
        const token = jwt.sign({
          id,
          nama_produk,
          harga,
          kategori_id,
          status_id,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "24h"
        }
        );
        return res.status(200).send({
          message: {
            result,
            token
          }
        });
      } else {
        return res.status(404).send({
          message: "Produk dengan status_id 1 tidak ditemukan."
        });
      }
    } catch (error) {
      next(errorResponse(500, false, "Error Get Produk", null, error.message));
    }
  },
  createProduk: async (req, res, next) => {
    try {
      const checkProduk = await Produk.findOne({
        where: {
          nama_produk: req.body.nama_produk,
        },
      });
      if (checkProduk) {
        return res.status(400).send({
          succes: false,
          message: "Produk is exist",
        });
      }
      const result = await Produk.create(req.body);
      const token = jwt.sign(
        {
          id: result.id,
          nama_produk: result.nama_produk,
          harga: result.harga,
          kategori_id: result.kategori_id,
          status_id: result.status_id,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).send({
        message: {
          ...result,
          token,
        },
      });
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
      const update = await Produk.update(
        { ...updateData },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.status(200).send(update);
    } catch (error) {
      next(errorResponse(500, false, "Error Edit Produk", null, error.message));
    }
  },
  deleteProduk: async (req, res, next) => {
    try {
      const hapus = await Produk.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (hapus) {
        return res.status(200).send({
          succes: true,
          message: "Succes Delete Produk",
        });
      }
    } catch (error) {
      next(
        errorResponse(500, false, "Error Delete Produk", null, error.message)
      );
    }
  },
};

// {
//   "nama_produk" : "Meja makan MEWAH",
//   "harga" : 50000,
//   "kategori_id" : 1,
//   "status_id" : 1
// }
