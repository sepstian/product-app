const { errorResponse } = require("../helper/utils");
const { Account } = require("../models");

module.exports = {
  createAccount: async (req, res, next) => {
    try {
      const checkAccount = await Account.findOne({
        where: {
          username: req.body.username,
        },
        attributes: { exclude: ["password"] },
      });
      if (checkAccount) {
        return res.status(400).send({
          succes: false,
          message: "Account is exist",
        });
      }
      const result = await Account.create(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(
        errorResponse(500, false, "Error Create Account", null, error.message)
      );
    }
  },
  loginAccount: async (req, res, next) => {
    try {
      const loginAccount = await Account.findOne({
        where: {
          username: req.body.username,
          password: req.body.password,
        },
        raw: true,
      });
      if (loginAccount) {
        return res.status(200).send({
          succes: true,
          message: "Selamat login",
          result: {
            username,
            password
          },
        });
      } else {
        return res.status(400).send({
            succes: false,
            message: "You unauthenticate, Create Account First",
        })
      }
    } catch (error) {
      next(
        errorResponse(500, false, "Error Login Account", null, error.message)
      );
    }
  },
};
