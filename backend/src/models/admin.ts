import mongoose from "mongoose";

const Schema = mongoose.Schema

let Admin = new Schema({
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    }
})

export default mongoose.model('AdminModel', Admin, 'admin')