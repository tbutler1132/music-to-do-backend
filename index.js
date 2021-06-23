import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {createRequire} from 'module'
import { createProxyMiddleware  } from 'http-proxy-middleware'
const require = createRequire(import.meta.url);

import userRoutes from './routes/users.js'
import loginRoutes from './routes/login.js'

require('dotenv').config()

const options = {
  target: 'https://tbutler1132-music-to-do-frontend.zeet.app', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/proxy/': '/'
 },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'https://tbutler1132-music-to-do-backend.zeet.app/': 'http://localhost:5000',
  },
};

const exampleProxy = createProxyMiddleware(options)

const app = express();


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use('/proxy', exampleProxy)


app.use('/users', userRoutes)
app.use('/login', loginRoutes)

const CONNECTION_URL = 'mongodb://tbutler:1132@tbutler1132-mongo-todo-production/admin'

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


mongoose.set('useFindAndModify', false);