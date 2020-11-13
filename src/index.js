// requerimos el modulo experess para poder usarlo, como no hay babel,
// no tenemos la posibilidad de em6 para el import que es nuevo, asi que usamos require
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import "./database"
import productosRouter from "./routes/productos.routes";
// instancia de express, poniendolo a disposicion
const app = express();
// crear la variable para el puerto
app.set("port", process.env.PORT || 4000);
// necesitamos saber donde se esta ejecutando el backend
app.listen(app.get("port"), () => {
   console.log(path.join(__dirname, "../public")) 
  console.log("estamos escuchando el puerto " + app.get("port"));
});

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// permitir acceder a la carpeta public
app.use(express.static(path.join(__dirname, "../public")))

// ruta de prueba
// cuando haya un get en la ppal (/) hacer tal funcion
// primer parametro recibe la solicitud (request) el segundo es response comment viejo
app.use("/api/cafeteria", productosRouter)

