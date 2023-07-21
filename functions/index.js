import express from 'express'
import cors from 'cors'
import { onRequest } from 'firebase-functions/v2/https'
import { signup, login, getProfile, updateProfile } from './src/users.js'
import { validToken, matchingUser } from './src/middleware.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post("/signup", signup)
app.post("/login", login)

app.get("/profile", validToken, getProfile)
app.patch("/profile", validToken, matchingUser, updateProfile)
//app.patch("/profile")

export const api = onRequest(app)
