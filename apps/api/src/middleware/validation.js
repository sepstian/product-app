const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helper/utils");

module.exports = {
  validateToken: async (req, res, next) => {
    try {
      if (!req.token) {
        return res.status(400).send({
          succes: false,
          message: "You not have token",
        });
      } else {
        const verifyToken = jwt.verify(req.token, process.env.SCRT_TKN);
        if (!verifyToken) {
          return res.status(401).send({
            succes: false,
            message: "Unautorized request",
          });
        }
        req.accountData = verifyToken;
        next();
      }
    } catch (error) {
      next(
        errorResponse(500, false, "Error validateToken", null, error.message)
      );
    }
  },
  validateProduk: async (req, res, next) => {
    try {
      const verifyProduk = jwt.verify(req.token, process.env.SCRT_TKN)
      if(!verifyProduk){
        return res.status(400).send({
          succes: false,
          message: "Cannot create"
        })
      }
      req.checkProduk = verifyProduk
      next()
    } catch (error) {
      next(
        errorResponse(500, false, "Error validateProduk", null, error.message)
      );
    }
  }
};
