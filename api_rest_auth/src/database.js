import mongoose from "mongoose"
import config from "./config"

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI, { dbname: 'inventario' })
    .then((data) => console.log('DB se encuentra conectada.'))
    .catch((error) => console.log(error))