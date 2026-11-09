import express from 'express';
import AuthRouter from './routes/auth.router.js';
import 'dotenv/config'
import ConnectDB from './configs/db.js';
import cookieParser from 'cookie-parser';
import ResumeRouter from './routes/resume.router.js';
import cors from 'cors';
import helmet from 'helmet';
import ExpressMongoSanitize  from 'express-mongo-sanitize';

const app = express();
const port = process.env.PORT;

await ConnectDB();

app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value:{...req.query},
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});


app.use(express.json()) // Kalau response harus panggil deklarasi dengan express.json() 
app.use(cookieParser())


// Routing atau rutenya
// Method GET : Pengambilan Data
// Method PUT : Update Data
// Method DELETE : Menghapus Data
// Method POST : Pengiriman Data

// app.get('/', (req, res) => {
//   res.send('Hello Dikaa!')
// })

// app.post('/submit', (req, res) => {
//     const {name, password} = req.body
    
//     res.json({
//         message: "kirim Data",
//         name: name,
//         password: password
//     })
// })

// // Request Parameter
// app.get('/:nama', (req, res) => {
    
//     const {nama} = req.params
    
//     res.json({
//         name: `Nama saya adalah ${nama}`
//     })
// })


// Parent Route

app.use('/api/auth', AuthRouter)
app.use('/api/resume', ResumeRouter)

app.use(cors())
app.use(helmet())
app.use(ExpressMongoSanitize())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})