import mongoose, { Schema } from "mongoose";
// schema es una clase y ahora hacemos u n nuevo objeto de esta clase
const productoSchema = new Schema({
  nombreProducto: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true,
  },precioProducto: {
      type: Number,
      required: true,
  }, categoria: String
},{timestamps: true});

// creo una variable donce iran los productos que le pideo que cree a mongoose, en primer parametro el nombre de la coleccion, en segundo el modelo
const Producto = mongoose.model("producto", productoSchema)
export default Producto;

