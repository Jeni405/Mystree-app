// export default function LoginPage() {
//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-purple-600">Login</h2>
//       <form className="space-y-4">
//         <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
//         <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
//         <button className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700">Login</button>
//       </form>
//     </div>
//   )
// }

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/')
    } else {
      setError(data.error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 md:mt-40">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  )
}
