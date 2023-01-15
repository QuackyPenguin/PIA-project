import mongoose from "mongoose";

const Schema = mongoose.Schema

let Kasa = new Schema({
    model: {
        type: String
    }
})

export default mongoose.model('KasaModel', Kasa, 'kase')