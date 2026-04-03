import { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const VideoCarousil = () => {
    const videoRef = useRef([])
    const videoDivRef = useRef([])
    const videoSpanRef = useRef([])

    const [videoId, setVideoId] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLastVideo, setIsLastVideo] = useState(false)
    const [loaded, setLoaded] = useState([])

    // ▶️ PLAY / PAUSE
    useEffect(() => {
        if (loaded.length === hightlightsSlides.length) {
            const videoEl = videoRef.current[videoId]
            if (!videoEl) return

            isPlaying ? videoEl.play() : videoEl.pause()
        }
    }, [videoId, isPlaying, loaded])

    // 📊 PROGRESS BAR
    useEffect(() => {
        const span = videoSpanRef.current[videoId]
        const dot = videoDivRef.current[videoId]

        if (!span || !dot) return

        const update = () => {
            const videoEl = videoRef.current[videoId]
            if (!videoEl || !videoEl.duration) return

            const progress = (videoEl.currentTime / videoEl.duration) * 100

            gsap.set(span, {
                width: `${progress}%`,
                backgroundColor: 'white'
            })

            videoDivRef.current.forEach((dot, i) => {
                if (!dot) return
                gsap.set(dot, {
                    width: i === videoId ? '5vw' : '12px'
                })
            })
        }

        if (isPlaying) gsap.ticker.add(update)

        return () => gsap.ticker.remove(update)
    }, [videoId, isPlaying])

    // 🎬 SLIDE ANIMATION
    useGSAP(() => {
        gsap.to('#slider', {
            x: `-${100 * videoId}%`,
            duration: 1,
            ease: 'power2.inOut'
        })
    }, [videoId])

    // 🎬 AUTO PLAY ON SCROLL
    useGSAP(() => {
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
                onEnter: () => setIsPlaying(true)
            }
        })
    }, [])

    // 📦 EVENTS
    const handleEnded = (i) => {
        if (i !== hightlightsSlides.length - 1) {
            setVideoId((prev) => prev + 1)
        } else {
            setIsLastVideo(true)
            setIsPlaying(false)
        }
    }

    const handleReset = () => {
        setVideoId(0)
        setIsLastVideo(false)
        setIsPlaying(true)
    }

    const handleLoadedMetaData = () => {
        setLoaded((prev) => [...prev, true])
    }

    return (
        <>
            {/* 🎥 VIDEO SECTION */}
            <div id='video' className="overflow-hidden">
                <div id='slider' className="flex">
                    {hightlightsSlides.map((list, i) => (
                        <div key={list.id} className='min-w-full flex justify-center'>
                            <div className='relative'>
                                <div className='sm:h-130 sm:w-230 h-50 w-75 flex-center rounded-3xl bg-black overflow-hidden'>
                                    <video
                                        muted
                                        playsInline
                                        className='w-full h-full object-cover'
                                        ref={(el) => { if (el) videoRef.current[i] = el }}
                                        onEnded={() => handleEnded(i)}
                                        onLoadedMetadata={handleLoadedMetaData}
                                    >
                                        <source src={list.video} />
                                    </video>
                                </div>

                                {/* TEXT */}
                                <div className='absolute top-0 left-[5%] z-10'>
                                    {list.textLists.map((text) => (
                                        <p key={text} className='md:text-2xl text-xl font-medium text-white'>
                                            {text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🎯 CONTROLS */}
            <div className='relative flex-center mt-10'>
                <div className='py-5 px-4 flex-center rounded-full backdrop-blur bg-gray-400'>
                    {hightlightsSlides.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => { if (el) videoDivRef.current[i] = el }}
                            className='mx-3 w-3 h-3 bg-gray-200 rounded-full relative'
                        >
                            <span
                                ref={(el) => { if (el) videoSpanRef.current[i] = el }}
                                className='absolute h-full w-0 rounded-full bg-white'
                            />
                        </span>
                    ))}
                </div>

                {/* ▶️ BUTTON */}
                <button className='ml-5 py-3 px-3 bg-gray-400 rounded-full'>
                    <img
                        src={
                            isLastVideo
                                ? replayImg
                                : isPlaying
                                    ? pauseImg
                                    : playImg
                        }
                        alt='control'
                        onClick={
                            isLastVideo
                                ? handleReset
                                : isPlaying
                                    ? () => setIsPlaying(false)
                                    : () => setIsPlaying(true)
                        }
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousil