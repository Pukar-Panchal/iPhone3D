import './App.css'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import Navbar from './component /Navbar'
import Hero from './component /Hero'
import Heighlights from './component /Heighlights'
import Model from './component /Model'

function App() {

  return (
    <main className='bg-black'>
      <Navbar />
      <Hero />
      <Heighlights />
      <Model />
    </main>
  )
}

export default App
