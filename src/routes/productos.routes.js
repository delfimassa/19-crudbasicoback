import {Router} from "express";
import productosController from "../controllers/productos.controllers";

// para no tener q escribir productosCotroller.getPrueba q es muy largo,
// extraemos la propiedad del objeto, lo desarmamos
const {getProductos, crearProducto, borrarProducto, modificarProducto, getProductosPaginado} = productosController ;
const router = Router();
router.route("/").get(getProductosPaginado).post(crearProducto);

router.route("/:id").delete(borrarProducto).put(modificarProducto)
// queremos poner en la url un parametro, para eso los:, 
// y las operaciones con el controlador a ejecutar en esta misma ruta
export default router;