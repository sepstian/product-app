const { errorResponse } = require("../helper/utils");
const { Account } = require("../models");
const jwt = require("jsonwebtoken");

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
      const token = jwt.sign(
        {
          id: result.id,
          username: result.username,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send({
        message: {
          result,
          token,
        },
      });
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
          // password: req.body.password,
        },
        raw: true,
      });
      if (loginAccount) {
        const { id, username } = loginAccount;
        const token = jwt.sign(
          {
            id,
            username,
          },
          process.env.SCRT_TKN,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).send({
          succes: true,
          message: "Selamat login",
          result: {
            ...loginAccount,
            token,
          },
        });
      } else {
        return res.status(400).send({
          succes: false,
          message: "You unauthenticate, Create Account First",
        });
      }
    } catch (error) {
      next(
        errorResponse(500, false, "Error Login Account", null, error.message)
      );
    }
  },
  keepLogin: async (req, res, next) => {
    try {
      const result = await Account.findOne({
        where: {
          id: req.accountData.id,
        },
        raw: true,
      });
      const { id, username } = result;
      const token = jwt.sign({ id, username }, process.env.SCRT_TKN, {
        expiresIn: "1h",
      });
      return res.status(200).send({
        succes: true,
        result: {
          ...result,
          token
        }
      })
    } catch (error) {
      next(errorResponse(500, false, "Error Keep Login", null, error.message));
    }
  },
};
