import mongoose from "mongoose";
import { arrayBuffer } from "stream/consumers";

const Schema = mongoose.Schema

let Preduzece = new Schema({
    odgovorno_lice: {
        type: String
    },
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    telefon: {
        type: String
    },
    imejl: {
        type: String
    },
    naziv: {
        type: String
    },
    drzava: {
        type: String
    },
    grad: {
        type: String
    },
    postanski_broj: {
        type: Number
    },
    ulica: {
        type: String
    },
    broj: {
        type: String
    },
    pib: {
        type: Number
    },
    maticni: {
        type: Number
    },
    status: {
        type: Number
    },
    kategorija: {
        type: String
    },
    delatnosti: {
        type: Array
    },
    PDVsistem: {
        type: Boolean
    },
    ziro_racuni: {
        type: Array
    },
    magacini: {
        type: Array
    },
    kase: {
        type: Array
    },
    narucioci: {
        type: Array
    },
    artikli: {
        type: Array
    },
    kategorije: {
        type: Array
    },
    odeljenja: {
        type: Array
    },
    racuni: {
        type: Array
    },
    slika: {
        type: String
    }
})

export default mongoose.model('PreduzeceModel', Preduzece, 'preduzeca')