import express from 'express'
import KasaModel from '../models/kasa'

export class KasaController {
    sveKase = (req: express.Request, res: express.Response) => {
        KasaModel.find({}, (err, s) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({flag: 0, kase: s})
            }
        })
    }
}