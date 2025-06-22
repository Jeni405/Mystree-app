// pages/api/auth/login.js
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  await dbConnect()

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ error: 'Invalid email or password' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' })

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' })

  res.status(200).json({ message: 'Login successful', token, user: { name: user.name, email: user.email } })
}
