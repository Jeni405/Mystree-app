
// pages/signup.js
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (e) => {
  e.preventDefault()

  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const text = await res.text()

    if (!res.ok) {
      const errorData = JSON.parse(text || '{}')
      setError(errorData.error || 'Signup failed')
      return
    }

    const data = JSON.parse(text || '{}')
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/login')

  } catch (err) {
    console.error('Signup error:', err)
    setError('Something went wrong.')
  }
}


  return (
    <div className="max-w-md mx-auto mt-20 md:mt-40">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Fullname"
          className="w-full border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  )
}
