import express from 'express'
import { KasaController } from '../controllers/kasa.controller'

const kasaRouter = express.Router()

kasaRouter.route('/sveKase').get(
    (req, res) => new KasaController().sveKase(req, res)
)
export default kasaRouter