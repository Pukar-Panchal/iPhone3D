import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"
import VideoCarousil from "./VideoCarousil"

const Heighlights = () => {
  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1,
      y: 0
    }),
      gsap.to('.link', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.5
      })
  }, [])
  return (
    <section id="heighlights" className="common-padding overflow-hidden bg-[#101010]">
      <div className="screen-max-width">
        <div className="md:flex mb-12 w-full items-end justify-between">
          <h1 id="title" className="section-heading">Get the heighlights.</h1>
          <div className="flex items-end gap-5">
            <p className="link">
              Watch the film.
              <img src={watchImg} alt="watch icon" className="ml-2"/>
            </p>
            <p className="link">
              Watch the event.
              <img src={rightImg} alt="" className="ml-2"/>
            </p>
          </div>
        </div>
        <VideoCarousil />
      </div>
    </section>
  )
}

export default Heighlights