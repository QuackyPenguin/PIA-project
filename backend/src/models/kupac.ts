import mongoose from "mongoose";

const Schema = mongoose.Schema

let Kupac = new Schema({
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    telefon: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    brojLK: {
        type: String
    }
})

export default mongoose.model('KupacModel', Kupac, 'kupci')