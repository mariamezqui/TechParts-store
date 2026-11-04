import mongoose from "mongoose";
import dotenv from "dotenv";
import Producto from "./models/Producto.js";

dotenv.config();

async function seedProductos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Conectado a MongoDB");

    await Producto.deleteMany({});


    console.log("Colección limpiada");

    await Producto.insertMany([
  {
    codigo: "CPU-01",
    nombre: "Intel Core i7 14700K",
    categoria: "Procesadores",
    precio: 429,
    stock: 10,
    compatibleCon: ["LGA1700"],
    destacado: true
  },
  {
    codigo: "CPU-02",
    nombre: "AMD Ryzen 7 7800X3D",
    categoria: "Procesadores",
    precio: 399,
    stock: 12,
    compatibleCon: ["AM5"],
    destacado: true
  },
  {
    codigo: "GPU-01",
    nombre: "RTX 4070 Super",
    categoria: "Tarjetas Gráficas",
    precio: 649,
    stock: 5,
    destacado: true
  },
  {
    codigo: "RAM-01",
    nombre: "Corsair Vengeance 32GB",
    categoria: "Memorias RAM",
    precio: 139,
    stock: 20,
    compatibleCon: ["DDR5"]
  },
  {
    codigo: "SSD-01",
    nombre: "Samsung 990 Pro 1TB",
    categoria: "Almacenamiento",
    precio: 119,
    stock: 15,
    destacado: true
  }
]);

try {

  await Producto.create({
    codigo: "ERROR-01",
    nombre: "Producto Error",
    categoria: "Monitores",
    precio: -50,
    stock: -3
  });

} catch (error) {

  console.log("\nMongoose ha bloqueado el producto inválido");

  Object.keys(error.errors).forEach((campo) => {
    console.log(
      `${campo}: ${error.errors[campo].message}`
    );
  });

}

console.log("Productos insertados");

    await mongoose.connection.close();

    console.log("Conexión cerrada");
  } catch (error) {
    console.error(" Error:", error.message);
  }
}
require("dotenv").config();

console.log(process.env.MONGODB_URI);
seedProductos();