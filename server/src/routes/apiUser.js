import express from "express";
import registerLoginController from "../controllers/registerLoginController";
import userController from "../controllers/userController";
import groupController from "../controllers/groupController";
import groupRoleController from "../controllers/groupRoleController";
import roleController from "../controllers/roleController";
import productController from "../controllers/productController";
import categoriesController from "../controllers/categoriesController";
import brandController from "../controllers/brandController";
import citiesController from "../controllers/citiesController";
import districtsController from "../controllers/districtsController";
import cartController from "../controllers/cartController";
import orderController from "../controllers/orderController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
import SendMail from '../utility/SendMail'
import sendMailContact from '../utility/SendMailContact'

const router = express.Router();

const adminRoute = (app) => {
  const authMiddlewares = [checkUserJWT, checkUserPermission]

  // login and register
  router.post("/user/register", registerLoginController.registerUser);
  router.post("/user/login", registerLoginController.loginUser);
  router.post("/user/logout", registerLoginController.logoutUser);

  // Read JWT
  router.get("/user/jwt-token", registerLoginController.readJWT);
  router.get("/user/read", userController.readFunc);
  router.put("/user/update", authMiddlewares, userController.updateFunc);

  router.get("/group/read", groupController.readFunc);
  router.get("/group-role/read", groupRoleController.readFunc);
  router.get("/role/read", roleController.readFunc);
  router.get("/product/read/:slug", productController.readFuncDetail);
  router.get("/product/read", productController.readFunc);
  router.get("/categories/read", categoriesController.readFunc);
  router.get("/brand/read", brandController.readFunc);
  router.get("/cities/read", citiesController.readFunc);
  router.get("/districts/read", districtsController.readFunc);

  // CRUD cart need login
  router.get("/cart/read", cartController.readFunc);
  router.get("/order/read-cart", cartController.readFuncCartOrderId);
  router.post("/cart/add", cartController.addFunc);
  router.post("/cart/create", cartController.createFunc);
  router.put("/cart/update", cartController.updateFunc);
  router.delete("/cart/delete", cartController.deleteFunc);

  // CRUD order need login
  router.get("/order/read", orderController.readFunc);
  router.post("/order/create", orderController.createFunc);
  router.delete("/order/delete", orderController.deleteFunc);

  // Send Mail 
  router.post("/send-mail", SendMail);
  router.post("/send-mail-contact", sendMailContact);

  return app.use("/api/v1", router);
};

export default adminRoute;
