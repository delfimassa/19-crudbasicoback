import mongoose from "mongoose";

const url = "mongodb+srv://delfimassa:delfimassa@cluster0.uiuh3.gcp.mongodb.net/test";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});
 const connection = mongoose.connection
 connection.once("open", () => {console.log("DB conectada")})