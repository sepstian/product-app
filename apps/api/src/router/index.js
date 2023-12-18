// import router here
// examp : const usersRouter = require("./users");

const accountRouter = require("./account");
const produkRouter = require("./produk");
const kategoriRouter = require("./kategori");
const statusRouter = require("./status");

module.exports = {
  accountRouter,
  produkRouter,
  kategoriRouter,
  statusRouter,
};
