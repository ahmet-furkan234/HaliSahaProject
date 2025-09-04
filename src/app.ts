import RouteManager from "./routes/route.manager.js";
import { TkMessage } from "./utils/tkMessage.js";
import connectDb from "./database/repositories/db.js"
import dotenv from "dotenv"
import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import {httpLogger} from "./middlewares/httpLogger.js";

dotenv.config()
const app = express();
app.use(express.json());
app.use(httpLogger);
await connectDb();

new RouteManager(app);
app.use(globalErrorHandler);

app.listen(process.env.PORT, ()=>{
    TkMessage.success(`Sunucu ${process.env.PORT} portunda başarılı şekilde başlatıldı`);
});