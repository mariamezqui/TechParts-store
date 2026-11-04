import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },

    categoria: {
      type: String,
      required: true,
      enum: [
        "Procesadores",
        "Tarjetas Gráficas",
        "Memorias RAM",
        "Almacenamiento",
      ],
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "El stock debe ser un número entero",
      },
    },

    compatibleCon: {
      type: [String],
      default: [],
    },

    destacado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Producto =
  mongoose.models.Producto ||
  mongoose.model("Producto", productoSchema);

export default Producto;;
