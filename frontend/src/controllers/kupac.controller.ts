import express from 'express'
import KupacModel from '../models/kupac'

export class KupacController {


    prijava = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        KupacModel.findOne({ kor_ime: kor_ime, lozinka: lozinka }, (err, k) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                if (k == null) {
                    res.json({ flag: 0 })
                }
                else {
                    res.json({ flag: 1, kupac: k })
                }
            }
        })
    }

    registracija = (req: express.Request, res: express.Response) => {
        let kupac=new KupacModel({
            kor_ime:req.body.kor_ime,
            lozinka: req.body.lozinka,
            ime:req.body.ime,
            prezime: req.body.prezime,
            telefon: req.body.telefon,
            brojLK: req.body.brojLK
        })

        kupac.save((err)=>{
            if(err){
                console.log(err)
                res.json({flag: -1})
            }
            else{
                res.json({flag: 0})
            }
        })
    }
}