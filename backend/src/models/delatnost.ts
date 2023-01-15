import mongoose from "mongoose";

const Schema = mongoose.Schema

let Delatnost = new Schema({
    sifra: {
        type: String
    },
    naziv: {
        type: String
    }
})

export default mongoose.model('DelatnostModel', Delatnost, 'sifrarnik')