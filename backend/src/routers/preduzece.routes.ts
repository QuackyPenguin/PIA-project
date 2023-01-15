import express from 'express'
import { PreduzeceController } from '../controllers/preduzece.controller'

const preduzeceRouter = express.Router()

preduzeceRouter.route('/svaPreduzeca').get(
    (req, res) => new PreduzeceController().svaPreduzeca(req, res)
)

preduzeceRouter.route('/registracija').post(
    (req, res) => new PreduzeceController().registrujPreduzece(req, res)
)

preduzeceRouter.route('/prijava').post(
    (req, res) => new PreduzeceController().prijava(req, res)
)

preduzeceRouter.route('/sacuvajPodatke').post(
    (req, res) => new PreduzeceController().sacuvajPodatke(req, res)
)

preduzeceRouter.route('/promenaStatusa').post(
    (req, res) => new PreduzeceController().promenaStatusa(req, res)
)

preduzeceRouter.route('/promenaPodataka').post(
    (req, res) => new PreduzeceController().promenaPodataka(req, res)
)

preduzeceRouter.route('/dodajNarucioca').post(
    (req, res) => new PreduzeceController().dodajNarucioca(req, res)
)

preduzeceRouter.route('/sacuvajArtikal').post(
    (req, res) => new PreduzeceController().sacuvajArtikal(req, res)
)

preduzeceRouter.route('/sacuvajKategorije').post(
    (req, res) => new PreduzeceController().sacuvajKategorije(req, res)
)

preduzeceRouter.route('/sacuvajOdeljenja').post(
    (req, res) => new PreduzeceController().sacuvajOdeljenja(req, res)
)

preduzeceRouter.route('/sacuvajRacune').post(
    (req, res) => new PreduzeceController().sacuvajRacune(req, res)
)

preduzeceRouter.route('/menjajLozinku').post(
    (req, res) => new PreduzeceController().menjajLozinku(req, res)
)

export default preduzeceRouter