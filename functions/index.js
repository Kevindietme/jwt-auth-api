import express from 'express'
import cors from 'cors'
import { onRequest } from 'firebase-functions/v2/https'
import { signup, login } from './src/users.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post("/signup", signup)
app.post("/login", login)

app.get("/profile", getProfile)
//app.patch("/profile")

export const api = onRequest(app)
