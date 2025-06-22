// export default function SignupPage() {
//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-purple-600">Sign Up</h2>
//       <form className="space-y-4">
//         <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
//         <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
//         <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
//         <button className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700">Create Account</button>
//       </form>
//     </div>
//   )
// }

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
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/login')
    } else {
      setError(data.error)
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
