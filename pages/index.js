// pages/index.js
import Link from 'next/link'
import StoryCard from '@/components/StoryCard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home({ stories }) {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [allStories, setAllStories] = useState(stories)
  const [filteredStories, setFilteredStories] = useState(stories)
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
      }
    }

    checkUser()

    // Listen to route changes to update the user
    const handleRouteChange = () => {
      checkUser()
    }

    router.events?.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  useEffect(() => {
  const filtered = allStories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  )
  setFilteredStories(filtered)
}, [searchTerm, allStories])


  return (
    <div className="max-w-5xl mx-4 mt-20 md:mt-28 space-y-6">
      <div className='flex items-center justify-between mb-10'>
        <h1 className="text-2xl md:text-3xl font-bold px-1">All Stories</h1>
        
          { user ? 
          ( 
          <div className='pr-8'>
              <Link className='' href="/"><input className="text-lg md:text-xl px-2 w-30 md:w-40 md:h-8 font-bold border rounded" type="text" placeholder="🔍Search" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}></input></Link>
          </div>
          ) : ( 
            <div className='pr-2'>
              <Link className='p-5' href="/"><input className="text-lg px-2 w-28 font-bold border rounded" 
              type="text" placeholder="🔍Search" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}></input>
              </Link>
              <Link href="/write"><span className='text-lg font-bold border rounded p-1'>🖊️</span></Link> 
            </div>
          )
          
        }
          
      </div>
      

{filteredStories.length === 0 ? (
  <p className="text-gray-500">No stories found.</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredStories.map((story) => (
      <StoryCard key={story.id} story={story} />
    ))}
  </div>
)}

    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://mystree-app-o778.vercel.app/api/stories')
  const json = await res.json()

  return {
    props: {
      stories: json.data || [],
    },
  }
}
