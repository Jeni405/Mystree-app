import '../styles/globals.css'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4 h-screen overflow-y-auto scrollbar-hidden">
        <Component {...pageProps} />
      </main>
    </>
  )
}
