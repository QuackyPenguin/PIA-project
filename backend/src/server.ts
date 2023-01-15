import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import preduzeceRouter from './routers/preduzece.routes';
import kupacRouter from './routers/kupac.routes';
import adminRouter from './routers/admin.routes';
import sifrarnikRouter from './routers/sifrarnik.routes';
import kasaRouter from './routers/kasa.routes';

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/efiskalizacija')
const connection=mongoose.connection
connection.once('open',()=>{
    console.log('DB connected')
})

const router=express.Router()
app.use('/', router)
router.use('/preduzeca', preduzeceRouter)
router.use('/kupac', kupacRouter)
router.use('/admin', adminRouter)
router.use('/sifre', sifrarnikRouter)
router.use('/kase', kasaRouter)

app.listen(4000, () => console.log(`Express server running on port 4000`));