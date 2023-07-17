import { db } from './dbConnect.js'
import { secret } from '../creds.js'
import jwt from 'jsonwebtoken'


const coll = db.collection('users')

export async function signup(req, res) {
  const { email, password } = req.body  
  await coll.insertOne({ email: email.toLowerCase(), password })
  login(req,res)
}

export async function login(req, res) {
  const { email, password } = req.body
  let user = await coll.findOne({ email: email.toLowerCase(), password })
  delete user.password
  const token = jwt.sign(user, secret)
  res.send({ user, token })
}