import express from 'express'
import DelatnostModel from '../models/delatnost'

export class SifrarnikController {
    sveDelatnosti = (req: express.Request, res: express.Response) => {
        DelatnostModel.find({}, (err, s) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({flag: 0, sifre: s})
            }
        })
    }
}