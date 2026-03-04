const { Router } = require("express");
const usersController = require("../controllers/userController");
const usersRouter = Router();

usersRouter.get("/", usersController.getSendernames);
usersRouter.get("/new",usersController.createSendernameGet);
usersRouter.post("/new",usersController.createSendernamePost);
usersRouter.get("/delete", usersController.deleteAllSendernames);
module.exports = usersRouter;