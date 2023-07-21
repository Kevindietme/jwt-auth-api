import jwt from 'jsonwebtoken'
import { secret } from '../creds.js'

export async function validToken(req, res, next) {
  if(!req.headers || !req.headers.authorization) {
    res.status(401).send({ message: "No authorization token", success: false })
    return 
  }
  try{
  const decodedToken = jwt.verify(req.headers.authorization, secret)
  req.decodedToken = decodedToken
  next()
  } catch(err) {
    res.status(401).send({ message: "Invalid auth token", success: false })
  }
}

export async function matchingUser(req, res, next) {
  if(req.decodedToken._id !== req.params.uid) {
    res.status(401).send({ message: "Unauthorized request", success: false})
    return 
  }
}
next()

export async function isAdmin(req,res,next) {
  if(!req.decodedToken.admin && req.decodedToken.email !== 'toddA@bocacode.com') {
    res.status(401).send({ message: "User not authorized", success: false})
    return 
  }
  console.log("Admin user:", req.decodedToken.email)
}