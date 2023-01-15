import express from 'express'
import { SifrarnikController } from '../controllers/sifrarnik.controller'

const sifrarnikRouter = express.Router()

sifrarnikRouter.route('/sveSifre').get(
    (req, res) => new SifrarnikController().sveDelatnosti(req, res)
)
export default sifrarnikRouter