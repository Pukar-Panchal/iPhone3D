import { smallHeroVideo, heroVideo } from '../utils/index'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useEffect, useState } from 'react'

const Hero = () => {
    const [videoScr, setSetvideoScr] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

    const handleheroVideoSrc = () => {
        if(window.innerWidth < 760) {
            setSetvideoScr(smallHeroVideo)
        } else {
            setSetvideoScr(heroVideo)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleheroVideoSrc);

        return () => {
            window.removeEventListener('resize', handleheroVideoSrc);
        }
    }, [])
    useGSAP(() => {
        gsap.to('#hero', {
            opacity: 1,
            delay: 2
        }),
        gsap.to('#cta', {
            opacity: 1,
            delay: 2,
            y: 0
        })
    }, [])
    return (
        <section className="relative w-full nav-height  bg-black">
            <div className="h-5/6 w-full flex-col flex-center">
                <p id='hero' className="hero-title md:text-3xl">iphone 15 pro max</p>
                <div className="md:w-10/12 h-9/12 max-sm:h-9/12 max-sm:w-10/12">
                    <video loop autoPlay playsInline={true} muted key={videoScr}>
                        <source src={videoScr} type='video/mp4' />
                    </video>
                </div>
                <div id='cta' className='flex flex-col flex-center opacity-0 translate-y-20'>
                    <a href="#Heighlights" className='btn'>
                        buy
                    </a>
                    <p className='font-normal text-xl pb-3'>from ₹8000/month or ₹120000</p>
                </div>
            </div>
        </section>
    )
}

export default Hero