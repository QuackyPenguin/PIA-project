import express from 'express'
import AdminModel from '../models/admin'

export class AdminController {


    prijava = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        AdminModel.findOne({ kor_ime: kor_ime, lozinka: lozinka }, (err, k) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                if (k == null) {
                    res.json({ flag: 0 })
                }
                else {
                    res.json({ flag: 1, admin: k })
                }
            }
        })
    }
}