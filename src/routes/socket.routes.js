import { Router } from "express";
import ProductManager from "../controllers/product/productManager.js";

export const socketRouter = Router();

socketRouter.get("/", async (req,res) => {
  const product = await (new ProductManager()).getProducts();
  res.render("home", { products: product });
});

socketRouter.get("/realtimeproducts", async (req,res) => {
  const products = await (new ProductManager()).getProducts();
  res.render("realTimeProducts", { products });
});