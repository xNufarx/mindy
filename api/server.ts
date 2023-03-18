import 'dotenv/config'
import express from 'express'
import { jwtTokenDecoder } from './middlewares/identity.middleware'
import { ConnectDb } from './repositories/db'
import { identityRouter } from './routes/identity.router'
import { rootRouter } from './routes/root.router'
import { userRouter } from './routes/user.router'

const MONGODB_URL = process.env.MONGODB_URL || ''
ConnectDb(MONGODB_URL)

const PORT = process.env.SERVER_PORT || 8080
const app = express()
  .use(express.static('public'))
  .use(express.json())
  .use(jwtTokenDecoder)

app.use('/api', rootRouter)
app.use('/api/identity', identityRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () =>
  console.log(`✅ App running on http://localhost:${PORT}`)
)
