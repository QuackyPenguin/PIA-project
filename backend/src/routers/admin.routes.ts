import express from 'express'
import { AdminController } from '../controllers/admin.controller'

const adminRouter = express.Router()

adminRouter.route('/prijava').post(
    (req, res) => new AdminController().prijava(req, res)
)
export default adminRouter