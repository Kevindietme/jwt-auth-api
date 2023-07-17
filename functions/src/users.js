import { db } from './dbConnect.js'
import { secret } from '../creds.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'


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

export async function getProfile(req,res) {
  if(!req.headers || !req.headers.authorization) {
    res.status(401).send({ message: "Not authorized "})
    return
  }
  const decoded = jwt.verify(req.headers.authorization, secret)
  const user = await coll.findOne({ _id: new ObjectId(decoded._id) })
  res.send({ user })
}