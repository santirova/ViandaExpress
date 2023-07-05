const { Router } = require("express");
const { postItemHandler, putItemHandler, deleteItemHandler } = require("../handlers/itemHandlers")
const itemRouter = Router();

itemRouter.post("/", postItemHandler);
itemRouter.put("/", putItemHandler);
itemRouter.delete("/", deleteItemHandler);



module.exports = { itemRouter }
