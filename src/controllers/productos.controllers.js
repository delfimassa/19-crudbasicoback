import Producto from "../models/productos";

const cafeteriaCtrl = {};

cafeteriaCtrl.getProductos = async (req, res) => {
  try {
    // traigo todos los porductos de la coleccion con este metodo find de mongoose
    const datos = await Producto.find();
    // le contesto al frontend que obtuve los objetos y los estoy por mandar con el codigo 200
    res.status(200).json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Algo fallo" });
  }
};
cafeteriaCtrl.crearProducto = async (req, res) => {
  console.log(req.body);
  try {
    // con esta sintaxis estoy extrayendole estos datos al objeto
    const { nombreProducto, precioProducto, categoria } = req.body;
    const productoNuevo = new Producto({
      nombreProducto: nombreProducto,
      precioProducto: precioProducto,
      categoria: categoria,
      //   mongo crea el id automaticamente, se llama _id y son alfanumericos
    });
    // guardar nuevo porducto en la base de datos
    await productoNuevo.save();
    res.status(201).json({ mensaje: "se agrego un nuevo producto" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error, no se pudo agregar tu producto" });
    // por ejemplo cuando quiera agregar en postman dos porductos del mismo nombre,
    // ya que a este campo, en el modelo, le pusimos unique=true
  }
};
cafeteriaCtrl.borrarProducto = async(req, res)=>{
    // desde el fron hacimos un fetch con una url y el id del producto a eliminar
    // ahora el id es el de mongo
    try{
        // quiero ver que request llega y si tiene parametros, y uso el parametro llamado id que cree en el roytes
        console.log(req.params.id)
        // una vez que consigo el id, borro con eeste metodo de nombre largo
        await Producto.findByIdAndDelete(req.params.id)
        res.status(200).json({ mensaje: "se elimino tu producto" })
    }catch(error){
        console.log(error)
        res.status(500).json({ mensaje: "error, no se pudo eliminar tu producto" })
    }
}

cafeteriaCtrl.modificarProducto = async(req, res) =>{
    try{
        // primer parametro el id, segundo parametro, los datos que salen en el body
        await Producto.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({mensaje:"tu producto se ha modificado correctamente"})
    }catch(error){
        console.log(error)
        res.status(500).json({mensaje:"error, no se pudo editar tu prducto"})
    }
}

// dos parametros: n de registros por pagina, y 
cafeteriaCtrl.getProductosPaginado = (req, res) => {
  try {
    // decido como se llamara este 1er parametro en este caso cantidad, sus valores los manda el front 
    // el ? es unquery en las url, indica que viene el parametro ej: ?cantidad=3&paginaactual=0
    const limite = parseInt(req.query.cantidad)
    // a partir de que registro toca mostrar ej pagina 2, desde el 4to, este parametro se llamara paginaactual
    let salto = parseInt(req.query.paginaactual) * limite
    // usamos este metodo de mongoose, dentro inventamos esos dos parametros
    Producto.countDocuments(async(error, count)=>{
      // le agregaremos parametros al find, el 1ero, las llaves, es para decir que no quiero filtrar por nombre o por
      // categoria o nada de eso sino cargar todo hasta el que yo quiero
      // el segundo es proyeccion, no lo usamos
      // el tercero son opciones: skip,cuantos registros quiero omitir, y limit cuantos quiero mostrar
      // todas estas son options de la query find de mongoose, hay mas
      // el ultimo, la funcion anonima
      await Producto.find({}, null, {skip: salto, limit: limite}, (error, datosProductos)=>{
        if (error){
          res.status(500).json({mensaje: "ocurrio un error"})
          return
        }res.status(200).json({
          mensaje: datosProductos,
          // ojo que req query siempre manda como string, atencion en fronend
          paginaActual: req.query.paginaactual,
          // ceil redondea, cuantas paginas tengo que dibujar
          totalPaginas: Math.ceil(count / limite)
        })
      })
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Algo fallo" });
  }
};
export default cafeteriaCtrl;
