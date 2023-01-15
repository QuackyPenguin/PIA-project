import express from 'express'
import PreduzeceModel from '../models/preduzece'

export class PreduzeceController {
    svaPreduzeca = (req: express.Request, res: express.Response) => {
        PreduzeceModel.find({}, (err, preduzeca) => {
            if (err) {
                console.log(err)
                res.json({ flag: 1 })
            } else {
                res.json({ flag: 0, svaPreduzeca: preduzeca })
            }
        })
    }

    menjajLozinku = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let lozinka = req.body.lozinka

        PreduzeceModel.updateOne({ kor_ime: kor_ime }, { $set: { lozinka: lozinka } }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }

    prijava = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        PreduzeceModel.findOne({ kor_ime: kor_ime, lozinka: lozinka }, (err, pred) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                if (pred == null) {
                    res.json({ flag: 0 })
                }
                else {
                    res.json({ flag: pred.status, preduzece: pred })
                }
            }
        })
    }

    promenaStatusa = (req: express.Request, res: express.Response) => {
        let status = req.body.status
        let kor_ime = req.body.kor_ime

        PreduzeceModel.findOneAndUpdate({ kor_ime: kor_ime }, { status: status }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }

    registrujPreduzece = (req: express.Request, res: express.Response) => {
        PreduzeceModel.find({ $or: [{ 'kor_ime': req.body.kor_ime }, { 'imejl': req.body.imejl }, { 'pib': req.body.pib }] }, (err, p) => {
            if (err) {
                console.log(err)
                res.json({ flag: 1 })
            }
            else {
                if (p.length > 0) {
                    res.json({ flag: 2 })
                } else {
                    let pred = new PreduzeceModel({
                        odgovorno_lice: req.body.odgovorno_lice,
                        kor_ime: req.body.kor_ime,
                        lozinka: req.body.lozinka,
                        telefon: req.body.telefon,
                        imejl: req.body.imejl,
                        naziv: req.body.naziv,
                        drzava: req.body.drzava,
                        grad: req.body.grad,
                        postanski_broj: req.body.postanski_broj,
                        ulica: req.body.ulica,
                        broj: req.body.broj,
                        pib: req.body.pib,
                        maticni: req.body.maticni,
                        status: req.body.status,
                        slika: req.body.slika
                    })
                    pred.save((err) => {
                        if (err) {
                            console.log(err);
                            res.json({ flag: 1 })
                        }
                        else {
                            res.json({ flag: 0 })
                        }
                    })
                }
            }

        });
    }

    dodajNarucioca = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let narucilac = req.body.narucilac

        PreduzeceModel.updateOne({ kor_ime: kor_ime }, { $push: { narucioci: narucilac } }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }

    sacuvajKategorije = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let kategorije = req.body.kategorije

        PreduzeceModel.updateOne({ kor_ime: kor_ime }, { $set: { kategorije: kategorije } }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }

    promenaPodataka = (req: express.Request, res: express.Response) => {
        let odgovorno_lice = req.body.odgovorno_lice
        let kor_ime = req.body.kor_ime
        let lozinka = req.body.lozinka
        let telefon = req.body.telefon
        let imejl = req.body.imejl
        let pib = req.body.pib
        let maticni = req.body.maticni
        let kategorija = req.body.kategorija
        let delatnosti = req.body.delatnosti
        let PDVsistem = req.body.PDVsistem
        let ziro_racuni = req.body.ziro_racuni
        let magacini = req.body.magacini
        let kase = req.body.kase

        PreduzeceModel.updateOne({ kor_ime: kor_ime }, {
            $set: {
                kategorija: kategorija, delatnosti: delatnosti, odgovorno_lice: odgovorno_lice, lozinka: lozinka, telefon: telefon,
                imejl: imejl, pib: pib, maticni: maticni, PDVsistem: PDVsistem, ziro_racuni: ziro_racuni, magacini: magacini, kase: kase
            }
        }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }

    sacuvajPodatke = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let kategorija = req.body.kategorija
        let delatnosti = req.body.delatnosti
        let PDVsistem = req.body.PDVsistem
        let ziro_racuni = req.body.ziro_racuni
        let magacini = req.body.magacini
        let kase = req.body.kase

        PreduzeceModel.findOneAndUpdate({ kor_ime: kor_ime }, {
            $set: {
                kategorija: kategorija, delatnosti: delatnosti,
                PDVsistem: PDVsistem, ziro_racuni: ziro_racuni, magacini: magacini, kase: kase, status: 1
            }
        }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }

    sacuvajArtikal = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let magacini = req.body.magacini
        let artikli = req.body.artikli
        let kase = req.body.kase

        PreduzeceModel.findOneAndUpdate({ kor_ime: kor_ime }, { $set: { magacini: magacini, artikli: artikli, kase: kase } }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }

    sacuvajOdeljenja = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let odeljenja = req.body.odeljenja

        PreduzeceModel.findOneAndUpdate({ kor_ime: kor_ime }, { $set: { odeljenja: odeljenja } }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }

    sacuvajRacune = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let racuni = req.body.racuni

        PreduzeceModel.findOneAndUpdate({ kor_ime: kor_ime }, { $set: { racuni: racuni } }, (err) => {
            if (err) {
                console.log(err)
                res.json({ flag: -1 })
            } else {
                res.json({ flag: 0 })
            }
        })
    }
}