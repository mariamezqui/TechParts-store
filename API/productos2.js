import conectarDB from "../lib/mongodb.js";
import Producto from "../models/Producto.js";

export default async function handler(req, res) {
  try {
    await conectarDB();

    const { categoria, precioMax, compatibilidad } = req.query;

    let filtro = {};

    if (categoria) {
      filtro.categoria = categoria;
    }

    if (precioMax) {
      const max = Number(precioMax);
      if (Number.isNaN(max)) {
        return res.status(400).json({ mensaje: "precioMax debe ser un número" });
      }
      filtro.precio = { $lte: max };
    }

    if (compatibilidad) {
      filtro.compatibleCon = {
        $in: [compatibilidad]
      };
    }

    const productos = await Producto.find(filtro).sort({ precio: 1 });

    res.status(200).json({
      total: productos.length,
      productos
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error del servidor",
      error: error.message
    });
  }
}