import mongoose from "mongoose";
import dotenv from "dotenv";
import Producto from "./models/Producto.js";

dotenv.config();

async function consultas() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Conectado");

    // CONSULTA A
    const consultaA = await Producto.find({
      categoria: "Tarjetas Gráficas",
      stock: { $gt: 0 }
    });

    console.log("\nCONSULTA A");
    console.log(consultaA);

    // CONSULTA B
    const consultaB = await Producto.find(
      {
        precio: { $lte: 150 }
      },
      {
        _id: 0,
        nombre: 1,
        precio: 1,
        categoria: 1
      }
    );

    console.log("\nCONSULTA B");
    console.log(consultaB);

    // CONSULTA C
    const consultaC = await Producto.find({
      compatibleCon: {
        $in: ["DDR5", "AM5"]
      }
    });

    console.log("\nCONSULTA C");
    console.log(consultaC);

    // CONSULTA D
    const consultaD = await Producto.find(
      { destacado: true },
      {
        _id: 0,
        nombre: 1,
        precio: 1
      }
    )
      .sort({ precio: -1 })
      .limit(3);

    console.log("\nCONSULTA D");
    console.log(consultaD);

    await mongoose.connection.close();

    console.log("\n Conexión cerrada");

  } if (error) {
    console.error(error);
  }
}

consultas();