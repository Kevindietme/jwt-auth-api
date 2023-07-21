import { db } from './dbConnect.js'
import { secret, salt } from '../creds.js'
import jwt from 'jsonwebtoken'
import { hash } from 'bcrypt'
import { ObjectId } from 'mongodb'


const coll = db.collection('users')

export async function signup(req, res) {
  const { email, password } = req.body  
  const hashedPassword = await hash(password, salt)
  await coll.insertOne({ email: email.toLowerCase(), password: hashedPassword })
  login(req,res)
}

export async function login(req, res) {
  const { email, password } = req.body
  const hashedPassword = await hash(password, salt)
  let user = await coll.findOne({ email: email.toLowerCase(), password: hashedPassword })
  if(!user) {
    res.status(400).send({ message: 'Invalid email or password.'})
    return
    
  }
  delete user.password
  const token = jwt.sign(user, secret)
  res.send({ user, token })
}

export async function getProfile(req, res) {
 
  const user = await coll.findOne({ "_id": new ObjectId(decodedToken._id) })
  res.send({ user })
}

export async function updateProfile(req, res) {
  await coll.updateOne(
    { _id: new ObjectId(req.params.uid)},
    {$set: req.body })
    res.status(202).send({ message: "User profile updated", success: true })
}

export async function matchingUser(req, res, next) {
  if(req.decodedToken._id !== req.params.uid) {
    res.status(401).send({ message: "Unauthorized request", success: false})
    return 
  }
}
next()