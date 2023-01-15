import express from 'express'
import { KupacController } from '../controllers/kupac.controller'

const kupacRouter = express.Router()

kupacRouter.route('/prijava').post(
    (req, res) => new KupacController().prijava(req, res)
)

kupacRouter.route('/registracija').post(
    (req, res) => new KupacController().registracija(req, res)
)

export default kupacRouter