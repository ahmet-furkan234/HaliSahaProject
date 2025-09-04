import { TkMessage } from "../../utils/tkMessage.js";
import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/halisaha";
    try {
        await mongoose.connect(uri);
        TkMessage.success("Veritabanı bağlantısı başarılı");
    } catch (err) {
        TkMessage.error("Veritabanına bağlanırken bir hata oluştu");
        throw err;
    }
};

export default connectDb;


